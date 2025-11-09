import {tokenize} from "../lib/util";
import {ERROR_CODE, FAQ, FAQSearchResult, HttpError} from "../types/types";

export const searchFAQ = (data: FAQ[], searchString: string)  => {

    let result : FAQSearchResult[] = [];
    let searchTokens = null;

    /* Special case to resolve single letter search */
    if(searchString.length===1) {
        searchTokens = new Set([searchString.toLowerCase()]);
    }
    else {
        searchTokens = new Set(tokenize(searchString))
    }
    if(searchTokens.size===0) {
        throw new HttpError(400, ERROR_CODE.NO_SEARCH_QUERY, {data: []});
    }

    data.forEach((faq) => {
        let score = 0;
        let titleIncluded = false;
        let bodyIncluded = false;

        const bodyTokens = tokenize(faq.body);
        const titleTokens = tokenize(faq.title);

        // Highest Priority for an exact match
        if(faq.title.toLowerCase().includes(searchString.toLowerCase())){
            score += 1000;
            titleIncluded = true;
        }
        if(faq.body.toLowerCase().includes(searchString.toLowerCase())){
            score += 500;
            bodyIncluded = true;
        }

        searchTokens.forEach((searchToken: string) => {
            titleTokens.forEach((titleToken) => {
                if(titleToken===searchToken) {
                    score += 20;
                    titleIncluded = true;
                }
                else if(titleToken.includes(searchToken)) {
                    score += 15;
                    titleIncluded = true;
                }
                else if(searchToken.length>=3 && titleToken.length>=3 && searchToken.includes(titleToken)) {
                    score += 2;
                    titleIncluded = true;
                }
            });

            bodyTokens.forEach((bodyToken) => {
                if(bodyToken===searchToken) {
                    score += 10;
                    bodyIncluded = true;
                }
                else if(bodyToken.includes(searchToken)) {
                    score += 5;
                    bodyIncluded = true;
                }
                else if(searchToken.length>=3 && bodyToken.length>=3 && searchToken.includes(bodyToken)) {
                    score += 1;
                    bodyIncluded = true;
                }
            });
        });

        result.push({...faq, score, titleIncluded, bodyIncluded});
    })

    result = result.filter((faq) => faq.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    ;

    const summary = generateSummary(result);

    const filteredFaq = result.map(({id , title, body}) => {
        return {id, title, body} as FAQ;
    });

    if(filteredFaq.length===0) {
        throw new HttpError(404, ERROR_CODE.NOT_FOUND, {data: []});
    }
    return {result: filteredFaq, summary};
}

/* Included max of 3 sentences */
/* It will add summary if there is at least 2 search results */
const generateSummary = (searchResults: FAQSearchResult[]) => {
    if (searchResults.length<=1) {
        return { summary: "Not enough data for summary", sources: [] };
    }
    const summary: string[] = [];
    const sources = new Set<number>();
    let i = 0;
    const MAX_SUMMARY = 3;
    while (i < searchResults.length) {
        if(searchResults[i].titleIncluded) {
            summary.push(searchResults[i].title);
            sources.add(searchResults[i].id);
            if(summary.length > MAX_SUMMARY-1) {
                break;
            }
        }
        if(searchResults[i].bodyIncluded) {
            summary.push(searchResults[i].body);
            sources.add(searchResults[i].id);
            if(summary.length > MAX_SUMMARY-1) {
                break;
            }
        }
        i++;
    }
    return {
        summary: summary.join(" "),
        sources: [...sources],
    };
}