import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';

@Injectable()
export class TodosResolver implements Resolve<Observable<Todo[]>> {

    constructor(private todoDataService: TodoDataService) {}

    // Returns an Observable containing all todos in the database.
    // Will be used in the app-routing module before the todos component is loaded.
    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Todo[]> {
        return this.todoDataService.getAllTodos();
    }
}