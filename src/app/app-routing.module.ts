import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenaiComponent } from './openai/openai.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OpenaiComponent,
  },
  {
    path: 'test',
    component: TestComponent,
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
