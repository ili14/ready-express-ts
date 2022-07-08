class CatchError {
    constructor(originalError: any, clientError: string) {
        return {
            originalError,
            clientError,
        };
    }
}

export default CatchError;
