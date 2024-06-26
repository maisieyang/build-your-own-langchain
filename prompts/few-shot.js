import  { BasePromptTemplate } from './base.js';

class FewShotPromptTemplate extends BasePromptTemplate {
    constructor(examples, template, inputVariables) {
        super(inputVariables);
        this.examples = examples;
        this.template = template;
    }

    format(values) {
        const examplesStr = this.examples.join("\n");
        let formatted = this.template;
        for (const key of this.inputVariables) {
            formatted = formatted.replace(`{${key}}`, values[key]);
        }
        return `${examplesStr}\n${formatted}`;
    }
}

export { FewShotPromptTemplate };