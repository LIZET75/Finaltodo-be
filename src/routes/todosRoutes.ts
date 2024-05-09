import { Router } from 'express';
import { createTodo, getAllTodos, getTodosByLabel, updateTodo, deletetodo } from '../services/todoService';

const router = Router();

router.get('/', getAllTodos);
router.post('/', createTodo);
router.get('/label/:label', getTodosByLabel);
router.put('/:id', updateTodo);
router.delete('/:id', deletetodo)

export default router;