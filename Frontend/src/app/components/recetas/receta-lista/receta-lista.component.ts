import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecetaService } from '../../../services/receta.service';
import { Receta } from '../../../models/receta.model';

@Component({
  selector: 'app-receta-lista',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './receta-lista.component.html',
  styleUrls: ['./receta-lista.component.css']
})
export class RecetaListaComponent implements OnInit {
  recetas: Receta[] = [];
  filteredRecetas: Receta[] = [];
  loading: boolean = true;
  error: string = '';
  searchTerm: string = '';

  constructor(private recetaService: RecetaService) { }

  ngOnInit(): void {
    this.loadRecetas();
  }

  loadRecetas(): void {
    this.recetaService.getRecetas().subscribe({
      next: (recetas) => {
        this.recetas = recetas;
        this.filteredRecetas = [...recetas];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las recetas. Por favor, intenta nuevamente más tarde.';
        this.loading = false;
        console.error('Error cargando recetas:', error);
      }
    });
  }

  searchRecetas(): void {
    if (!this.searchTerm.trim()) {
      this.filteredRecetas = [...this.recetas];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredRecetas = this.recetas.filter(receta => 
      receta.titulo.toLowerCase().includes(term) || 
      receta.ingredientes.some(ing => ing.toLowerCase().includes(term))
    );
  }
}
