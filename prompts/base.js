class BasePromptTemplate {
    constructor(inputVariables) {
        this.inputVariables = inputVariables;
    }

    format(values) {
        throw new Error("Subclasses should implement this method.");
    }
}

export { BasePromptTemplate };