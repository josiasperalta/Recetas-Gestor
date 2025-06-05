// MongoDB script para insertar 10 recetas
db = db.getSiblingDB('recetasdb');

// Eliminar recetas existentes para evitar duplicados
db.recetas.deleteMany({});

// Obtener IDs de usuarios para asignar como autores
var usuarios = db.usuarios.find().toArray();
if (usuarios.length < 5) {
  print("Error: Primero ejecuta el script de usuarios.js");
  quit();
}

// Crear 10 recetas
var recetas = [
  {
    _id: ObjectId(),
    titulo: "Pasta Carbonara",
    autor: usuarios[0]._id.toString(), // María
    ingredientes: [
      "200g de espaguetis",
      "100g de panceta o bacon",
      "2 huevos",
      "50g de queso parmesano rallado",
      "Pimienta negra",
      "Sal"
    ],
    pasos: [
      "Cocinar la pasta en agua con sal según las instrucciones del paquete.",
      "Mientras tanto, cortar la panceta en trozos pequeños y dorarla en una sartén.",
      "Batir los huevos en un bol y mezclar con el queso rallado y pimienta.",
      "Escurrir la pasta y mezclarla con la panceta.",
      "Retirar del fuego y añadir la mezcla de huevo, removiendo rápidamente."
    ],
    comentarios: [],
    favoritos: []
  },
  {
    _id: ObjectId(),
    titulo: "Tortilla Española",
    autor: usuarios[1]._id.toString(), // Juan
    ingredientes: [
      "5 patatas medianas",
      "1 cebolla",
      "6 huevos",
      "Aceite de oliva",
      "Sal"
    ],
    pasos: [
      "Pelar y cortar las patatas en rodajas finas.",
      "Cortar la cebolla en juliana.",
      "Freír las patatas y la cebolla a fuego medio-bajo hasta que estén tiernas.",
      "Batir los huevos en un bol grande, añadir sal y mezclar con las patatas y cebolla.",
      "Verter la mezcla en una sartén y cocinar a fuego medio hasta que cuaje.",
      "Dar la vuelta con ayuda de un plato y cocinar por el otro lado."
    ],
    comentarios: [],
    favoritos: []
  },
  {
    _id: ObjectId(),
    titulo: "Ensalada César",
    autor: usuarios[2]._id.toString(), // Ana
    ingredientes: [
      "1 lechuga romana",
      "100g de pollo a la plancha",
      "50g de queso parmesano",
      "Crutones de pan",
      "Salsa César",
      "Pimienta negra"
    ],
    pasos: [
      "Lavar y cortar la lechuga en trozos.",
      "Cortar el pollo en tiras después de cocinarlo a la plancha.",
      "Mezclar la lechuga con el pollo, los crutones y el queso rallado.",
      "Aliñar con la salsa César y añadir pimienta al gusto."
    ],
    comentarios: [],
    favoritos: []
  },
  {
    _id: ObjectId(),
    titulo: "Gazpacho Andaluz",
    autor: usuarios[3]._id.toString(), // Carlos
    ingredientes: [
      "1kg de tomates maduros",
      "1 pepino",
      "1 pimiento verde",
      "1 diente de ajo",
      "50ml de aceite de oliva",
      "Vinagre de vino",
      "Sal"
    ],
    pasos: [
      "Lavar y trocear todas las verduras.",
      "Triturar todos los ingredientes con una batidora.",
      "Añadir el aceite, vinagre y sal al gusto.",
      "Colar la mezcla para eliminar pieles y semillas.",
      "Refrigerar por al menos 2 horas antes de servir."
    ],
    comentarios: [],
    favoritos: []
  },
  {
    _id: ObjectId(),
    titulo: "Guacamole",
    autor: usuarios[4]._id.toString(), // Laura
    ingredientes: [
      "2 aguacates maduros",
      "1 tomate pequeño",
      "1/2 cebolla",
      "1 chile jalapeño (opcional)",
      "Zumo de 1 lima",
      "Cilantro fresco",
      "Sal"
    ],
    pasos: [
      "Cortar los aguacates por la mitad y quitar el hueso.",
      "Machacar la pulpa del aguacate en un bol.",
      "Picar finamente el tomate, la cebolla y el chile.",
      "Mezclar todos los ingredientes y añadir el zumo de lima.",
      "Añadir cilantro picado y sal al gusto."
    ],
    comentarios: [],
    favoritos: []
  },
  {
    _id: ObjectId(),
    titulo: "Risotto de Champiñones",
    autor: usuarios[0]._id.toString(), // María
    ingredientes: [
      "300g de arroz arborio",
      "200g de champiñones",
      "1 cebolla",
      "2 dientes de ajo",
      "100ml de vino blanco",
      "1L de caldo de verduras",
      "50g de queso parmesano",
      "Aceite de oliva",
      "Sal y pimienta"
    ],
    pasos: [
      "Picar la cebolla y el ajo finamente.",
      "Limpiar y cortar los champiñones en láminas.",
      "Sofreír la cebolla y el ajo en aceite de oliva.",
      "Añadir el arroz y tostar ligeramente.",
      "Verter el vino y dejar que se evapore.",
      "Ir añadiendo el caldo caliente poco a poco, removiendo constantemente.",
      "Cuando el arroz esté casi cocido, añadir los champiñones.",
      "Finalizar con el queso parmesano y servir."
    ],
    comentarios: [],
    favoritos: []
  },
  {
    _id: ObjectId(),
    titulo: "Tacos de Pollo",
    autor: usuarios[1]._id.toString(), // Juan
    ingredientes: [
      "500g de pechuga de pollo",
      "8 tortillas de maíz",
      "1 cebolla",
      "1 pimiento",
      "Especias mexicanas",
      "Guacamole",
      "Salsa de tomate",
      "Cilantro fresco",
      "Zumo de lima"
    ],
    pasos: [
      "Cortar el pollo en tiras y sazonarlo con las especias.",
      "Cortar la cebolla y el pimiento en juliana.",
      "Saltear el pollo con las verduras hasta que esté bien cocido.",
      "Calentar las tortillas en una sartén.",
      "Rellenar las tortillas con la mezcla de pollo.",
      "Servir con guacamole, salsa de tomate, cilantro y zumo de lima."
    ],
    comentarios: [],
    favoritos: []
  },
  {
    _id: ObjectId(),
    titulo: "Hummus",
    autor: usuarios[2]._id.toString(), // Ana
    ingredientes: [
      "400g de garbanzos cocidos",
      "2 cucharadas de tahini",
      "2 dientes de ajo",
      "Zumo de 1 limón",
      "50ml de aceite de oliva",
      "1 cucharadita de comino",
      "Sal",
      "Pimentón dulce para decorar"
    ],
    pasos: [
      "Escurrir y lavar los garbanzos.",
      "Triturar los garbanzos con el tahini, ajo, zumo de limón y comino.",
      "Añadir el aceite de oliva poco a poco mientras se sigue triturando.",
      "Añadir sal al gusto y más aceite si es necesario para conseguir la textura deseada.",
      "Servir en un bol, hacer un hueco en el centro y añadir un poco de aceite y pimentón."
    ],
    comentarios: [],
    favoritos: []
  },
  {
    _id: ObjectId(),
    titulo: "Tiramisú",
    autor: usuarios[3]._id.toString(), // Carlos
    ingredientes: [
      "250g de queso mascarpone",
      "3 huevos",
      "100g de azúcar",
      "200g de bizcochos de soletilla",
      "Café fuerte",
      "Cacao en polvo",
      "Amaretto (opcional)"
    ],
    pasos: [
      "Separar las claras de las yemas.",
      "Batir las yemas con la mitad del azúcar hasta que blanqueen.",
      "Añadir el mascarpone a las yemas y mezclar bien.",
      "Montar las claras a punto de nieve con el resto del azúcar.",
      "Incorporar las claras a la mezcla de mascarpone con movimientos envolventes.",
      "Mojar los bizcochos en café (y amaretto si se desea).",
      "Alternar capas de bizcochos y crema en un recipiente.",
      "Terminar con una capa de crema y espolvorear con cacao.",
      "Refrigerar al menos 4 horas antes de servir."
    ],
    comentarios: [],
    favoritos: []
  },
  {
    _id: ObjectId(),
    titulo: "Paella Valenciana",
    autor: usuarios[4]._id.toString(), // Laura
    ingredientes: [
      "400g de arroz bomba",
      "200g de pollo",
      "200g de conejo",
      "100g de judías verdes",
      "100g de garrofón",
      "1 tomate rallado",
      "1 pimiento rojo",
      "Azafrán",
      "Pimentón dulce",
      "1L de caldo de pollo",
      "Aceite de oliva",
      "Sal"
    ],
    pasos: [
      "Calentar aceite en la paellera y dorar el pollo y el conejo troceados.",
      "Añadir las judías verdes y el garrofón, y sofreír.",
      "Incorporar el tomate rallado y el pimiento, y cocinar unos minutos.",
      "Añadir el pimentón y remover rápidamente.",
      "Verter el caldo caliente y el azafrán, y dejar hervir 5 minutos.",
      "Añadir el arroz, distribuir bien y cocinar a fuego fuerte 10 minutos.",
      "Bajar el fuego y cocinar 8 minutos más.",
      "Apagar el fuego, cubrir con un paño y dejar reposar 5 minutos antes de servir."
    ],
    comentarios: [],
    favoritos: []
  }
];

// Insertar recetas
db.recetas.insertMany(recetas);

// Actualizar usuarios con sus recetas creadas
for (var i = 0; i < recetas.length; i++) {
  var autorId = recetas[i].autor;
  var recetaId = recetas[i]._id;
  db.usuarios.updateOne(
    { _id: ObjectId(autorId) },
    { $push: { recetasCreadas: recetaId.toString() } }
  );
}

// Guardar IDs de recetas para usar en otros scripts
var recetasInsertadas = db.recetas.find().toArray();
print("Recetas insertadas: " + recetasInsertadas.length);
print("IDs de recetas para usar en otros scripts:");
for (var i = 0; i < recetasInsertadas.length; i++) {
  print("Receta " + (i+1) + ": " + recetasInsertadas[i]._id);
}
