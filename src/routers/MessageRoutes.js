import express from 'express';
import whatsappClient from '../services/WhatsAppClient.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.post('/send-8am', async (req, res) => {
    const phoneNumber = process.env.PHONE_NUMBER + '@c.us';
    const message = process.env.MESSAGE_8AM;

    try {
        const chat = await whatsappClient.getChatById(phoneNumber);
        await chat.sendMessage(message);
        return res.status(200).send({ status: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message', error);
        res.status(500).send({ status: 'Error sending message' });
    }
});


export default router;