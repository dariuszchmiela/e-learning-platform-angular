import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ToastContainerComponent } from '../shared/toast-container/toast-container.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToastContainerComponent,
    RouterModule,
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent implements OnInit {
  @ViewChild(ToastContainerComponent) toastContainer!: ToastContainerComponent;

  profileForm!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserData();
  }

  initForm() {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  loadUserData() {
    this.loading = true;
    this.userService.getUser().subscribe({
      next: (user) => {
        this.profileForm.patchValue(user);
        this.loading = false;
      },
      error: (err) => {
        this.toastContainer.addToast('Failed to load user data.', 'error');
        this.loading = false;
      },
    });
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.userService.updateUser(this.profileForm.value).subscribe({
      next: () => {
        this.toastContainer.addToast(
          'Profile updated successfully!',
          'success'
        );
        this.loading = false;
      },
      error: () => {
        this.toastContainer.addToast('Failed to update profile.', 'error');
        this.loading = false;
      },
    });
  }
}
