// 1. Import necessary types from express
import { Request, Response } from "express";
/// import db from "../lib/knex";
// 2. Import the database connection
import db from "../lib/knex";

const GetTodos = async (req: Request, res: Response) => {
  // 3. Fetch all todos from the database
  const Todos = await db("Todo").select("*");
  return res.json({
    success: true,
    message: "Get Todos",
    data: Todos,
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
  const { name } = req.body;
  // 4. Insert the new todo into the database
  await db("Todo").insert({ name: name });

  return res.json({
    success: true,
    message: "Task Added Successfully",
  });
};
const DeleteTodo = async (req: Request, res: Response) => {
  const todoId = parseInt(req.params.id, 10);
  await db("Todo").where({ id: todoId }).del();
  return res.json({
    success: true,
    message: "Todo deleted successfully",
  });
};
const EditTodo = async (req: Request, res: Response) => {
  const todoId = parseInt(req.params.id, 10);
  const { name } = req.body;
  const TodoExists = await db("Todo").where({ id: todoId }).first(); // 1
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
  await db("Todo").where({ id: todoId }).update({ name: name }); // 2
  return res.json({
    success: true,
    message: "Todo updated successfully",
  });
};

export { GetTodos, AddTodo, DeleteTodo, EditTodo };
