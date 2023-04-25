import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAnonymousSelector, isCurrentUserSelector, isLoggedInSelector } from 'src/app/auth/store/selector';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit{
  isLoggedIn$!:Observable<boolean|null>;
  isAnonymous$!:Observable<boolean|null>;
  currentUser$!:Observable<CurrentUserInterface|null>;

  constructor(private store:Store){}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector));
    this.currentUser$ = this.store.pipe(select(isCurrentUserSelector));
  }
}
