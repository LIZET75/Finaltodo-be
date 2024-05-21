import { Request, Response } from 'express';
import Todo from '../models/todo';
import pool from '../db';

// OPTION 1 In-memory array to store todos
// let todos: Todo[] = [{
//   id : 1,
//   task : "may-20",
//   label: "what will the label do"
// }];
// OPTION 2 TO CONNECT WITH DATABASE
let todos: Todo [] = [];

let currentId = todos.length+1;

// OPTION 1 COMMENTED 052024 AS THIS CONNECTS TO 1 THAT IS AN ARRAY HARD CODDED
// export const getAllTodos = (req: Request, res: Response) => {
//   return res.status(200).json(todos);
// };


export const getAllTodos = async (req: Request, res: Response) => {
 let table = "To_Do";
 const dbResult = await pool.query(`SELECT * FROM ${table}`);

  todos = dbResult.rows;
  return res.status(200).json(todos);
}

export const createTodo = (req: Request, res: Response) => {
  const { task, label } = req.body;
  if(!task || !label){
    return res.status(400).send("Bad Request, missing fields");
  }
  const newPost: Todo = { id: currentId++, task, label};
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
