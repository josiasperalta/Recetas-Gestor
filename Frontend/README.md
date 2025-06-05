# Recetario Angular - TPI Base de Datos II

Frontend Angular para la aplicación de recetas desarrollada como Trabajo Práctico Integrador para la materia Base de Datos II. Esta aplicación se conecta con un backend RESTful desarrollado en Spring Boot y MongoDB.

## Descripción

Esta aplicación permite a los usuarios:

- Registrarse e iniciar sesión
- Ver, crear, editar y eliminar recetas
- Añadir comentarios a las recetas
- Marcar recetas como favoritas
- Ver perfiles de usuario con sus recetas creadas y favoritas

## Requisitos previos

- Node.js (v14 o superior)
- Angular CLI (v16 o superior)
- Backend de la aplicación ejecutándose en `http://localhost:8080`

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

## Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── registro/
│   │   ├── header/
│   │   ├── home/
│   │   ├── recetas/
│   │   │   ├── receta-detalle/
│   │   │   ├── receta-form/
│   │   │   └── receta-lista/
│   │   └── usuario/
│   │       └── perfil/
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── models/
│   │   ├── comentario.model.ts
│   │   ├── receta.model.ts
│   │   └── usuario.model.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── comentario.service.ts
│   │   └── receta.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.config.ts
│   └── app.routes.ts
└── assets/
```

## Características

### Componentes principales

- **Header**: Barra de navegación con enlaces dinámicos según el estado de autenticación.
- **Home**: Página principal con listado de recetas destacadas.
- **RecetaLista**: Listado completo de recetas con búsqueda y filtro básico.
- **RecetaDetalle**: Vista detallada de una receta con ingredientes, pasos, comentarios, y funcionalidad para añadir/eliminar comentarios y marcar como favorito.
- **RecetaForm**: Formulario para crear y editar recetas.
- **Perfil**: Perfil de usuario con recetas creadas y favoritas.
- **Login/Registro**: Formularios de autenticación con validación.

### Servicios

- **AuthService**: Gestiona la autenticación, registro y perfil de usuario.
- **RecetaService**: Maneja las operaciones CRUD para recetas y favoritos.
- **ComentarioService**: Gestiona los comentarios en las recetas.

## Integración con el Backend

La aplicación se comunica con un backend RESTful a través de HTTP. Los endpoints utilizados son:

- `/api/usuarios`: Gestión de usuarios (login, registro, perfil)
- `/api/recetas`: Operaciones CRUD para recetas
- `/api/comentarios`: Gestión de comentarios
- `/api/favoritos`: Marcado/desmarcado de recetas como favoritas

## Construcción para producción

Para generar una versión optimizada para producción:

```bash
ng build --configuration production
```

Los archivos generados se almacenarán en el directorio `dist/` y estarán listos para ser desplegados en cualquier servidor web.

## Consideraciones técnicas

- Se utiliza Angular Standalone Components para una mejor modularidad.
- La comunicación con el backend se realiza mediante HttpClient.
- Se utiliza localStorage para persistir la sesión del usuario, con comprobaciones de plataforma para compatibilidad con SSR.
- La aplicación implementa rutas protegidas mediante Guards de Angular.
- El diseño es responsivo y adaptable a diferentes tamaños de pantalla.
- Soporte para Server-Side Rendering (SSR) mediante Angular Universal.

## Server-Side Rendering (SSR)

La aplicación está configurada para soportar Server-Side Rendering a través de Angular Universal, lo que proporciona:

- Mejor SEO (Search Engine Optimization)
- Renderizado inicial más rápido
- Compatibilidad con clientes que tienen JavaScript deshabilitado

Para ejecutar la aplicación en modo SSR:

```bash
ng serve --ssr
```

### Consideraciones para SSR

- Los servicios que utilizan APIs específicas del navegador (como localStorage) verifican primero si se está ejecutando en un entorno de navegador mediante `isPlatformBrowser`.
- El archivo `main.server.ts` inicializa la aplicación para el entorno del servidor.
- Se debe evitar el acceso directo a objetos globales del navegador (window, document, localStorage) sin verificar la plataforma.
