// MongoDB script para insertar 5 usuarios
db = db.getSiblingDB('recetasdb');

// Eliminar usuarios existentes para evitar duplicados
db.usuarios.deleteMany({});

// Insertar 5 usuarios
db.usuarios.insertMany([
  {
    _id: ObjectId(),
    nombre: "María García",
    email: "maria@example.com",
    password: "password123",
    recetasFavoritas: [],
    recetasCreadas: []
  },
  {
    _id: ObjectId(),
    nombre: "Juan Pérez",
    email: "juan@example.com",
    password: "password123",
    recetasFavoritas: [],
    recetasCreadas: []
  },
  {
    _id: ObjectId(),
    nombre: "Ana Rodríguez",
    email: "ana@example.com",
    password: "password123",
    recetasFavoritas: [],
    recetasCreadas: []
  },
  {
    _id: ObjectId(),
    nombre: "Carlos López",
    email: "carlos@example.com",
    password: "password123",
    recetasFavoritas: [],
    recetasCreadas: []
  },
  {
    _id: ObjectId(),
    nombre: "Laura Martínez",
    email: "laura@example.com",
    password: "password123",
    recetasFavoritas: [],
    recetasCreadas: []
  }
]);

// Guardar IDs de usuarios para usar en otros scripts
var usuarios = db.usuarios.find().toArray();
print("Usuarios insertados: " + usuarios.length);
print("IDs de usuarios para usar en otros scripts:");
for (var i = 0; i < usuarios.length; i++) {
  print("Usuario " + (i+1) + ": " + usuarios[i]._id);
}
