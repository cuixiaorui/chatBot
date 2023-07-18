// TODO 作业 控制 messages 的长度
export const messages: { role: "user" | "assistant"; content: string }[] = [];

export function addUserMessage(message: string) {
  messages.push({
    role: "user",
    content: message,
  });
}

export function addBotMessage(message: string) {
  messages.push({
    role: "assistant",
    content: message,
  });
}
