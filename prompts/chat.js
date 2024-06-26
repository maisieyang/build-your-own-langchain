import { BasePromptTemplate } from "./base.js";

class ChatPromptTemplate extends BasePromptTemplate {
    constructor(systemMessage, userMessage) {
        super(["system", "user"]);
        this.systemMessage = systemMessage;
        this.userMessage = userMessage;
    }

    format(values) {
        const system = values["system"];
        const user = values["user"];
        return `${this.systemMessage}: ${system}\n${this.userMessage}: ${user}`;
    }
}

export { ChatPromptTemplate };