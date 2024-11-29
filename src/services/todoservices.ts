import { Todo } from '../models/todo';

export class ServiceTodo {
  private todos: Todo[] = [];
  private prochainId = 1;

  getAll(): Todo[] {
    return this.todos;
  }

  obtenirUn(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  creer(titre: string, description?: string): Todo {
    const nouveauTodo: Todo = {
      id: this.prochainId++,
      titre,
      description,
      completed: false,
    };
    this.todos.push(nouveauTodo);
    return nouveauTodo;
  }

  update(id: number, miseAJour: Partial<Omit<Todo, 'id' | 'dateCreation'>>): Todo | undefined {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return undefined;

    this.todos[index] = { ...this.todos[index], ...miseAJour };
    return this.todos[index];
  }

  delete(id: number): boolean {
    const longueurInitiale = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this.todos.length < longueurInitiale;
  }
}

export const serviceTodo = new ServiceTodo();