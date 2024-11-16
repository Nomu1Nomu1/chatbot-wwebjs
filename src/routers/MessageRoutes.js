import express from 'express';
import whatsappClient from '../services/WhatsAppClient.js';
import pkg from 'whatsapp-web.js';

const { MessageMedia } = pkg;
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.post('/send-8am', async (req, res) => {
    const phoneNumber = ;
    const message = 'Good morning! This is a reminder to send your daily report by 8am.';

    try {
        const chat = await whatsappClient.getChatById(phoneNumber);
        await chat.sendMessage(message);
        return res.status(200).send({ status: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message', error);
        res.status(500).send({ status: 'Error sending message' });
    }
});

router.post('/send-4pm', async (req, res) => {

})

export default router;