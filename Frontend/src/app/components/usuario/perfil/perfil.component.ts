import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RecetaService } from '../../../services/receta.service';
import { Usuario } from '../../../models/usuario.model';
import { Receta } from '../../../models/receta.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  usuario: Usuario | null = null;
  currentUser: Usuario | null = null;
  recetasCreadas: Receta[] = [];
  recetasFavoritas: Receta[] = [];
  loading: boolean = true;
  error: string = '';
  activeTab: 'creadas' | 'favoritas' = 'creadas';
  private favoritesSubscription: Subscription | null = null;
private userSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private recetaService: RecetaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Suscribirse de forma reactiva al usuario logueado
    this.userSubscription = this.authService.getCurrentUser$().subscribe(user => {
      this.currentUser = user;
    });

    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.loadUsuario(userId);
      } else {
        this.error = 'ID de usuario no válido';
        this.loading = false;
      }
    });

    // Suscribirse a cambios en favoritos
    this.favoritesSubscription = this.recetaService.favoritosChanged$.subscribe(() => {
      if (this.activeTab === 'favoritas') {
        this.loadRecetasFavoritas();
      }
    });
  }

  loadUsuario(id: string): void {
    this.authService.getUserById(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.loading = false;
        this.loadRecetasCreadas();
        this.loadRecetasFavoritas();
      },
      error: (error) => {
        this.error = 'Error al cargar el perfil. Por favor, intenta nuevamente más tarde.';
        this.loading = false;
        console.error('Error cargando usuario:', error);
      }
    });
  }

  loadRecetasCreadas(): void {
    if (!this.usuario) return;
    
    this.recetaService.getRecetasUsuario(this.usuario.id || '').subscribe({
      next: (recetas) => {
        this.recetasCreadas = recetas;
      },
      error: (error) => {
        console.error('Error cargando recetas creadas:', error);
      }
    });
  }

  loadRecetasFavoritas(): void {
    if (!this.usuario) return;
    
    // Use the improved service method that uses the favorites state
    this.recetaService.getRecetasFavoritas(this.usuario.id || '').subscribe({
      next: (recetas) => {
        console.log(`Loaded ${recetas.length} favorite recipes for profile view`);
        this.recetasFavoritas = recetas;
      },
      error: (error) => {
        console.error('Error cargando recetas favoritas:', error);
      }
    });
  }



  setActiveTab(tab: 'creadas' | 'favoritas'): void {
    this.activeTab = tab;
    
    // Refresh the appropriate list when switching tabs
    if (tab === 'favoritas') {
      this.loadRecetasFavoritas();
    } else if (tab === 'creadas') {
      this.loadRecetasCreadas();
    }
  }

  esMiPerfil(): boolean {
    return this.currentUser !== null && 
           this.usuario !== null && 
           this.currentUser.id === this.usuario.id;
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions when component is destroyed
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
