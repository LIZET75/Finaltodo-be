import express from 'express';
import postsRoutes from './routes/postsRoutes';
import todosRoutes from './routes/todosRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/posts', postsRoutes);
app.use('/todos', todosRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

