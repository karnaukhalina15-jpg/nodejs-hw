import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import notesRouter from './routers/notesRoutes.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
const app = express();

app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
  }),
);
app.use(cors());
app.use(logger);
app.use(notesRouter);

// app.get('/notes', (req, res) => {
//   res.status(200).json({
//     message: 'Retrieved all notes',
//   });
// });

// app.get('/notes/:noteId', (req, res) => {
//   const { noteId } = req.params;
//   res.status(200).json({
//     message: `Retrieved note with ID: ${noteId}`,
//   });
// });

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
