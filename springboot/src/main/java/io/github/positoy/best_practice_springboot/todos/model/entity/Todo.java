package io.github.positoy.best_practice_springboot.todos.model.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("todos")
public record Todo(
	@Id Long id,
	String text,
	boolean completed
) {
}
