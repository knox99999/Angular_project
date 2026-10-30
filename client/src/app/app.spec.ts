import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { App } from './app';

describe('MediTrack app shell', () => {
  let http: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App], providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('renders the dashboard and handles an expired anonymous session', async () => {
    const fixture = TestBed.createComponent(App); fixture.detectChanges();
    http.expectOne('http://localhost:3000/api/v1/auth/me').flush({}, { status: 401, statusText: 'Unauthorized' });
    await fixture.whenStable(); fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('A little care goes a long way.');
    expect(fixture.nativeElement.textContent).toContain('Sign in');
  });
  it('shows an API error message', () => {
    const fixture = TestBed.createComponent(App); fixture.componentInstance.fail({ error: { error: 'API unavailable' } });
    expect(fixture.componentInstance.error()).toBe('API unavailable');
  });
});
