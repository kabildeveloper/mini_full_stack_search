import fs from "fs";
import morgan from "morgan";
import path from "path";

const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, 'access.log'),
  { flags: 'a' }
);


export default morgan('combined', { stream: accessLogStream });
