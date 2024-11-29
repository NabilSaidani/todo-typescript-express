import express from 'express';
import todoRoutes from './routes/todoroutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

export default app;