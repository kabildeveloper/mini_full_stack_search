import express from 'express';
import cors from "cors";
import helmet from 'helmet';
import {loadFaqs} from "./lib/data-loader";
import {retry} from "./lib/util";
import {FAQ, HttpError} from "./types/types";
import {searchFAQ} from "./controllers/faqController";
import loggerMiddleware from "./logger";

const DATA: FAQ[] = retry(loadFaqs);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/api/search', (req, res) => {
    try {
        const query = req.body.query;
        const data = searchFAQ(DATA, query)
        res.json({
            data: data,
            message: 'Success'
        });
    } catch (err) {
        if(err instanceof HttpError) {
            return res.status(err.status).json(err.body);
        }
        else  {
            res.status(500).json({
                data: null,
                message: err.message || "Something went wrong"
            });
        }
    }
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});