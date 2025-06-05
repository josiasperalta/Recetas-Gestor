package com.bdii.recetario.Model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "recetas")
@Data
public class Receta {
    @Id
    private String id;
    private String titulo;
    private String autor; // puede ser el ID del usuario
    private List<String> ingredientes = new java.util.ArrayList<>();
    private List<String> pasos = new java.util.ArrayList<>();
    private List<String> comentarios = new java.util.ArrayList<>(); // lista de IDs de comentarios
    private List<String> favoritos = new java.util.ArrayList<>(); // lista de IDs de usuarios que la marcaron   
    }
