import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private apiUrl = 'http://localhost:8080/api/comentarios';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getComentariosByReceta(recetaId: string): Observable<Comentario[]> {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || 'guest';
    
    // Add userId as a query parameter
    const params = new HttpParams().set('userId', userId);
    
    return this.http.get<Comentario[]>(`${this.apiUrl}/receta/${recetaId}`, { params });
  }

  addComentario(comentario: Comentario): Observable<Comentario> {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || 'guest';
    
    // Add userId as a query parameter
    const params = new HttpParams().set('userId', userId);
    
    return this.http.post<Comentario>(this.apiUrl, comentario, { params });
  }

  deleteComentario(id: string): Observable<any> {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || 'guest';
    
    // Add userId as a query parameter
    const params = new HttpParams().set('userId', userId);
    
    return this.http.delete(`${this.apiUrl}/${id}`, { params });
  }
}
