import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenaiComponent } from './openai/openai.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OpenaiComponent,
  },

  {
    path: '*',
    redirectTo: '.',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
