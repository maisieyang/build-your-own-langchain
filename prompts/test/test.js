import { PromptTemplate, FewShotPromptTemplate, ChatPromptTemplate } from "../index.js";

// 测试PromptTemplate 
const promptTemplate = new PromptTemplate("Hello {name}, welcome to {place}!", ["name", "place"]);
console.log(promptTemplate.format({ name: "John", place: "California" }));
// 输出: "Hello John, welcome to California!"

// 测试FewShotPromptTemplate
const fewShotPrompt = new FewShotPromptTemplate(
    ["Example 1: ...", "Example 2: ..."],
    "Hello {name}, welcome to {place}!",
    ["name", "place"]
);
console.log(fewShotPrompt.format({ name: "John", place: "California" }));
// 输出: "Example 1: ...\nExample 2: ...\nHello John, welcome to California!"

// 测试ChatPromptTemplate
const chatPrompt = new ChatPromptTemplate("System says", "User says");
console.log(chatPrompt.format({ system: "Hello!", user: "Hi there!" }));
// 输出: "System says: Hello!\nUser says: Hi there!"



