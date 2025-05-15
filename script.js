let alarmaHora = null;
let formato24h = true;

// Modifica la función del reloj para comprobar la alarma
function actualizar_reloj() {
    const ahora = new Date();

    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();

    let ampm = '';
    if (!formato24h) {
        ampm = horas >= 12 ? 'PM' : 'AM';
        horas = horas % 12;
        horas = horas ? horas : 12;
    }

    const mostrar_horas = horas.toString().padStart(2, '0');
    const mostrar_minutos = minutos.toString().padStart(2, '0');
    const mostrar_segundos = segundos.toString().padStart(2, '0');

    const hora_actual = `${mostrar_horas}:${mostrar_minutos}:${mostrar_segundos}${formato24h ? '' : ' ' + ampm}`;
    document.getElementById('clock').textContent = hora_actual;

    const opciones_fecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha_actual = ahora.toLocaleDateString('es-ES', opciones_fecha);
    document.getElementById('date').textContent = fecha_actual;

    // Verificar alarma
    if (alarmaHora && formato24h) {
        const hora_comparar = ahora.getHours().toString().padStart(2, '0') + ':' + ahora.getMinutes().toString().padStart(2, '0');

        if (hora_comparar === alarmaHora && segundos === 0) {
            const sonido = document.getElementById('alarma');
            sonido.play().catch(err => console.error("Error al reproducir el audio:", err));
            alert("⏰ ¡Es hora!");
            alarmaHora = null;
        }
    }
}

document.getElementById('alarmaBtn').addEventListener('click', function () {
    const entrada = prompt("Introduce la hora de la alarma (formato HH:MM, 24h):");
    if (entrada && /^\d{2}:\d{2}$/.test(entrada)) {
        alarmaHora = entrada;
        alert("Alarma establecida para las " + entrada);
    } else {
        alert("Formato inválido. Usa HH:MM (ej. 07:30)");
    }
});

document.getElementById('formatoBtn').addEventListener('click', function () {
    formato24h = !formato24h;
    this.textContent = formato24h ? 'Cambiar a 12h' : 'Cambiar a 24h';
    actualizar_reloj();
});

setInterval(actualizar_reloj, 1000);
actualizar_reloj();
