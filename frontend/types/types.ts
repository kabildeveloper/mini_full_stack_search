export type SearchResponse = {
    result: FAQ[]
    summary: Summary
}

export type FAQ = {
    id: string
    title: string
    body: string
}

export type Summary = {
    summary: string,
    sources: FAQ["id"][],
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