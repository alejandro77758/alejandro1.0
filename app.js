let alumnos = [
    { id: 1, legajo: "ALU-001", nombre: "Juan Pérez", curso: "1A" },
    { id: 2, legajo: "ALU-002", nombre: "María Gómez", curso: "1A" },
    { id: 3, legajo: "ALU-003", nombre: "Carlos Rodríguez", curso: "1A" }
];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fecha').valueAsDate = new Date();

    renderTabla();

    // Eventos de formulario de Alumno
    document.getElementById('alumno-form').addEventListener('submit', guardarAlumno);
    document.getElementById('btn-cancelar').addEventListener('click', resetearFormulario);

    // Evento para guardar asistencia
    document.getElementById('btn-guardar-asistencia').addEventListener('click', guardarAsistencia);
});

// Renderiza la tabla de alumnos
function renderTabla() {
    const tbody = document.getElementById('lista-alumnos');
    tbody.innerHTML = '';

    alumnos.forEach(alumno => {
        const tr = document.createElement('tr');
        tr.dataset.alumnoId = alumno.id;

        tr.innerHTML = `
            <td>${alumno.legajo}</td>
            <td><strong>${alumno.nombre}</strong></td>
            <td>
                <div class="attendance-options">
                    <label><input type="radio" name="estado-${alumno.id}" value="PRESENTE" checked> Presente</label>
                    <label><input type="radio" name="estado-${alumno.id}" value="AUSENTE"> Ausente</label>
                    <label><input type="radio" name="estado-${alumno.id}" value="TARDE"> Tarde</label>
                </div>
            </td>
            <td>
                <input type="text" class="input-obs" placeholder="Opcional..." id="obs-${alumno.id}">
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-warning" onclick="cargarAlumnoParaEditar(${alumno.id})">Editar</button>
                    <button class="btn-danger" onclick="eliminarAlumno(${alumno.id})">Borrar</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Agregar o Editar Alumno
function guardarAlumno(e) {
    e.preventDefault();

    const id = document.getElementById('alumno-id').value;
    const legajo = document.getElementById('legajo').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const curso = document.getElementById('form-curso').value;

    if (id) {
        // Editar existente (UPDATE)
        const alumno = alumnos.find(a => a.id === parseInt(id));
        if (alumno) {
            alumno.legajo = legajo;
            alumno.nombre = nombre;
            alumno.curso = curso;
        }
        // Llamada API Java / Supabase para UPDATE:
        // fetch(`/api/alumnos/${id}`, { method: 'PUT', body: JSON.stringify({legajo, nombre, curso}) })
    } else {
        // Crear nuevo (CREATE)
        const nuevoAlumno = {
            id: Date.now(), // ID temporal
            legajo: legajo,
            nombre: nombre,
            curso: curso
        };
        alumnos.push(nuevoAlumno);
        // Llamada API Java / Supabase para CREATE:
        // fetch('/api/alumnos', { method: 'POST', body: JSON.stringify(nuevoAlumno) })
    }

    resetearFormulario();
    renderTabla();
}

// Cargar datos en el formulario para editar
function cargarAlumnoParaEditar(id) {
    const alumno = alumnos.find(a => a.id === id);
    if (!alumno) return;

    document.getElementById('alumno-id').value = alumno.id;
    document.getElementById('legajo').value = alumno.legajo;
    document.getElementById('nombre').value = alumno.nombre;
    document.getElementById('form-curso').value = alumno.curso;

    document.getElementById('form-title').textContent = "Editar Alumno";
    document.getElementById('btn-guardar-alumno').textContent = "Actualizar Alumno";
    document.getElementById('btn-cancelar').style.display = "inline-block";
}

// Eliminar Alumno
function eliminarAlumno(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este alumno?")) {
        alumnos = alumnos.filter(a => a.id !== id);
        
        // Llamada API Java / Supabase para DELETE:
        // fetch(`/api/alumnos/${id}`, { method: 'DELETE' })

        renderTabla();
    }
}

// Resetear Formulario
function resetearFormulario() {
    document.getElementById('alumno-id').value = '';
    document.getElementById('alumno-form').reset();
    document.getElementById('form-title').textContent = "Agregar Nuevo Alumno";
    document.getElementById('btn-guardar-alumno').textContent = "Guardar Alumno";
    document.getElementById('btn-cancelar').style.display = "none";
}

// Guardar Registro de Asistencia
function guardarAsistencia() {
    const fecha = document.getElementById('fecha').value;
    const filas = document.querySelectorAll('#lista-alumnos tr');

    const registros = Array.from(filas).map(fila => {
        const id = fila.dataset.alumnoId;
        const estado = fila.querySelector(`input[name="estado-${id}"]:checked`).value;
        const observacion = fila.querySelector(`#obs-${id}`).value;

        return { alumnoId: parseInt(id), fecha, estado, observacion };
    });

    console.log("Guardando Asistencias:", registros);
    alert("Asistencia guardada con éxito");
}