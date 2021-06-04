import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStoriesComponent } from './user-stories.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: UserStoriesComponent,
  },
];

@NgModule({
  declarations: [UserStoriesComponent, HeaderComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class UserStoriesModule {}
