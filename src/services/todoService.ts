import { Request, Response } from 'express';
import todo from '../models/todo';

// In-memory array to store todos
let todos: todo[] = [];
let currentId = todos.length+1;

export const getAllTodos = (req: Request, res: Response) => {
  return res.status(200).json(todos);
};

export const createTodo = (req: Request, res: Response) => {
  const { task, label } = req.body;
  if(!task || !label){
    return res.status(400).send("Bad Request, missing fields");
  }
  const newPost: todo = { id: currentId++, task, label};
  todos.push(newPost);
  return res.status(201).json(newPost);
};

export const getTodosByLabel = (req: Request, res: Response) => {
    const label = req.params.label;
    let labeledTodos = []
    for(let i=0;i<todos.length;i++){
        if(todos[i].label == label){
            labeledTodos.push(todos[i]);
        }
    }
    return res.status(200).json(labeledTodos);
}

export const updateTodo = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(post => post.id === id); 
  if (index === -1) {
    res.status(404).send('Post not found');
  }else {
    const {id, task, label } = req.body;
    todos[index] = {id, task, label };
    res.status(200).json(todos[index]);
  }
};

export const deletetodo = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  let index = todos.findIndex(todo => todo.id === id);
  if (index === -1) {
    res.status(404).send('Post not found');
  } else {
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send(); // No content to send back
  }
};
