"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileStorage_1 = require("../utils/fileStorage");
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
const MESSAGES_FILE = 'messages.json';
router.post('/', async (req, res) => {
    try {
        const messages = await (0, fileStorage_1.readData)(MESSAGES_FILE, []);
        const newMessage = {
            id: crypto_1.default.randomUUID(),
            name: req.body.name,
            message: req.body.message,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        messages.push(newMessage);
        await (0, fileStorage_1.writeData)(MESSAGES_FILE, messages);
        res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    }
    catch (error) {
        res.status(500).json({ message: 'Error saving message', error });
    }
});
router.get('/', async (req, res) => {
    try {
        const messages = await (0, fileStorage_1.readData)(MESSAGES_FILE, []);
        // Sort by createdAt descending
        messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
});
exports.default = router;
