import {HttpError, SearchResponse} from "@/types/types";

export const fetchFaqs = async (search: string) => {
    const response = await fetch(`http://localhost:3001/api/search`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: search,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        const errorJson = JSON.parse(errorText);
        if(errorJson.message && errorJson.data) {
            console.log(errorJson.data);
            throw new HttpError(response.status, errorJson.message, {data: errorJson.data});
        }
        throw new Error(errorText);
    }

    const resp = await response.json();
    const data: SearchResponse = await resp.data;
    return data;
};
