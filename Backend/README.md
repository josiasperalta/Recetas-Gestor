# Recetario - Backend API Documentation

Este documento proporciona información para desarrolladores frontend sobre cómo interactuar con la API del sistema de gestión de recetas.

## Descripción General

El backend está desarrollado con Spring Boot y MongoDB, proporcionando una API RESTful para gestionar usuarios, recetas y comentarios. Todas las respuestas están en formato JSON.

## Configuración del Entorno

### URL Base
```
http://localhost:8080/api
```

### CORS
El backend tiene habilitado CORS para permitir peticiones desde cualquier origen.

## Autenticación

El sistema utiliza autenticación básica mediante email y contraseña. No se implementa JWT por simplicidad, pero se recomienda para entornos de producción.

### Endpoints de Autenticación

#### Login
```
POST /usuarios/login
```
**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}
```
**Respuesta exitosa (200 OK):**
```json
{
  "id": "user_id",
  "nombre": "Nombre Usuario",
  "email": "usuario@ejemplo.com",
  "recetasFavoritas": ["id_receta1", "id_receta2"],
  "recetasCreadas": ["id_receta3"]
}
```
**Respuesta fallida (401 Unauthorized):**
```json
{
  "message": "Credenciales inválidas"
}
```

#### Registro
```
POST /usuarios/registro
```
**Body:**
```json
{
  "nombre": "Nombre Usuario",
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}
```

## API de Usuarios

### Obtener usuario por ID
```
GET /usuarios/{id}
```

### Actualizar usuario
```
PUT /usuarios/{id}
```
**Body:**
```json
{
  "nombre": "Nuevo Nombre",
  "email": "nuevo@ejemplo.com",
  "password": "nuevacontraseña"
}
```

## API de Recetas

### Obtener todas las recetas
```
GET /recetas
```

### Obtener receta por ID
```
GET /recetas/{id}
```

### Crear nueva receta
```
POST /recetas?userId={usuarioId}
```
**Parámetros de consulta:**
- `userId` (obligatorio): ID del usuario que está creando la receta. Este parámetro es necesario para asociar la receta con el usuario creador.

**Body:**
```json
{
  "titulo": "Título de la Receta",
  "ingredientes": ["Ingrediente 1", "Ingrediente 2"],
  "pasos": ["Paso 1", "Paso 2"]
}
```

**Nota:** No es necesario incluir el campo "autor" en el body, ya que el backend lo asignará automáticamente usando el userId proporcionado.

### Actualizar receta
```
PUT /recetas/{id}?userId={usuarioId}
```
**Parámetros de consulta:**
- `userId` (obligatorio): ID del usuario que intenta actualizar la receta. Solo el autor de la receta puede actualizarla.

**Body:**
```json
{
  "titulo": "Nuevo título de la receta",
  "ingredientes": ["Ingrediente actualizado 1", "Ingrediente actualizado 2"],
  "pasos": ["Paso actualizado 1", "Paso actualizado 2"]
}
```

### Eliminar receta
```
DELETE /recetas/{id}?userId={usuarioId}
```
**Parámetros de consulta:**
- `userId` (obligatorio): ID del usuario que intenta eliminar la receta. Solo el autor de la receta puede eliminarla.

### Marcar/desmarcar receta como favorita
```
POST /recetas/{id}/favorito?userId={usuarioId}
```
**Parámetros de consulta:**
- `userId` (obligatorio): ID del usuario que está marcando/desmarcando la receta como favorita.
**Body:**
```json
{
  "usuarioId": "id_del_usuario"
}
```

### Obtener recetas favoritas de un usuario
```
GET /recetas/favoritas?userId={usuarioId}
```
**Parámetros de consulta:**
- `userId` (obligatorio): ID del usuario del que se quieren obtener las recetas favoritas.

### Obtener recetas creadas por un usuario
```
GET /recetas/usuario/{usuarioId}
```

## API de Comentarios

### Obtener comentarios de una receta
```
GET /comentarios/receta/{recetaId}
```

### Añadir comentario a una receta
```
POST /comentarios
```
**Body:**
```json
{
  "texto": "Texto del comentario",
  "autorId": "id_del_usuario",
  "autorNombre": "Nombre del Usuario",
  "recetaId": "id_de_la_receta"
}
```

### Actualizar comentario
```
PUT /comentarios/{id}?userId={usuarioId}
```
**Parámetros de consulta:**
- `userId` (obligatorio): ID del usuario que intenta actualizar el comentario. Solo el autor del comentario puede actualizarlo.

**Body:**
```json
{
  "texto": "Nuevo texto del comentario"
}
```

### Eliminar comentario
```
DELETE /comentarios/{id}?userId={usuarioId}
```

**Parámetros de consulta:**
- `userId` (obligatorio): ID del usuario que intenta eliminar el comentario. Solo el autor del comentario puede eliminarlo.

## Modelos de Datos

### Usuario
```json
{
  "id": "string",
  "nombre": "string",
  "email": "string",
  "password": "string",
  "recetasFavoritas": ["string"],
  "recetasCreadas": ["string"]
}
```

### Receta
```json
{
  "id": "string",
  "titulo": "string",
  "autor": "string",
  "ingredientes": ["string"],
  "pasos": ["string"],
  "comentarios": ["string"],
  "favoritos": ["string"]
}
```

### Comentario
```json
{
  "id": "string",
  "texto": "string",
  "autorId": "string",
  "autorNombre": "string",
  "fecha": "date",
  "recetaId": "string"
}
```

## Datos de Prueba

En la carpeta `/scripts` encontrarás scripts de MongoDB para cargar datos de prueba:
- 5 usuarios
- 10 recetas
- 10 comentarios

Para usar estos scripts, sigue las instrucciones en `/scripts/README.md`.

## Recomendaciones para el Frontend

1. **Gestión de Estado**: Utiliza Redux, Context API o una solución similar para manejar el estado de la aplicación, especialmente para la información del usuario autenticado.

2. **Manejo de Formularios**: Implementa validación en el lado del cliente para los formularios de registro, login y creación de recetas.

3. **Rutas Protegidas**: Asegúrate de proteger las rutas que requieren autenticación.

4. **Diseño Responsivo**: Diseña la interfaz para que sea accesible desde dispositivos móviles y de escritorio.

5. **Componentes Reutilizables**: Crea componentes para elementos comunes como tarjetas de recetas, formularios de comentarios, etc.

## Flujo de Usuario Recomendado

1. El usuario se registra o inicia sesión
2. Navega por el listado de recetas
3. Puede ver detalles de una receta específica
4. Puede añadir comentarios a las recetas
5. Puede marcar recetas como favoritas
6. Puede crear sus propias recetas
7. Puede ver su perfil con sus recetas creadas y favoritas

## Contacto

Para cualquier consulta sobre la API, contacta al equipo de backend.

---

© 2025 Recetario - Proyecto para Base de Datos II - UTN
