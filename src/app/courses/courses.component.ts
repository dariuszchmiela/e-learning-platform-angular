import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { ToastContainerComponent } from '../shared/toast-container/toast-container.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ToastContainerComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  @ViewChild(ToastContainerComponent) toastContainer!: ToastContainerComponent;

  courses: Course[] = [];
  searchTerm: string = '';
  sortAscending: boolean = true;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.toastContainer.addToast('Courses loaded successfully', 'success');
      },
      error: (err) => {
        this.toastContainer.addToast(err.message, 'error');
      },
    });
  }

  get filteredAndSortedCourses() {
    return this.courses
      .filter((course) =>
        course.title
          .toLocaleLowerCase()
          .includes(this.searchTerm.toLocaleLowerCase())
      )
      .sort((a, b) =>
        this.sortAscending
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
  }

  toggleSortOrder() {
    this.sortAscending = !this.sortAscending;
  }
}
