package com.bdii.recetario.Service;

import com.bdii.recetario.Model.Comentario;
import com.bdii.recetario.Model.Receta;
import com.bdii.recetario.Repository.ComentarioRepository;
import com.bdii.recetario.Repository.RecetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ComentarioService {
    
    @Autowired
    private ComentarioRepository comentarioRepository;
    
    @Autowired
    private RecetaRepository recetaRepository;
    
    // Obtener todos los comentarios de una receta
    public List<Comentario> getComentariosByReceta(String recetaId) {
        return comentarioRepository.findByRecetaId(recetaId);
    }
    
    // Crear un nuevo comentario
    public Comentario createComentario(Comentario comentario) {
        // Establecer la fecha actual
        comentario.setFecha(LocalDateTime.now());
        
        // Guardar el comentario
        Comentario savedComentario = comentarioRepository.save(comentario);
        
        // Actualizar la lista de comentarios en la receta
        Optional<Receta> recetaOpt = recetaRepository.findById(comentario.getRecetaId());
        if (recetaOpt.isPresent()) {
            Receta receta = recetaOpt.get();
            receta.getComentarios().add(savedComentario.getId());
            recetaRepository.save(receta);
        }
        
        return savedComentario;
    }
    
    // Eliminar un comentario
    public boolean deleteComentario(String id, String userId) {
        Optional<Comentario> comentarioOpt = comentarioRepository.findById(id);
        if (comentarioOpt.isPresent()) {
            Comentario comentario = comentarioOpt.get();
            
            // Verificar que el usuario es el autor del comentario
            if (comentario.getAutorId().equals(userId)) {
                comentarioRepository.deleteById(id);
                
                // Actualizar la lista de comentarios en la receta
                Optional<Receta> recetaOpt = recetaRepository.findById(comentario.getRecetaId());
                if (recetaOpt.isPresent()) {
                    Receta receta = recetaOpt.get();
                    receta.getComentarios().remove(id);
                    recetaRepository.save(receta);
                }
                
                return true;
            }
        }
        return false;
    }
    
    // Actualizar un comentario
    public Comentario updateComentario(String id, Comentario comentarioDetails, String userId) {
        Optional<Comentario> comentarioOpt = comentarioRepository.findById(id);
        if (comentarioOpt.isPresent()) {
            Comentario comentario = comentarioOpt.get();
            
            // Verificar que el usuario es el autor del comentario
            if (comentario.getAutorId().equals(userId)) {
                comentario.setTexto(comentarioDetails.getTexto());
                // Actualizar la fecha de modificación
                comentario.setFecha(LocalDateTime.now());
                return comentarioRepository.save(comentario);
            }
        }
        return null;
    }
}
