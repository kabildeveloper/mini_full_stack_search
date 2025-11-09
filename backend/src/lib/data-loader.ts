import fs from "fs";
import path from "path";
import {FAQ} from "../types/types";

export const loadFaqs = () => {
    try {
        const filePath = path.resolve(__dirname, '../data/faqs.json')
        const jsonFile = fs.readFileSync(filePath, 'utf8');
        const faqs: FAQ[] = JSON.parse(jsonFile);
        console.log("Data loaded successfully.");
        return faqs;
    } catch (e) {
        console.error("Failed to read faqs.json", e.message);
    }
}