package io.github.positoy.best_practice_springboot.todos.model.payload;

public record UpdateRequest(
	String text,
	boolean completed
) {
}
