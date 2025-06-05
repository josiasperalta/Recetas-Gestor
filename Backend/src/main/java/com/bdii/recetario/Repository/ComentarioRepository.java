package com.bdii.recetario.Repository;

import com.bdii.recetario.Model.Comentario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComentarioRepository extends MongoRepository<Comentario, String> {
    List<Comentario> findByRecetaId(String recetaId);
    List<Comentario> findByAutorId(String autorId);
}
