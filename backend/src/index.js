import express from 'express';
import { authRouter } from './routes/authRoute.js';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import cookieParser from 'cookie-parser';
import { messageRouter } from './routes/messageRoute.js';
import cors from 'cors';
import { app, server } from './config/socket.js';

dotenv.config();

const port = process.env.PORT || 6000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

const allowedOrigins = [
    'http://localhost:5173',
    'https://bleep-efaj.onrender.com'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);

connectDb().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}).catch(err => {
    console.error("Database connection failed", err);
});
