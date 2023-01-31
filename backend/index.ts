import express from 'express';
import cors from 'cors';

const PORT = 3001;
const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send({ message: 'Root route successfully reached without any errors.' });
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
