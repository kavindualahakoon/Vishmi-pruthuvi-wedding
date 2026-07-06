"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve static uploads from the data folder
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../data/uploads')));
// Basic routes
app.get('/', (req, res) => {
    res.send('Wedding API Server is running. Please open the frontend application (usually on port 3000) to view the website.');
});
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Wedding Server is running' });
});
const rsvp_1 = __importDefault(require("./routes/rsvp"));
const messages_1 = __importDefault(require("./routes/messages"));
const content_1 = __importDefault(require("./routes/content"));
app.use('/api/rsvp', rsvp_1.default);
app.use('/api/messages', messages_1.default);
app.use('/api/content', content_1.default);
// Database connection and initialization has been replaced by file storage
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Data will be stored in local JSON files in the server/data directory.`);
});
