import { BasePromptTemplate } from './base.js';

class PromptTemplate extends BasePromptTemplate {
    constructor(template, inputVariables) {
        super(inputVariables);
        this.template = template;
    }

    format(values) {
        let formatted = this.template;
        for (const key of this.inputVariables) {
            formatted = formatted.replace(`{${key}}`, values[key]);
        }
        return formatted;
    }
}

export { PromptTemplate };
