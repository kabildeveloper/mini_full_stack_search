export const retry =<T>(fn: ()=>T, times: number = 3) => {
    let retryCount: number = 1;
    while (retryCount <= times) {
        try {
            return fn();
        } catch (e) {
            console.error(e.message);
            retryCount++;
        }
    }
}

export const tokenize = (text: string) => {
    return text.toLowerCase().split(/\W+/).filter(Boolean).filter(x=>x.length>=2);
}