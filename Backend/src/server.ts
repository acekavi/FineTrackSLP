import http from 'http';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`The fine track main API is running at http://localhost:${port}`);
});
