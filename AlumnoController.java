package com.colegio.asistencia.controller;

import com.colegio.asistencia.model.Alumno; // Tu entidad JPA/Modelo
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/alumnos")
@CrossOrigin(origins = "*")
public class AlumnoController {

    // 1. Obtener todos los alumnos (READ)
    @GetMapping
    public ResponseEntity<List<Alumno>> obtenerTodos() {
        // Lógica para consultar base de datos
        List<Alumno> alumnos = new ArrayList<>(); 
        return ResponseEntity.ok(alumnos);
    }

    // 2. Crear un nuevo alumno (CREATE)
    @PostMapping
    public ResponseEntity<String> crearAlumno(@RequestBody Alumno alumno) {
        // Lógica repository.save(alumno)
        System.out.println("Guardando alumno: " + alumno.getNombre());
        return ResponseEntity.ok("Alumno creado con éxito");
    }

    // 3. Actualizar un alumno existente (UPDATE)
    @PutMapping("/{id}")
    public ResponseEntity<String> actualizarAlumno(@PathVariable Long id, @RequestBody Alumno alumnoActualizado) {
        // Lógica de búsqueda por ID y actualización de campos
        System.out.println("Actualizando alumno con ID: " + id);
        return ResponseEntity.ok("Alumno actualizado correctamente");
    }

    // 4. Eliminar un alumno (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarAlumno(@PathVariable Long id) {
        // Lógica repository.deleteById(id)
        System.out.println("Eliminando alumno ID: " + id);
        return ResponseEntity.ok("Alumno eliminado correctamente");
    }
}