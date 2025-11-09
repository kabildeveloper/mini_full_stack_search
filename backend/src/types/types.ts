export type FAQ = {
    id: number,
    title: string,
    body: string
}

export type FAQSearchResult = FAQ & {
    score: number;
    titleIncluded: boolean;
    bodyIncluded: boolean;
}

export const enum ERROR_CODE {
    "NOT_FOUND"= "No matching found. Please try searching using different keywords",
    "NO_SEARCH_QUERY" = "No search query found",
}

export class HttpError extends Error {
    public status: number;
    public body: Record<string, unknown>;

    constructor(status: number, message: string, extra?: Record<string, unknown>) {
        super(message);
        this.status = status;
        this.body = {message: message, ...(extra ?? {})};
        Object.setPrototypeOf(this, new.target.prototype);
    }
}