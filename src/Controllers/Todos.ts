// 1. Import necessary types from express
import { Request, Response } from "express";

let TODOS = [
  { id: 1, name: "Learn TypeScript", completed: false },
  { id: 2, name: "Build an Express app", completed: false },
];

const GetTodos = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "Get Todos",
    data: TODOS,
  });
};
const AddTodo = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "No data provided",
    });
  }
  if (!req.body.name) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }
  const newTodo = {
    id: TODOS.length + 1,
    name: req.body.name,
    completed: false,
  };
  TODOS.push(newTodo);

  return res.json({
    success: true,
    message: "Get Todos",
    data: TODOS,
  });
};
const DeleteTodo = async (req: Request, res: Response) => {
  const todoId = parseInt(req.params.id, 10);
  TODOS = TODOS.filter((todo) => todo.id !== todoId);
  return res.json({
    success: true,
    message: "Todo deleted successfully",
    data: TODOS,
  });
};
const EditTodo = async (req: Request, res: Response) => {
  const todoId = parseInt(req.params.id, 10);
  const { name } = req.body;
  const TodoExists = TODOS.find((todo) => todo.id === todoId);
  if (!TodoExists) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }
  const updatedTodo = { ...TodoExists, name: name };
  TODOS = TODOS.map((todo) => (todo.id === todoId ? updatedTodo : todo));
  return res.json({
    success: true,
    message: "Todo updated successfully",
    data: TODOS,
  });
};

export { GetTodos, AddTodo, DeleteTodo, EditTodo };
