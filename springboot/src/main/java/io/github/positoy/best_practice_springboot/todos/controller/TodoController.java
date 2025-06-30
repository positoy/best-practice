package io.github.positoy.best_practice_springboot.todos.controller;

import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.positoy.best_practice_springboot.todos.model.entity.Todo;
import io.github.positoy.best_practice_springboot.todos.model.payload.CreateRequest;
import io.github.positoy.best_practice_springboot.todos.model.payload.Response;
import io.github.positoy.best_practice_springboot.todos.model.payload.UpdateRequest;
import io.github.positoy.best_practice_springboot.todos.repository.TodoRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

	private final TodoRepository todoRepository;

	@GetMapping
	public List<Response> getAllTodos() {
		return StreamSupport.stream(todoRepository.findAll().spliterator(), false)
			.map(todo -> new Response(todo.id(), todo.text(), todo.completed()))
			.toList();
	}

	@GetMapping("/{id}")
	public Response getTodoById(@PathVariable Long id) {
		Todo todo = todoRepository.findById(id).orElseThrow();
		return new Response(todo.id(), todo.text(), todo.completed());
	}

	@PostMapping
	public Response createTodo(@RequestBody CreateRequest request) {
		Todo todo = new Todo(null, request.text(), false);
		Todo saved = todoRepository.save(todo);
		return new Response(saved.id(), saved.text(), saved.completed());
	}

	@PutMapping("/{id}")
	public Response updateTodo(@PathVariable Long id, @RequestBody UpdateRequest request) {
		Todo todo = new Todo(id, request.text(), request.completed());
		Todo saved = todoRepository.save(todo);
		return new Response(saved.id(), saved.text(), saved.completed());
	}

	@DeleteMapping("/{id}")
	public void deleteTodo(@PathVariable Long id) {
		todoRepository.deleteById(id);
	}
}
