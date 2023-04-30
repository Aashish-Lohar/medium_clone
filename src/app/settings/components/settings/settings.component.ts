import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, filter } from 'rxjs';
import { isCurrentUserSelector } from 'src/app/auth/store/selector';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import {
  isSubmittingSelector,
  validationErrorSelector,
} from '../../store/settings.selector';
import { CurrentUserInputInterface } from 'src/app/shared/types/currentUserInput.interface';
import { updateCurrentUserAction } from 'src/app/auth/store/actions/updateCurrentUser.action';
import { logoutAction } from 'src/app/auth/store/actions/sync.action';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  currentUserSubscription!: Subscription;
  currentUser!: CurrentUserInterface;
  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
  initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector));
  }

  initializeListeners() {
    this.currentUserSubscription = this.store
      .pipe(select(isCurrentUserSelector), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm() {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  onSubmit(){
    const currentUserInput:CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value
    }

    this.store.dispatch(updateCurrentUserAction({currentUserInput}))
  }

  logout(){
    this.store.dispatch(logoutAction())
  }
}
