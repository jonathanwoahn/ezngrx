import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFacade, DynamicFacadeService } from './facades';
import { Store } from '@ngrx/store';

interface Todo {
  id: string;
  text: string;
}

@Component({
  selector: 'lib-ezngrx',
  template: `
    <input matInput placeholder="Add New Todo" #todoInput (keyup)="addTodo($event)">
  `,
  styles: []
})
export class EzngrxComponent {
  @ViewChild('todoInput', { static: false }) todoInput: ElementRef;

  todos$: Observable<Todo[]>;

  private todoFacade: DynamicFacade<Todo>;
  constructor(
    private dynamicFacadeService: DynamicFacadeService,
    private store: Store<any>,
  ) {
    this.todoFacade = this.dynamicFacadeService.getFacade<Todo>('Todo');
    this.todos$ = this.todoFacade.entities$;
  }

  addTodo(event): void {
    if (event.keyCode !== 13) { return; }
    const todo: Todo = {
      id: '5',
      text: this.todoInput.nativeElement.value,
    };
    this.store.dispatch(this.todoFacade.actions.addOne(todo));
    this.todoInput.nativeElement.value = '';
  }

  removeTodo(todo: Todo): void {
    this.store.dispatch(this.todoFacade.actions.removeOne(todo.id));
  }
}
