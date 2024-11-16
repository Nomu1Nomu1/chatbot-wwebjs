import express from 'express';
import dotenv from 'dotenv';
import MessageRouter from './src/routers/MessageRoutes.js';
import whatsappClient from './src/services/WhatsAppClient.js';

dotenv.config();

const app = express();
const port = process.env.port

whatsappClient.initialize().catch(err => {
    console.error('Error initializing WhatsApp Client', err);
});

app.use(express.json());
app.use(MessageRouter);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})