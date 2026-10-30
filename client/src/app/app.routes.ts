import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

@Component({ standalone: true, template: '' })
class EmptyComponent {}

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ...['dashboard', 'medicines', 'add-medicine', 'schedule', 'history', 'assistant', 'profile'].map(path => ({
    path,
    component: EmptyComponent,
    canActivate: [authGuard]
  })),
  { path: 'login', component: EmptyComponent },
  { path: 'register', component: EmptyComponent },
  { path: '**', redirectTo: 'dashboard' }
];

