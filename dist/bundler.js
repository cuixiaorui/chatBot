#!/usr/bin/env node

import dotenv from 'dotenv';
import readlineSync from 'readline-sync';
import colors from 'colors';
import { OpenAIApi, Configuration } from 'openai';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

// TODO 作业 控制 messages 的长度
const messages = [];
function addUserMessage(message) {
    messages.push({
        role: "user",
        content: message,
    });
}
function addBotMessage(message) {
    messages.push({
        role: "assistant",
        content: message,
    });
}

function askQuestion() {
    const userInput = readlineSync.question(colors.rainbow("You: "));
    addUserMessage(userInput);
    return userInput;
}

let openAi;
function initBot() {
    openAi = new OpenAIApi(new Configuration({
        basePath: "https://api.chatanywhere.cn/v1",
        apiKey: process.env.OPEN_API_KEY,
    }));
}
async function botAnswer() {
    const chatCompletion = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
    });
    const answer = chatCompletion.data.choices[0].message?.content;
    addBotMessage(answer);
    console.log(colors.bold.red("Bot: "), answer);
}

let spinner;
function startLoading() {
    spinner = ora("正在努力的回答中 请稍等\r").start();
}
function stopLoading() {
    spinner.stop();
}

dotenv.config({
    path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env"),
});
initBot();
// main
while (true) {
    const userInput = askQuestion();
    checkExit(userInput);
    startLoading();
    await botAnswer();
    stopLoading();
}
function checkExit(input) {
    if (input === "exit") {
        process.exit();
    }
}
