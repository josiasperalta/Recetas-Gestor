package com.bdii.recetario.Repository;

import com.bdii.recetario.Model.Receta;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecetaRepository extends MongoRepository<Receta, String> {
    List<Receta> findByAutor(String autor);
    List<Receta> findByTituloContainingIgnoreCase(String titulo);
}
