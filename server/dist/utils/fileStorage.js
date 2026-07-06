"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readData = readData;
exports.writeData = writeData;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const dataDir = path_1.default.join(__dirname, '../../data');
// Ensure the data directory exists
async function ensureDataDir() {
    if (!(0, fs_1.existsSync)(dataDir)) {
        await promises_1.default.mkdir(dataDir, { recursive: true });
    }
}
async function readData(fileName, defaultData) {
    await ensureDataDir();
    const filePath = path_1.default.join(dataDir, fileName);
    try {
        const data = await promises_1.default.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return defaultData;
        }
        throw error;
    }
}
async function writeData(fileName, data) {
    await ensureDataDir();
    const filePath = path_1.default.join(dataDir, fileName);
    await promises_1.default.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
