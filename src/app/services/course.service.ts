import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';
  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http
      .get<Course[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getCoursesById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occured!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 404:
          errorMessage =
            'Resource not found (404). Please check the API endpoint.';
          break;
        case 500:
          errorMessage = 'Internal server error (500). Please try again later.';
          break;
        default:
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
      }
    }

    console.error('Error details:', error);
    return throwError(() => new Error(errorMessage));
  }
}
