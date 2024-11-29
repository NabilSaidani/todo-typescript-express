import { describe, it, expect, beforeEach } from 'vitest';
import { ServiceTodo } from '../src/services/todoservices';

describe('ServiceTodo', () => {
  let serviceTodo: ServiceTodo;

  beforeEach(() => {
    serviceTodo = new ServiceTodo();
  });

  it('devrait créer un todo', () => {
    const todo = serviceTodo.creer('Test');
    expect(todo.titre).toBe('Test');
    expect(todo.completed).toBe(false);
  });

  it('devrait modifier un todo', () => {
    const todo = serviceTodo.creer('Initial');
    const modifie = serviceTodo.update(todo.id, { titre: 'Modifié', completed: true });
    
    expect(modifie?.titre).toBe('Modifié');
    expect(modifie?.completed).toBe(true);
  });

  it('devrait supprimer un todo', () => {
    const todo = serviceTodo.creer('A supprimer');
    const supprime = serviceTodo.delete(todo.id);
    
    expect(supprime).toBe(true);
    expect(serviceTodo.getAll().length).toBe(0);
  });
});