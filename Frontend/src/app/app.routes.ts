import { Routes } from '@angular/router';
import { 
  HomeComponent,
  LoginComponent,
  RegistroComponent,
  RecetaListaComponent,
  RecetaDetalleComponent,
  RecetaFormComponent,
  PerfilComponent 
} from './components';
import { authGuard } from './guards';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/registro', component: RegistroComponent },
  { path: 'recetas', component: RecetaListaComponent },
  { path: 'recetas/nueva', component: RecetaFormComponent, canActivate: [authGuard] },
  { path: 'recetas/editar/:id', component: RecetaFormComponent, canActivate: [authGuard] },
  { path: 'recetas/:id', component: RecetaDetalleComponent },
  { path: 'usuario/:id', component: PerfilComponent },
  { path: '**', redirectTo: '' }
];
