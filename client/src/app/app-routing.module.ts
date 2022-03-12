import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawAppComponent } from './components/drawAppPage/draw-app/draw-app.component';
import { IndexComponent } from './components/indexPage/index/index.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'drawApp', component: DrawAppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
