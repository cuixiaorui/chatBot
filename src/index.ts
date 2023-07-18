import dotenv from "dotenv";
import { askQuestion } from "./user.js";
import { botAnswer, initBot } from "./bot.js";
import { startLoading, stopLoading } from "./loading.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

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

function checkExit(input: string) {
  if (input === "exit") {
    process.exit();
  }
}
