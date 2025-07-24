import express from 'express';
import nodemailer from 'nodemailer';

const contactRouter = express.Router();

contactRouter.post('/send', async (req, res) => {
    const { name, email, message, receiver } = req.body;

    if (!name || !email || !message || !receiver) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // sender (your Gmail)
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: receiver, // <-- this is dynamically fetched from frontend
            subject: 'New Contact Message from Portfolio',
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br/>${message}</p>
            `,
        });

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

export default contactRouter;
