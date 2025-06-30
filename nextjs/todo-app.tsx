"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import todoService from "@/lib/services/todoService";
import { Todo } from "@/lib/models/todo";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    todoService.getTodos().then(setTodos);
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      todoService
        .createTodo({
          text: newTodo.trim(),
          completed: false,
        })
        .then((todo) => {
          setTodos([...todos, todo]);
          setNewTodo("");
        });
    }
  };

  const toggleTodo = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    todoService
      .updateTodo(id, {
        completed: !todo.completed,
        text: todo.text,
      })
      .then((updated) => {
        setTodos(todos.map((todo) => (todo.id === id ? updated : todo)));
      });
  };

  const deleteTodo = (id: number) => {
    todoService
      .deleteTodo(id)
      .then((todo) => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Todo List
            </CardTitle>
            <div className="text-sm text-muted-foreground text-center">
              {completedCount} of {totalCount} tasks completed
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add new todo */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTodo();
                  }
                }}
                className="flex-1"
              />
              <Button onClick={addTodo} size="icon">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add task</span>
              </Button>
            </div>

            {/* Todo list */}
            <div className="space-y-2">
              {todos.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No tasks yet. Add one above!
                </div>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      todo.completed
                        ? "bg-muted/50 border-muted"
                        : "bg-background border-border hover:shadow-sm"
                    }`}
                  >
                    <Checkbox
                      id={`todo-${todo.id}`}
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`flex-1 cursor-pointer ${
                        todo.completed
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {todo.text}
                    </label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete task</span>
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            {todos.length > 0 && (
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Total: {totalCount}</span>
                  <span>Completed: {completedCount}</span>
                  <span>Remaining: {totalCount - completedCount}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
