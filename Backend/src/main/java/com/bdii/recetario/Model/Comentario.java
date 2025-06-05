package com.bdii.recetario.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;

@Document(collection = "comentarios")
@Data
public class Comentario {
    @Id
    private String id;
    private String texto;
    private String autorId; // ID del usuario que hizo el comentario
    private String autorNombre; // Nombre del usuario para mostrar
    private LocalDateTime fecha;
    private String recetaId; // ID de la receta a la que pertenece
}
