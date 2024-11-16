import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import MessageRouter from "./src/routers/MessageRoutes.js";
import whatsappClient from "./src/services/WhatsAppClient.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

setInterval(() => {
  const currentTime = new Date();
  console.log(
    `Server time: ${currentTime} | Time zone: ${
      Intl.DateTimeFormat().resolvedOptions().timeZone
    }`
  );
}, 60000);

const phoneNumber = process.env.PHONE_NUMBER + "@c.us";
const messageGo8am = process.env.MESSAGE_8AM;
const messageBack4pm = process.env.MESSAGE_4PM;
const messageBack2pm = process.env.MESSAGE_2PM;

const sendMessage = async (time, message) => {
  try {
    const chat = await whatsappClient.getChatById(phoneNumber);
    await chat.sendMessage(message);
    console.log(`Message sent at ${time}: ${message}`);
  } catch (error) {
    console.error("Error sending message", error);
  }
};

cron.schedule("0 8 * * 1-5", async () => {
  await sendMessage("8am", messageGo8am);
});

cron.schedule("0 16 * * 1-5", async () => {
  await sendMessage("4pm", messageBack4pm);
});

cron.schedule("0 14 * * 6", async () => {
  await sendMessage("2pm", messageBack4pm);
});

whatsappClient.initialize().catch((err) => {
  console.error("Error initializing WhatsApp Client", err);
});

app.use(express.json());
app.use(MessageRouter);

app.listen(port, () => {
  const currentTime = new Date();

  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Current server time: ${currentTime}`);
  console.log(`Time zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`);
});
