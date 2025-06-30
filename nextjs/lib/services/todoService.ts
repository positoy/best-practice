import axios from "axios";
import { Todo } from "@/lib/models/todo";

const todosApi = axios.create({
  baseURL: "/api/todos",
});

export async function getTodos(): Promise<Todo[]> {
  const res = await todosApi.get<Todo[]>(``);
  return res.data;
}

export async function getTodo(id: number): Promise<Todo> {
  const res = await todosApi.get<Todo>(`/${id}`);
  return res.data;
}

export async function createTodo(todo: Omit<Todo, "id">): Promise<Todo> {
  const res = await todosApi.post<Todo>(``, todo);
  return res.data;
}

export async function updateTodo(
  id: number,
  todo: Omit<Todo, "id">
): Promise<Todo> {
  const res = await todosApi.put<Todo>(`/${id}`, todo);
  return res.data;
}

export async function deleteTodo(id: number): Promise<Todo> {
  const res = await todosApi.delete<Todo>(`/${id}`);
  return res.data;
}

const todoService = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default todoService;
