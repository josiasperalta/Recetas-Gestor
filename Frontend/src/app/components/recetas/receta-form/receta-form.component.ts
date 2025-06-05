import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from '../../../services/receta.service';
import { AuthService } from '../../../services/auth.service';
import { Receta } from '../../../models/receta.model';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-receta-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './receta-form.component.html',
  styleUrls: ['./receta-form.component.css']
})
export class RecetaFormComponent implements OnInit {
  receta: Receta = {
    titulo: '',
    autor: '',
    ingredientes: [],
    pasos: []
  };
  
  currentUser: Usuario | null = null;
  isEditing: boolean = false;
  loading: boolean = false;
  saving: boolean = false;
  error: string = '';
  nuevoIngrediente: string = '';
  nuevoPaso: string = '';

  constructor(
    private recetaService: RecetaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/auth/login']);
      return;
    }
    
    this.receta.autor = this.currentUser.id || '';
    
    this.route.paramMap.subscribe(params => {
      const recetaId = params.get('id');
      if (recetaId) {
        this.isEditing = true;
        this.loading = true;
        this.loadReceta(recetaId);
      }
    });
  }

  loadReceta(id: string): void {
    this.recetaService.getRecetaById(id).subscribe({
      next: (receta) => {
        this.receta = receta;
        this.loading = false;
        
        // Verificar si el usuario actual es el autor de la receta
        if (this.currentUser && this.receta.autor !== this.currentUser.id) {
          this.error = 'No tienes permiso para editar esta receta';
          setTimeout(() => {
            this.router.navigate(['/recetas', id]);
          }, 2000);
        }
      },
      error: (error) => {
        this.error = 'Error al cargar la receta. Por favor, intenta nuevamente más tarde.';
        this.loading = false;
        console.error('Error cargando receta:', error);
      }
    });
  }

  agregarIngrediente(): void {
    if (this.nuevoIngrediente.trim()) {
      this.receta.ingredientes.push(this.nuevoIngrediente);
      this.nuevoIngrediente = '';
    }
  }

  eliminarIngrediente(index: number): void {
    this.receta.ingredientes.splice(index, 1);
    // No agregar campo vacío automáticamente
  }

  agregarPaso(): void {
    if (this.nuevoPaso.trim()) {
      this.receta.pasos.push(this.nuevoPaso);
      this.nuevoPaso = '';
    }
  }

  eliminarPaso(index: number): void {
    this.receta.pasos.splice(index, 1);
    // No agregar campo vacío automáticamente
  }

  guardarReceta(): void {
    // Validar que todos los campos estén completos
    if (!this.receta.titulo.trim()) {
      this.error = 'Por favor, ingresa un título para la receta';
      return;
    }

    // Filtrar ingredientes y pasos vacíos
    this.receta.ingredientes = this.receta.ingredientes.filter(ing => ing.trim());
    this.receta.pasos = this.receta.pasos.filter(paso => paso.trim());

    if (this.receta.ingredientes.length === 0) {
      this.error = 'Por favor, ingresa al menos un ingrediente';
      return;
    }

    if (this.receta.pasos.length === 0) {
      this.error = 'Por favor, ingresa al menos un paso';
      return;
    }

    this.saving = true;
    this.error = '';

    if (this.isEditing) {
      this.recetaService.updateReceta(this.receta.id || '', this.receta).subscribe({
        next: (receta) => {
          this.saving = false;
          this.router.navigate(['/recetas', receta.id]);
        },
        error: (error) => {
          this.saving = false;
          this.error = 'Error al actualizar la receta. Por favor, intenta nuevamente.';
          console.error('Error actualizando receta:', error);
        }
      });
    } else {
      this.recetaService.createReceta(this.receta).subscribe({
        next: (receta) => {
          this.saving = false;
          this.router.navigate(['/recetas', receta.id]);
        },
        error: (error) => {
          this.saving = false;
          this.error = 'Error al crear la receta. Por favor, intenta nuevamente.';
          console.error('Error creando receta:', error);
        }
      });
    }
  }
}
