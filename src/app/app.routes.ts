import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfileComponent } from './profile/profile.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { AuthGruard } from './guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGruard],
  },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseDetailsComponent },
  { path: 'profile', component: ProfileEditComponent },
  { path: 'login', component: LoginComponent },
];
