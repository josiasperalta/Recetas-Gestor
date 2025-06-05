import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuarios';
  private currentUser: Usuario | null = null;
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser$: Observable<Usuario | null>;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    let storedUser: Usuario | null = null;
    // Intentar recuperar usuario de localStorage al iniciar (solo en navegador)
    if (this.isBrowser) {
      const userString = localStorage.getItem('currentUser');
      if (userString) {
        storedUser = JSON.parse(userString);
        this.currentUser = storedUser;
      }
    }
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(user => {
          this.currentUser = user;
          if (this.isBrowser) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
        })
      );
  }

  registro(nombre: string, email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/registro`, { nombre, email, password })
      .pipe(
        tap(user => {
          this.currentUser = user;
          if (this.isBrowser) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
        })
      );
  }

  logout(): void {
    this.currentUser = null;
    this.currentUserSubject.next(null);
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
  }

  getCurrentUser(): Usuario | null {
    return this.currentUser;
  }

  getCurrentUser$(): Observable<Usuario | null> {
    return this.currentUser$;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getUserById(id: string): Observable<Usuario> {
    // Add userId as a query parameter
    const params = new HttpParams().set('userId', id);
    
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, { params });
  }

  updateUser(id: string, userData: Partial<Usuario>): Observable<Usuario> {
    // Add userId as a query parameter
    const params = new HttpParams().set('userId', id);
    
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, userData, { params })
      .pipe(
        tap(updatedUser => {
          if (this.currentUser && this.currentUser.id === id) {
            this.currentUser = { ...this.currentUser, ...updatedUser };
            this.currentUserSubject.next(this.currentUser);
            if (this.isBrowser) {
              localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            }
          }
        })
      );
  }
}
