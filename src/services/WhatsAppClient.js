import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
const { Client, LocalAuth } = pkg;

const whatsappClient = new Client({
    authStrategy: new LocalAuth(),
});

whatsappClient.on('qr', (qr) => {
    console.log(
        'QR Code generated. Please Scan using WhatsApp App to login.',
    );
    qrcode.generate(qr, { small: true });
});

whatsappClient.on('ready', () => console.log('WhatsApp Client is ready!'));

whatsappClient.on('message', async (message) => {
    try {
        if (message.from != 'status@broadcast') {
            const contact = await message.getContact();
            console.log(contact, message.body);
        }
    } catch (error) {
        if (error.name === 'ChatNotFoundError') {
            console.log('Chat not found');
        } else {
            console.error(error);
        }
    }
});

whatsappClient.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
    setTimeout(async () => {
        console.log('Trying to reconnect...');
        await whatsappClient.initialize();
    }, 5000)
});

export default whatsappClient;