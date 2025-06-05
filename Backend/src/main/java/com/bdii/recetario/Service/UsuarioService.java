package com.bdii.recetario.Service;

import com.bdii.recetario.Model.Usuario;
import com.bdii.recetario.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    // Obtener todos los usuarios
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }
    
    // Obtener usuario por ID
    public Optional<Usuario> getUsuarioById(String id) {
        return usuarioRepository.findById(id);
    }
    
    // Obtener usuario por email
    public Optional<Usuario> getUsuarioByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
    
    // Crear un nuevo usuario
    public Usuario createUsuario(Usuario usuario) {
        // Verificar si ya existe un usuario con el mismo email
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            return null; // Email ya registrado
        }
        
        // En una aplicación real, aquí se encriptaría la contraseña
        // usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        
        return usuarioRepository.save(usuario);
    }
    
    // Actualizar un usuario existente
    public Usuario updateUsuario(String id, Usuario usuarioDetails) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            
            // Actualizar solo los campos permitidos
            usuario.setNombre(usuarioDetails.getNombre());
            
            // Si se quiere cambiar el email, verificar que no exista ya
            if (!usuario.getEmail().equals(usuarioDetails.getEmail())) {
                if (usuarioRepository.existsByEmail(usuarioDetails.getEmail())) {
                    return null; // Email ya registrado
                }
                usuario.setEmail(usuarioDetails.getEmail());
            }
            
            // En una aplicación real, aquí se verificaría y encriptaría la nueva contraseña
            // if (usuarioDetails.getPassword() != null && !usuarioDetails.getPassword().isEmpty()) {
            //     usuario.setPassword(passwordEncoder.encode(usuarioDetails.getPassword()));
            // }

            // Actualizar lista de recetas favoritas
            if (usuarioDetails.getRecetasFavoritas() != null) {
                usuario.setRecetasFavoritas(usuarioDetails.getRecetasFavoritas());
            }
            
            return usuarioRepository.save(usuario);
        }
        return null;
    }
    
    // Eliminar un usuario
    public boolean deleteUsuario(String id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Autenticar usuario (simulado, en una app real se usaría Spring Security)
    public Optional<Usuario> authenticateUsuario(String email, String password) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            
            // En una aplicación real, aquí se verificaría la contraseña encriptada
            // if (passwordEncoder.matches(password, usuario.getPassword())) {
            if (password.equals(usuario.getPassword())) {
                return Optional.of(usuario);
            }
        }
        return Optional.empty();
    }
}
