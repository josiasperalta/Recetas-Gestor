// MongoDB script para insertar 10 comentarios
db = db.getSiblingDB('recetasdb');

// Eliminar comentarios existentes para evitar duplicados
db.comentarios.deleteMany({});

// Obtener IDs de usuarios y recetas
var usuarios = db.usuarios.find().toArray();
var recetas = db.recetas.find().toArray();

if (usuarios.length < 5 || recetas.length < 10) {
  print("Error: Primero ejecuta los scripts de usuarios.js y recetas.js");
  quit();
}

// Función para obtener una fecha aleatoria en los últimos 30 días
function randomDate() {
  var now = new Date();
  var daysAgo = Math.floor(Math.random() * 30);
  var hoursAgo = Math.floor(Math.random() * 24);
  var minutesAgo = Math.floor(Math.random() * 60);
  
  now.setDate(now.getDate() - daysAgo);
  now.setHours(now.getHours() - hoursAgo);
  now.setMinutes(now.getMinutes() - minutesAgo);
  
  return now;
}

// Crear 10 comentarios
var comentarios = [
  {
    _id: ObjectId(),
    texto: "¡Esta receta es increíble! La hice para mi familia y les encantó.",
    autorId: usuarios[0]._id.toString(),
    autorNombre: usuarios[0].nombre,
    fecha: randomDate(),
    recetaId: recetas[1]._id.toString() // Comentario de María en la Tortilla Española
  },
  {
    _id: ObjectId(),
    texto: "Muy fácil de preparar y quedó deliciosa. Gracias por compartir.",
    autorId: usuarios[1]._id.toString(),
    autorNombre: usuarios[1].nombre,
    fecha: randomDate(),
    recetaId: recetas[0]._id.toString() // Comentario de Juan en la Pasta Carbonara
  },
  {
    _id: ObjectId(),
    texto: "Le añadí un poco de cilantro extra y quedó espectacular.",
    autorId: usuarios[2]._id.toString(),
    autorNombre: usuarios[2].nombre,
    fecha: randomDate(),
    recetaId: recetas[4]._id.toString() // Comentario de Ana en el Guacamole
  },
  {
    _id: ObjectId(),
    texto: "La preparé para una cena con amigos y fue un éxito total.",
    autorId: usuarios[3]._id.toString(),
    autorNombre: usuarios[3].nombre,
    fecha: randomDate(),
    recetaId: recetas[9]._id.toString() // Comentario de Carlos en la Paella
  },
  {
    _id: ObjectId(),
    texto: "Muy refrescante para el verano. La haré de nuevo seguro.",
    autorId: usuarios[4]._id.toString(),
    autorNombre: usuarios[4].nombre,
    fecha: randomDate(),
    recetaId: recetas[3]._id.toString() // Comentario de Laura en el Gazpacho
  },
  {
    _id: ObjectId(),
    texto: "Probé con diferentes tipos de queso y quedó genial.",
    autorId: usuarios[0]._id.toString(),
    autorNombre: usuarios[0].nombre,
    fecha: randomDate(),
    recetaId: recetas[5]._id.toString() // Comentario de María en el Risotto
  },
  {
    _id: ObjectId(),
    texto: "Excelente receta, aunque yo usé menos ajo y quedó perfecta para mi gusto.",
    autorId: usuarios[1]._id.toString(),
    autorNombre: usuarios[1].nombre,
    fecha: randomDate(),
    recetaId: recetas[7]._id.toString() // Comentario de Juan en el Hummus
  },
  {
    _id: ObjectId(),
    texto: "¡Delicioso! Añadí un poco de canela y le dio un toque especial.",
    autorId: usuarios[2]._id.toString(),
    autorNombre: usuarios[2].nombre,
    fecha: randomDate(),
    recetaId: recetas[8]._id.toString() // Comentario de Ana en el Tiramisú
  },
  {
    _id: ObjectId(),
    texto: "La preparación es sencilla y el resultado es fantástico. Muy recomendable.",
    autorId: usuarios[3]._id.toString(),
    autorNombre: usuarios[3].nombre,
    fecha: randomDate(),
    recetaId: recetas[2]._id.toString() // Comentario de Carlos en la Ensalada César
  },
  {
    _id: ObjectId(),
    texto: "Los hice para una fiesta y todos pidieron la receta. ¡Un éxito!",
    autorId: usuarios[4]._id.toString(),
    autorNombre: usuarios[4].nombre,
    fecha: randomDate(),
    recetaId: recetas[6]._id.toString() // Comentario de Laura en los Tacos de Pollo
  }
];

// Insertar comentarios
db.comentarios.insertMany(comentarios);

// Actualizar recetas con sus comentarios
for (var i = 0; i < comentarios.length; i++) {
  var recetaId = comentarios[i].recetaId;
  var comentarioId = comentarios[i]._id;
  db.recetas.updateOne(
    { _id: ObjectId(recetaId) },
    { $push: { comentarios: comentarioId.toString() } }
  );
}

print("Comentarios insertados: " + comentarios.length);
