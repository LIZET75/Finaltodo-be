import { Router } from 'express';
import { getAllPosts, createPost, updatePost, deletePost } from '../services/postsService';

const router = Router();

router.get('/', getAllPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;