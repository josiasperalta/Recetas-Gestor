import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecetaService } from '../../services/receta.service';
import { Receta } from '../../models/receta.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recetas: Receta[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private recetaService: RecetaService) { }

  ngOnInit(): void {
    this.loadRecetas();
  }

  loadRecetas(): void {
    this.recetaService.getRecetas().subscribe({
      next: (recetas) => {
        this.recetas = recetas;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las recetas. Por favor, intenta nuevamente más tarde.';
        this.loading = false;
        console.error('Error cargando recetas:', error);
      }
    });
  }
}
