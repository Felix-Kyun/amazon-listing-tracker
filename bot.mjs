import TelegramBot from "node-telegram-bot-api";
import { token } from "./config.mjs";

export const bot = new TelegramBot(token, {
  polling: true,
});

const subscribedUsers = new Set();

bot.onText(/\/subscribe/, ({ chat: { id, username } }) => {
  if (!subscribedUsers.has(id)) {
    subscribedUsers.add(id);
    bot.sendMessage(id, "✅ Subscribed to job updates");
    console.log(`User ${username} subscribed`);
  } else bot.sendMessage(id, "👀 Already subscribed");
});

bot.onText(/\/unsubscribe/, ({ chat: { id } }) => {
  if (subscribedUsers.has(id)) {
    subscribedUsers.delete(id);
    bot.sendMessage(id, "❌ Unsubscribed from job updates");
  } else bot.sendMessage(id, "👀 Not subscribed");
});

bot.onText(/\/status/, ({ chat: { id } }) => {
  if (subscribedUsers.has(id)) {
    bot.sendMessage(id, "✅ Subscribed to job updates");
  } else {
    bot.sendMessage(id, "❌ Not subscribed");
  }
});

bot.onText(/\/help/, ({ chat: { id } }) => {
  bot.sendMessage(
    id,
    "Available commands:\n" +
      "/subscribe - Subscribe to job updates\n" +
      "/unsubscribe - Unsubscribe from job updates\n" +
      "/status - Check subscription status\n" +
      "/help - Show this message",
  );
});

bot.onText(/\/start/, ({ chat: { id } }) => {
  bot.sendMessage(
    id,
    "Welcome! Use /subscribe to get job updates.\n" +
      "Use /help to see available commands.",
  );
});

export async function sendMessageToSubscribers(message) {
  for (const chatId of subscribedUsers) {
    bot.sendMessage(chatId, message);
  }
}
