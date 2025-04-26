import TelegramBot from "node-telegram-bot-api";
import { token } from "./config.mjs";

export const bot = new TelegramBot(token, {
  polling: true,
});

const subscribedUsers = new Set();

bot.onText(/\/subscribe/, ({ chat: { id } }) => {
  if (!subscribedUsers.has(id)) {
    subscribedUsers.add(id);
    bot.sendMessage(id, "✅ Subscribed to job updates");
  } else bot.sendMessage(id, "👀 Already subscribed");
});

bot.onText(/\/unsubscribe/, ({ chat: { id } }) => {
  if (subscribedUsers.has(id)) {
    subscribedUsers.delete(id);
    bot.sendMessage(id, "❌ Unsubscribed from job updates");
  } else bot.sendMessage(id, "👀 Not subscribed");
});

export async function sendMessageToSubscribers(message) {
  for (const chatId of subscribedUsers) {
    bot.sendMessage(chatId, message);
  }
}
