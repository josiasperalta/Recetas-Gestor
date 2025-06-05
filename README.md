# 🍽️ Gestor de Recetas Colaborativo

Este proyecto es una aplicación web que permite a los usuarios crear, visualizar, comentar y guardar recetas de cocina.  
Es una plataforma colaborativa en la que múltiples usuarios pueden interactuar con el contenido en tiempo real.

---

## 🚀 Tecnologías Utilizadas

### 🖥️ Backend
- 💻 Lenguaje: **Java 17**
- ⚙️ Framework: **Spring Boot**
- 🗃️ Persistencia: **MongoDB** (con Spring Data MongoDB)
- 🧱 Arquitectura: Basada en capas (**model**, **controller**, **repository**, **service**) con enfoque **RESTful**
- 🧰 Herramientas adicionales: **Maven** como gestor de dependencias

### 🌐 Frontend
- 🖼️ Framework: **Angular**
- 📝 Lenguaje: **TypeScript**
- 🎨 Estilo: **HTML5 + CSS3 + Angular Material**
- 🔌 Consumo de API REST: mediante `HttpClient`

---

## 📦 Características Principales

- ✅ Crear, leer, actualizar y eliminar recetas
- 💬 Agregar comentarios a recetas
- ⭐ Guardar recetas favoritas
- 📱 Interfaz moderna, responsiva y adaptable
- ☁️ Base de datos MongoDB hospedada en **Atlas**, facilitando el despliegue remoto

---

## 📁 Estructura del Proyecto

Recetas-Gestor/
├── Backend/
│ └── Spring Boot + MongoDB
└── Frontend/
└── Angular + Angular Material

---

## 🛠️ En desarrollo por: Josias Peralta

Este proyecto forma parte de una práctica académica integradora para la Tecnicatura en Programación (UTN - Córdoba).


---

## ▶️ Instrucciones para la ejecución del proyecto

A continuación se detallan los pasos necesarios para ejecutar correctamente la aplicación tanto en el backend como en el frontend. Se recomienda el uso de entornos de desarrollo como **IntelliJ IDEA** (para Java) y **WebStorm** (para Angular), que ofrecen una experiencia de desarrollo completa y optimizada.

### 🔧 Requisitos previos

- ⚙️ Node.js y NPM instalados (versión recomendada: Node 18.x o superior)
- Angular CLI instalado globalmente  
  ```bash
  npm install -g @angular/cli
- Java 17

- Maven

- MongoDB (el proyecto ya está configurado para conectarse a MongoDB Atlas)
---


### 🖥️ Ejecución del Backend (Spring Boot + MongoDB)
Abrir el proyecto del backend (/Backend) en IntelliJ IDEA o el editor de preferencia.

- ✅ Ejecutar el siguiente comando desde la raíz del backend (o usar el IDE para compilar y correr):
  ```bash
  ./mvnw spring-boot:run
- ✅ Esto iniciará el servicio API REST en el puerto configurado (por defecto suele ser http://localhost:8080).
---


### 💻 Ejecución del Frontend (Angular)
- ✅Desde la terminal, entrar en la carpeta recetario-angular en WebStorm o el editor de preferencia.
  ```bash
  cd recetario-angular
  
- ✅Desde la terminal, instalar las dependencias del proyecto:  
  ```bash
  npm install

- ✅Iniciar el servidor de desarrollo de Angular:
  ```bash
    ng serve

- ✅Acceder a la aplicación web en el navegador:
  ```bash
  http://localhost:4200
