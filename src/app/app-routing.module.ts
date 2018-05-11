import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    component: TodosComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
