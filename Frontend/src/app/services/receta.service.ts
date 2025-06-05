import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Receta } from '../models/receta.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private favoritosChanged = new Subject<void>();

  favoritosChanged$ = this.favoritosChanged.asObservable();
  private apiUrl = 'http://localhost:8080/api/recetas';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getRecetas(): Observable<Receta[]> {
    // Obtener todas las recetas sin filtrar por usuario
    return this.http.get<Receta[]>(this.apiUrl);
  }

  getRecetaById(id: string): Observable<Receta> {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || 'guest';
    
    // Add userId as a query parameter
    const params = new HttpParams().set('userId', userId);
    
    return this.http.get<Receta>(`${this.apiUrl}/${id}`, { params });
  }

  createReceta(receta: Receta): Observable<Receta> {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || 'guest';
    
    // Add userId as a query parameter
    const params = new HttpParams().set('userId', userId);
    
    return this.http.post<Receta>(this.apiUrl, receta, { params });
  }

  updateReceta(id: string, receta: Receta): Observable<Receta> {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || 'guest';
    
    // Add userId as a query parameter
    const params = new HttpParams().set('userId', userId);
    
    return this.http.put<Receta>(`${this.apiUrl}/${id}`, receta, { params });
  }

  deleteReceta(id: string): Observable<any> {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || 'guest';
    
    // Add userId as a query parameter
    const params = new HttpParams().set('userId', userId);
    
    return this.http.delete(`${this.apiUrl}/${id}`, { params });
  }

  toggleFavorito(recetaId: string, usuarioId: string): Observable<any> {
    console.log(`RecetaService: Toggling favorite for recipe ${recetaId} and user ${usuarioId}`);
    
    // Try a different approach: send userId only in the URL, not in the body or params
    // This might be what the backend expects
    const url = `${this.apiUrl}/${recetaId}/favorito/${usuarioId}`;
    console.log('Request URL:', url);
    
    // Make a POST request to toggle the favorite status with an empty body
    return this.http.post(url, {})
      .pipe(
        tap(response => {
          console.log('Toggle favorite response:', response);
          this.favoritosChanged.next();
        }),
        catchError(error => {
          // If the first approach fails, try the original approach with query params
          console.log('First approach failed, trying with query params...');
          const params = new HttpParams().set('userId', usuarioId);
          const originalUrl = `${this.apiUrl}/${recetaId}/favorito`;
          
          return this.http.post(originalUrl, {}, { params }).pipe(
            tap(response => {
              console.log('Toggle favorite response (second attempt):', response);
            }),
            catchError(secondError => {
              console.error('Error toggling favorite (both attempts failed):', secondError);
              return throwError(() => secondError);
            })
          );
        })
      );
  }


  
  getRecetasFavoritas(usuarioId: string): Observable<Receta[]> {
    console.log(`Fetching favorite recipes for user: ${usuarioId}`);
    const params = new HttpParams().set('userId', usuarioId);
    // Llama al endpoint dedicado de favoritos
    return this.http.get<Receta[]>(`${this.apiUrl}/favoritas`, { params })
      .pipe(
        tap(recetas => console.log(`Recibidas ${recetas.length} recetas favoritas del backend`)),
        catchError(error => {
          console.error('Error fetching favorite recipes:', error);
          return throwError(() => error);
        })
      );
  }

  getRecetasUsuario(usuarioId: string): Observable<Receta[]> {
    console.log(`Fetching recipes created by user: ${usuarioId}`);
    
    // Get all recipes and filter client-side
    const params = new HttpParams().set('userId', usuarioId);
    
    return this.http.get<Receta[]>(this.apiUrl, { params })
      .pipe(
        map((recetas: Receta[]) => {
          // Filter recipes where the user is the author
          return recetas.filter(receta => receta.autor === usuarioId);
        }),
        tap(recetas => console.log(`Filtered to ${recetas.length} user-created recipes`)),
        catchError(error => {
          console.error('Error fetching user-created recipes:', error);
          return throwError(() => error);
        })
      );
  }
}
