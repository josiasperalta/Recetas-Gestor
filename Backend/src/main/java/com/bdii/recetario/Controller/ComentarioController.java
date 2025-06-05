package com.bdii.recetario.Controller;

import com.bdii.recetario.Model.Comentario;
import com.bdii.recetario.Service.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comentarios")
@CrossOrigin(origins = "*")
public class ComentarioController {
    
    @Autowired
    private ComentarioService comentarioService;
    
    // Obtener todos los comentarios de una receta
    @GetMapping("/receta/{recetaId}")
    public ResponseEntity<List<Comentario>> getComentariosByReceta(@PathVariable String recetaId) {
        return ResponseEntity.ok(comentarioService.getComentariosByReceta(recetaId));
    }
    
    // Crear un nuevo comentario
    @PostMapping
    public ResponseEntity<Comentario> createComentario(@RequestBody Comentario comentario) {
        Comentario nuevoComentario = comentarioService.createComentario(comentario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoComentario);
    }
    
    // Actualizar un comentario existente
    @PutMapping("/{id}")
    public ResponseEntity<?> updateComentario(
            @PathVariable String id, 
            @RequestBody Comentario comentarioDetails,
            @RequestParam String userId) {
        
        Comentario comentarioActualizado = comentarioService.updateComentario(id, comentarioDetails, userId);
        if (comentarioActualizado != null) {
            return ResponseEntity.ok(comentarioActualizado);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "No tienes permiso para editar este comentario"));
    }
    
    // Eliminar un comentario
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComentario(@PathVariable String id, @RequestParam String userId) {
        boolean eliminado = comentarioService.deleteComentario(id, userId);
        if (eliminado) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "No tienes permiso para eliminar este comentario"));
    }
}
