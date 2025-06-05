package com.bdii.recetario.Service;

import com.bdii.recetario.Model.Receta;
import com.bdii.recetario.Model.Usuario;
import com.bdii.recetario.Repository.RecetaRepository;
import com.bdii.recetario.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RecetaService {
    
    @Autowired
    private RecetaRepository recetaRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    // Obtener todas las recetas
    public List<Receta> getAllRecetas() {
        return recetaRepository.findAll();
    }
    
    // Obtener receta por ID
    public Optional<Receta> getRecetaById(String id) {
        return recetaRepository.findById(id);
    }
    
    // Buscar recetas por título
    public List<Receta> searchRecetasByTitulo(String titulo) {
        return recetaRepository.findByTituloContainingIgnoreCase(titulo);
    }
    
    // Obtener recetas de un usuario
    public List<Receta> getRecetasByAutor(String autorId) {
        return recetaRepository.findByAutor(autorId);
    }
    
    // Crear una nueva receta
    public Receta createReceta(Receta receta, String userId) {
        Receta savedReceta = recetaRepository.save(receta);
        
        // Actualizar la lista de recetas creadas por el usuario
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(userId);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            usuario.getRecetasCreadas().add(savedReceta.getId());
            usuarioRepository.save(usuario);
        }
        
        return savedReceta;
    }
    
    // Actualizar una receta existente
    public Receta updateReceta(String id, Receta recetaDetails) {
        Optional<Receta> recetaOpt = recetaRepository.findById(id);
        if (recetaOpt.isPresent()) {
            Receta receta = recetaOpt.get();
            receta.setTitulo(recetaDetails.getTitulo());
            receta.setIngredientes(recetaDetails.getIngredientes());
            receta.setPasos(recetaDetails.getPasos());
            return recetaRepository.save(receta);
        }
        return null;
    }
    
    // Eliminar una receta
    public boolean deleteReceta(String id, String userId) {
        Optional<Receta> recetaOpt = recetaRepository.findById(id);
        if (recetaOpt.isPresent()) {
            Receta receta = recetaOpt.get();
            
            // Verificar que el usuario es el autor de la receta
            if (receta.getAutor().equals(userId)) {
                recetaRepository.deleteById(id);
                
                // Actualizar la lista de recetas creadas por el usuario
                Optional<Usuario> usuarioOpt = usuarioRepository.findById(userId);
                if (usuarioOpt.isPresent()) {
                    Usuario usuario = usuarioOpt.get();
                    usuario.getRecetasCreadas().remove(id);
                    usuarioRepository.save(usuario);
                }
                
                return true;
            }
        }
        return false;
    }
    
    // Marcar/desmarcar receta como favorita
    public boolean toggleFavorito(String recetaId, String userId) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(userId);
        Optional<Receta> recetaOpt = recetaRepository.findById(recetaId);
        
        if (usuarioOpt.isPresent() && recetaOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            Receta receta = recetaOpt.get();
            
            List<String> favoritosUsuario = usuario.getRecetasFavoritas();
            List<String> favoritosReceta = receta.getFavoritos();
            
            // Inicializar la lista si es null
            if (favoritosReceta == null) {
                favoritosReceta = new java.util.ArrayList<>();
                receta.setFavoritos(favoritosReceta);
            }
            
            boolean esFavorita = favoritosUsuario.contains(recetaId);
            
            // Si ya está en favoritos, quitarla
            if (esFavorita) {
                favoritosUsuario.remove(recetaId);
                favoritosReceta.remove(userId);
            } else {
                // Si no está en favoritos, agregarla
                favoritosUsuario.add(recetaId);
                favoritosReceta.add(userId);
            }
            
            usuarioRepository.save(usuario);
            recetaRepository.save(receta);
            return true;
        }
        return false;
    }
    
    // Obtener recetas favoritas de un usuario
    public List<Receta> getFavoritasByUsuario(String userId) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(userId);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            List<String> favoritosIds = usuario.getRecetasFavoritas();
            return recetaRepository.findAllById(favoritosIds);
        }
        return List.of();
    }
}
