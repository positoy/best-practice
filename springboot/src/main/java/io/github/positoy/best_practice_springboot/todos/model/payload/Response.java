package io.github.positoy.best_practice_springboot.todos.model.payload;

import io.github.positoy.best_practice_springboot.todos.model.entity.Todo;

public record Response(
	Long id,
	String text,
	boolean completed
) {

	public static Response of(Todo todo) {
		return new Response(todo.id(), todo.text(), todo.completed());
	}
}
