package io.github.positoy.best_practice_springboot.todos.model.payload;

public record Response(
	Long id,
	String text,
	boolean completed
) {
}
