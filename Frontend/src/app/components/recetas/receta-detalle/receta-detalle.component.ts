import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecetaService } from '../../../services/receta.service';
import { ComentarioService } from '../../../services/comentario.service';
import { AuthService } from '../../../services/auth.service';
import { Receta } from '../../../models/receta.model';
import { Comentario } from '../../../models/comentario.model';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-receta-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './receta-detalle.component.html',
  styleUrls: ['./receta-detalle.component.css']
})
export class RecetaDetalleComponent implements OnInit {
  receta: Receta | null = null;
  comentarios: Comentario[] = [];
  currentUser: Usuario | null = null;
  loading: boolean = true;
  error: string = '';
  nuevoComentario: string = '';
  comentarioLoading: boolean = false;
  esFavorito: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetaService: RecetaService,
    private comentarioService: ComentarioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    this.route.paramMap.subscribe(params => {
      const recetaId = params.get('id');
      if (recetaId) {
        this.loadReceta(recetaId);
        this.loadComentarios(recetaId);
      } else {
        this.error = 'ID de receta no válido';
        this.loading = false;
      }
    });
  }

  loadReceta(id: string): void {
    this.recetaService.getRecetaById(id).subscribe({
      next: (receta) => {
        this.receta = receta;
        this.loading = false;
        
        // Check if this recipe is a favorite for the current user
        if (this.currentUser && this.receta.favoritos) {
          this.esFavorito = this.receta.favoritos.includes(this.currentUser.id || '');
          console.log(`Recipe is favorite: ${this.esFavorito}`);
        }
      },
      error: (error) => {
        this.error = 'Error al cargar la receta. Por favor, intenta nuevamente más tarde.';
        this.loading = false;
        console.error('Error cargando receta:', error);
      }
    });
  }

  loadComentarios(recetaId: string): void {
    this.comentarioService.getComentariosByReceta(recetaId).subscribe({
      next: (comentarios) => {
        this.comentarios = comentarios;
      },
      error: (error) => {
        console.error('Error cargando comentarios:', error);
      }
    });
  }

  agregarComentario(): void {
    if (!this.currentUser || !this.receta) {
      return;
    }

    if (!this.nuevoComentario.trim()) {
      return;
    }

    this.comentarioLoading = true;

    const comentario: Comentario = {
      texto: this.nuevoComentario,
      autorId: this.currentUser.id || '',
      autorNombre: this.currentUser.nombre,
      recetaId: this.receta.id || '',
      fecha: new Date()
    };

    this.comentarioService.addComentario(comentario).subscribe({
      next: (nuevoComentario) => {
        this.comentarios.unshift(nuevoComentario);
        this.nuevoComentario = '';
        this.comentarioLoading = false;
      },
      error: (error) => {
        console.error('Error añadiendo comentario:', error);
        this.comentarioLoading = false;
      }
    });
  }

  eliminarComentario(id: string): void {
    if (!this.currentUser) {
      return;
    }

    this.comentarioService.deleteComentario(id).subscribe({
      next: () => {
        this.comentarios = this.comentarios.filter(c => c.id !== id);
      },
      error: (error) => {
        console.error('Error eliminando comentario:', error);
      }
    });
  }

  toggleFavorito(): void {
    console.log('toggleFavorito called');
    
    if (!this.currentUser || !this.receta) {
      console.log('No user or recipe, redirecting to login');
      this.router.navigate(['/auth/login']);
      return;
    }

    const recetaId = this.receta.id || '';
    const userId = this.currentUser.id || '';
    console.log(`Toggle favorite for recipe ${recetaId} by user ${userId}`);
    console.log('Current favorite state before toggle:', this.esFavorito);
    
    // Show immediate feedback by toggling the state
    this.esFavorito = !this.esFavorito;
    console.log('New favorite state after toggle:', this.esFavorito);
    
    // Update the UI immediately
    if (this.receta) {
      // Initialize favoritos array if it doesn't exist
      if (!this.receta.favoritos) {
        console.log('Initializing empty favoritos array');
        this.receta.favoritos = [];
      }
      
      if (this.esFavorito) {
        // Add user to favorites if not already there
        if (!this.receta.favoritos.includes(userId)) {
          console.log('Adding user to favoritos array');
          this.receta.favoritos.push(userId);
        }
      } else {
        // Remove user from favorites
        console.log('Removing user from favoritos array');
        this.receta.favoritos = this.receta.favoritos.filter(id => id !== userId);
      }
      console.log('Updated favoritos array:', this.receta.favoritos);
    }
    
    // Now call the API to persist the change
    console.log('Calling API to toggle favorite');
    this.recetaService.toggleFavorito(recetaId, userId).subscribe({
      next: (response) => {
        console.log('API response:', response);
        console.log('Favorite toggled successfully, new state:', this.esFavorito);
        
        // Refresh the recipe to ensure we have the latest data
        console.log('Refreshing recipe data');
        this.loadReceta(recetaId);
      },
      error: (error) => {
        console.error('Error al marcar/desmarcar favorito:', error);
        console.error('Error details:', JSON.stringify(error));
        
        // Revert the UI change if the API call fails
        console.log('Reverting UI changes due to error');
        this.esFavorito = !this.esFavorito;
        
        if (this.receta) {
          // Ensure favoritos array exists
          if (!this.receta.favoritos) {
            this.receta.favoritos = [];
          }
          
          if (this.esFavorito) {
            // Re-add user to favorites
            if (!this.receta.favoritos.includes(userId)) {
              this.receta.favoritos.push(userId);
            }
          } else {
            // Re-remove user from favorites
            this.receta.favoritos = this.receta.favoritos.filter(id => id !== userId);
          }
          console.log('Reverted favoritos array:', this.receta.favoritos);
        }
      }
    });
  }

  puedeEditar(): boolean {
    return this.currentUser !== null && 
           this.receta !== null && 
           this.receta.autor === this.currentUser.id;
  }

  puedeEliminarComentario(comentario: Comentario): boolean {
    return this.currentUser !== null && 
           (comentario.autorId === this.currentUser.id || this.puedeEditar());
  }
}
