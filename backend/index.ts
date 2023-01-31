import express from 'express';

const PORT = 3001;
const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send({ message: 'Root route successfully reached without any errors.' });
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
