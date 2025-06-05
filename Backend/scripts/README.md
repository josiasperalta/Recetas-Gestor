# Scripts de MongoDB para Recetario

Este directorio contiene scripts para poblar la base de datos MongoDB del proyecto Recetario con datos de ejemplo.

## Contenido

- `usuarios.js`: Inserta 5 usuarios de ejemplo
- `recetas.js`: Inserta 10 recetas de ejemplo
- `comentarios.js`: Inserta 10 comentarios de ejemplo

## Instrucciones de uso

Para cargar los datos en MongoDB, ejecuta los scripts en el siguiente orden:

1. Primero, ejecuta el script de usuarios:
   ```
   mongosh "mongodb+srv://412055:Pedro1995.@412055cluster.lberwfz.mongodb.net/recetasdb" usuarios.js
   ```

2. Luego, ejecuta el script de recetas:
   ```
   mongosh "mongodb+srv://412055:Pedro1995.@412055cluster.lberwfz.mongodb.net/recetasdb" recetas.js
   ```

3. Finalmente, ejecuta el script de comentarios:
   ```
   mongosh "mongodb+srv://412055:Pedro1995.@412055cluster.lberwfz.mongodb.net/recetasdb" comentarios.js
   ```

**Nota**: Es importante ejecutar los scripts en este orden, ya que cada script depende de los datos insertados por los scripts anteriores.

## Estructura de datos

### Usuarios
- Nombre
- Email
- Contraseña
- Recetas favoritas
- Recetas creadas

### Recetas
- Título
- Autor (ID del usuario)
- Ingredientes
- Pasos
- Comentarios
- Favoritos

### Comentarios
- Texto
- Autor ID
- Autor Nombre
- Fecha
- Receta ID

## Seguridad

**Importante**: Estos scripts son solo para desarrollo y pruebas. En un entorno de producción, las contraseñas deberían estar encriptadas y no en texto plano.
