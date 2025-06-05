package com.bdii.recetario.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "usuarios")
@Data
public class Usuario {
    @Id
    private String id;
    private String nombre;
    private String email;
    private String password;
    private List<String> recetasFavoritas = new ArrayList<>(); // IDs de recetas favoritas
    private List<String> recetasCreadas = new ArrayList<>(); // IDs de recetas creadas por el usuario
}
