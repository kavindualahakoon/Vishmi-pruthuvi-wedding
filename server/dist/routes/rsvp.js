"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileStorage_1 = require("../utils/fileStorage");
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
const GUESTS_FILE = 'guests.json';
router.post('/', async (req, res) => {
    try {
        const guests = await (0, fileStorage_1.readData)(GUESTS_FILE, []);
        const newGuest = {
            ...req.body,
            id: crypto_1.default.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        guests.push(newGuest);
        await (0, fileStorage_1.writeData)(GUESTS_FILE, guests);
        // Send confirmation email (placeholder for now until env is set)
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
            const mailOptions = {
                from: process.env.SMTP_USER,
                to: newGuest.email,
                subject: 'Wedding RSVP Confirmation',
                text: `Dear ${newGuest.name},\n\nThank you for your RSVP. We have confirmed your attendance for ${newGuest.guestCount} guests.\n\nBest regards,\nThe Couple`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        res.status(201).json({ message: 'RSVP successful', guest: newGuest });
    }
    catch (error) {
        res.status(500).json({ message: 'Error processing RSVP', error });
    }
});
router.get('/', async (req, res) => {
    try {
        const guests = await (0, fileStorage_1.readData)(GUESTS_FILE, []);
        // Sort by createdAt descending
        guests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        res.json(guests);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching guests', error });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const guests = await (0, fileStorage_1.readData)(GUESTS_FILE, []);
        const guestIndex = guests.findIndex(g => g.id === req.params.id);
        if (guestIndex === -1) {
            return res.status(404).json({ message: 'Guest not found' });
        }
        guests[guestIndex] = {
            ...guests[guestIndex],
            ...req.body,
            updatedAt: new Date().toISOString()
        };
        await (0, fileStorage_1.writeData)(GUESTS_FILE, guests);
        res.json({ message: 'Guest updated successfully', guest: guests[guestIndex] });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating guest', error });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const guests = await (0, fileStorage_1.readData)(GUESTS_FILE, []);
        const initialLength = guests.length;
        const filteredGuests = guests.filter(g => g.id !== req.params.id);
        if (filteredGuests.length === initialLength) {
            return res.status(404).json({ message: 'Guest not found' });
        }
        await (0, fileStorage_1.writeData)(GUESTS_FILE, filteredGuests);
        res.json({ message: 'Guest deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting guest', error });
    }
});
exports.default = router;
