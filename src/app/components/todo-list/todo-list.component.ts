import { Component, WritableSignal, effect, signal } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  tasks: WritableSignal<Task[]> = signal<Task[]>(
    localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : []
  );

  constructor(){
    effect(() => {
      console.log(`Tenemos ${this.tasks().length} tareas`);
      localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    })
  }

  onSubmit(formValue: Task) {
    this.tasks.mutate(( tasks )=> {
      tasks.push(formValue);
    });
  }

  onRemove(index: number) {
    this.tasks.mutate( tasks => {
      tasks.splice(index,1)
    })
  }

}
