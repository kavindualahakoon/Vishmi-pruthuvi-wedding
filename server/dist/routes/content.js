"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fileStorage_1 = require("../utils/fileStorage");
const router = express_1.default.Router();
const CONTENT_FILE = 'content.json';
const defaultHero = {
    brideName: "",
    groomName: "",
    weddingDate: "",
    countdownTarget: "",
    bgUrl: ""
};
const defaultOurStory = {
    events: []
};
const defaultPreShoot = {
    title: "",
    description: "",
    videoUrl: ""
};
const defaultWeddingEvents = [];
const defaultGallery = [];
const defaultWeddingCard = {
    imageUrl: ""
};
const defaultVisibility = {
    hero: true,
    countdown: true,
    weddingCard: true,
    ourStory: true,
    preShootVideo: true,
    events: true,
    gallery: true,
    rsvpForm: true
};
const initialDefaultContent = {
    hero: { en: defaultHero, si: defaultHero, ta: defaultHero },
    ourStory: { en: defaultOurStory, si: defaultOurStory, ta: defaultOurStory },
    preShoot: { en: defaultPreShoot, si: defaultPreShoot, ta: defaultPreShoot },
    weddingEvents: { en: defaultWeddingEvents, si: defaultWeddingEvents, ta: defaultWeddingEvents },
    gallery: defaultGallery,
    weddingCard: defaultWeddingCard,
    visibility: defaultVisibility
};
const isLocalized = (obj) => obj && obj.en !== undefined;
async function migrateContentIfNecessary(contentData) {
    let needsUpdate = false;
    const newContent = { ...contentData };
    if (!newContent.gallery) {
        newContent.gallery = defaultGallery;
        needsUpdate = true;
    }
    if (!newContent.weddingCard) {
        newContent.weddingCard = defaultWeddingCard;
        needsUpdate = true;
    }
    if (!newContent.visibility) {
        newContent.visibility = defaultVisibility;
        needsUpdate = true;
    }
    if (newContent.hero && !isLocalized(newContent.hero)) {
        newContent.hero = { en: newContent.hero, si: newContent.hero, ta: newContent.hero };
        needsUpdate = true;
    }
    if (newContent.ourStory && !isLocalized(newContent.ourStory)) {
        newContent.ourStory = { en: newContent.ourStory, si: newContent.ourStory, ta: newContent.ourStory };
        needsUpdate = true;
    }
    if (newContent.preShoot && !isLocalized(newContent.preShoot)) {
        newContent.preShoot = { en: newContent.preShoot, si: newContent.preShoot, ta: newContent.preShoot };
        needsUpdate = true;
    }
    if (newContent.weddingEvents && !isLocalized(newContent.weddingEvents)) {
        newContent.weddingEvents = { en: newContent.weddingEvents, si: newContent.weddingEvents, ta: newContent.weddingEvents };
        needsUpdate = true;
    }
    if (needsUpdate) {
        await (0, fileStorage_1.writeData)(CONTENT_FILE, newContent);
    }
    return newContent;
}
// Setup Multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path_1.default.join(__dirname, '../../data/uploads');
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'preshoot-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }
});
// GET content
router.get('/', async (req, res) => {
    try {
        let content = await (0, fileStorage_1.readData)(CONTENT_FILE, null);
        if (!content) {
            content = initialDefaultContent;
            await (0, fileStorage_1.writeData)(CONTENT_FILE, content);
        }
        else {
            content = await migrateContentIfNecessary(content);
        }
        res.json(content);
    }
    catch (error) {
        console.warn("File read failed, returning fallback content:", error.message || error);
        res.json(initialDefaultContent);
    }
});
// Helper to map nested visibility properly
const mapVisibilityToNested = (body) => {
    const data = { ...body };
    if (data.visibilityHero !== undefined) {
        data.visibility = {
            hero: data.visibilityHero,
            countdown: data.visibilityCountdown ?? true,
            weddingCard: data.visibilityWeddingCard ?? true,
            ourStory: data.visibilityOurStory ?? true,
            preShootVideo: data.visibilityPreShootVideo ?? true,
            events: data.visibilityEvents ?? true,
            gallery: data.visibilityGallery ?? true,
            rsvpForm: data.visibilityRsvpForm ?? true
        };
        delete data.visibilityHero;
        delete data.visibilityCountdown;
        delete data.visibilityWeddingCard;
        delete data.visibilityOurStory;
        delete data.visibilityPreShootVideo;
        delete data.visibilityEvents;
        delete data.visibilityGallery;
        delete data.visibilityRsvpForm;
    }
    else if (!data.visibility) {
        data.visibility = defaultVisibility;
    }
    return data;
};
// PUT (Update) content
router.put('/', async (req, res) => {
    try {
        const dataToSave = mapVisibilityToNested(req.body);
        let content = await (0, fileStorage_1.readData)(CONTENT_FILE, null);
        if (!content) {
            await (0, fileStorage_1.writeData)(CONTENT_FILE, dataToSave);
            content = dataToSave;
        }
        else {
            content = { ...content, ...dataToSave };
            await (0, fileStorage_1.writeData)(CONTENT_FILE, content);
        }
        res.json({ message: 'Content updated successfully', content });
    }
    catch (error) {
        console.warn('File update failed:', error);
        res.status(500).json({ message: 'Error updating content', error });
    }
});
// POST Upload video
router.post('/upload-video', upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const videoUrl = `/uploads/${req.file.filename}`;
        let content = await (0, fileStorage_1.readData)(CONTENT_FILE, null);
        if (content) {
            const migrated = await migrateContentIfNecessary(content);
            migrated.preShoot = {
                en: { ...migrated.preShoot.en, videoUrl },
                si: { ...migrated.preShoot.si, videoUrl },
                ta: { ...migrated.preShoot.ta, videoUrl }
            };
            await (0, fileStorage_1.writeData)(CONTENT_FILE, migrated);
        }
        else {
            const newContent = JSON.parse(JSON.stringify(initialDefaultContent));
            newContent.preShoot.en.videoUrl = videoUrl;
            newContent.preShoot.si.videoUrl = videoUrl;
            newContent.preShoot.ta.videoUrl = videoUrl;
            await (0, fileStorage_1.writeData)(CONTENT_FILE, newContent);
        }
        res.json({ message: 'Video uploaded successfully', videoUrl });
    }
    catch (error) {
        console.warn("Upload update failed:", error);
        if (req.file) {
            const videoUrl = `/uploads/${req.file.filename}`;
            return res.json({ message: 'Video uploaded locally but could not save to content.json', videoUrl });
        }
        res.status(500).json({ message: 'Error uploading video', error });
    }
});
// POST Upload image for gallery
router.post('/upload-image', upload.single('image'), async (req, res) => {
    console.log('Received upload-image request', req.headers['content-type']);
    try {
        if (!req.file) {
            console.log('No file uploaded in req.file');
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log('File uploaded successfully:', req.file.filename);
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ message: 'Image uploaded successfully', imageUrl });
    }
    catch (error) {
        console.error("Upload image catch block error:", error.message || error);
        res.status(500).json({ message: 'Error uploading image', error: error.message || error });
    }
});
// Add error handling middleware for Multer errors
router.use((err, req, res, next) => {
    if (err instanceof multer_1.default.MulterError || err) {
        console.error("Multer/Express error during upload:", err);
        res.status(500).json({ message: 'Upload failed', error: err.message || err.toString() });
    }
    else {
        next();
    }
});
exports.default = router;
