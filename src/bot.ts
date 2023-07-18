import { Configuration, OpenAIApi } from "openai";
import { addBotMessage, messages } from "./message.js";
import colors from "colors";

let openAi: OpenAIApi;
export function initBot() {
  openAi = new OpenAIApi(
    new Configuration({
      basePath: "https://api.chatanywhere.cn/v1",
      apiKey: process.env.OPEN_API_KEY,
    })
  );
}

export async function botAnswer() {
  const chatCompletion = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });

  const answer = chatCompletion.data.choices[0].message?.content;

  addBotMessage(answer!);

  console.log(colors.bold.red("Bot: "), answer);
}
