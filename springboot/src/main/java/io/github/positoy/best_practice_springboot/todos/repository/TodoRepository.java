package io.github.positoy.best_practice_springboot.todos.repository;

import org.springframework.data.repository.CrudRepository;

import io.github.positoy.best_practice_springboot.todos.model.entity.Todo;

public interface TodoRepository extends CrudRepository<Todo, Long> {
}
