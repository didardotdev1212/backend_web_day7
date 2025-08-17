import Router from "express";
import { GetTodos, AddTodo, DeleteTodo, EditTodo } from "../Controllers/Todos";

// 1. Create a new router instance
const TodosRouter = Router();
// 2. Define the route to get todos
TodosRouter.get("/", GetTodos);
TodosRouter.post("/add", AddTodo);
TodosRouter.delete("/delete/:id", DeleteTodo);
TodosRouter.patch("/edit/:id", EditTodo);

// 3. Export the router to be used in the main application
export default TodosRouter;
