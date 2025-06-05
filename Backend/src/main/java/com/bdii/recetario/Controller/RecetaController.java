package com.bdii.recetario.Controller;

import com.bdii.recetario.Model.Receta;
import com.bdii.recetario.Service.RecetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/recetas")
@CrossOrigin(origins = "*") // Permitir solicitudes desde cualquier origen
public class RecetaController {
    
    @Autowired
    private RecetaService recetaService;
    
    // Obtener todas las recetas o filtrar por usuario si se pasa userId
    @GetMapping
    public ResponseEntity<?> getAllRecetas(@RequestParam(required = false) String userId) {
        try {
            if (userId != null && !userId.isEmpty()) {
                // Filtrar recetas por autor
                return ResponseEntity.ok(recetaService.getRecetasByAutor(userId));
            } else {
                // Devolver todas las recetas
                return ResponseEntity.ok(recetaService.getAllRecetas());
            }
        } catch (Exception e) {
            // Manejo de error: loguear y devolver mensaje claro
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Error interno al obtener recetas", "error", e.getMessage()));
        }
    }
    
    // Obtener receta por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getRecetaById(@PathVariable String id) {
        return recetaService.getRecetaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Buscar recetas por título
    @GetMapping("/search")
    public ResponseEntity<List<Receta>> searchRecetas(@RequestParam String titulo) {
        return ResponseEntity.ok(recetaService.searchRecetasByTitulo(titulo));
    }
    
    // Obtener recetas de un usuario
    @GetMapping("/autor/{autorId}")
    public ResponseEntity<List<Receta>> getRecetasByAutor(@PathVariable String autorId) {
        return ResponseEntity.ok(recetaService.getRecetasByAutor(autorId));
    }
    
    // Crear una nueva receta
    @PostMapping
    public ResponseEntity<Receta> createReceta(@RequestBody Receta receta, @RequestParam String userId) {
        // Establecer el autor de la receta usando el userId
        receta.setAutor(userId);
        Receta nuevaReceta = recetaService.createReceta(receta, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaReceta);
    }
    
    // Actualizar una receta existente
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReceta(
            @PathVariable String id, 
            @RequestBody Receta recetaDetails,
            @RequestParam String userId) {
        // Verificar que el usuario es el autor de la receta
        Optional<Receta> recetaOpt = recetaService.getRecetaById(id);
        if (recetaOpt.isPresent() && recetaOpt.get().getAutor().equals(userId)) {
            Receta recetaActualizada = recetaService.updateReceta(id, recetaDetails);
            if (recetaActualizada != null) {
                return ResponseEntity.ok(recetaActualizada);
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "No tienes permiso para editar esta receta"));
    }
    
    // Eliminar una receta
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReceta(@PathVariable String id, @RequestParam String userId) {
        boolean eliminado = recetaService.deleteReceta(id, userId);
        if (eliminado) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "No tienes permiso para eliminar esta receta"));
    }
    
    // Marcar/desmarcar receta como favorita
    @PostMapping("/{id}/favorito")
    public ResponseEntity<?> toggleFavorito(@PathVariable String id, @RequestParam String userId) {
        boolean actualizado = recetaService.toggleFavorito(id, userId);
        if (actualizado) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // Obtener recetas favoritas de un usuario
    @GetMapping("/favoritas")
    public ResponseEntity<List<Receta>> getFavoritas(@RequestParam String userId) {
        return ResponseEntity.ok(recetaService.getFavoritasByUsuario(userId));
    }
}
