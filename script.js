let alarmaHora = null;
let formato24h = true;

document.getElementById('alarmaBtn').addEventListener('click', function () {
    Swal.fire({
        title: 'Establecer alarma',
        input: 'text',
        inputLabel: 'Introduce la hora (formato HH:MM, 24h)',
        inputPlaceholder: 'Ej. 07:30',
        showCancelButton: true,
        confirmButtonText: 'Establecer',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!/^\d{2}:\d{2}$/.test(value)) {
            return 'Formato inválido. Usa HH:MM';
            }
        }
        }).then((resultado) => {
        if (resultado.isConfirmed) {
            alarmaHora = resultado.value;
            Swal.fire({
            title: '✅ Alarma establecida',
            text: `Hora: ${alarmaHora}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
            });
        }
    });
    if (entrada && /^\d{2}:\d{2}$/.test(entrada)) {
        alarmaHora = entrada;
        Swal.fire({
            title: '✅ Alarma establecida',
            text: `Hora: ${entrada}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

    } else {
        Swal.fire({
            title: '⚠️ Formato inválido',
            text: 'Usa el formato HH:MM (ej. 07:30)',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });

    }
});

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
            Swal.fire({
                title: '⏰ ¡Es hora!',
                text: 'La alarma se ha activado.',
                icon: 'info',
                confirmButtonText: 'Aceptar',
                timer: 5000,
            })
            alarmaHora = null;
        }
    }
}


document.getElementById('formatoBtn').addEventListener('click', function () {
    formato24h = !formato24h;
    this.textContent = formato24h ? 'Cambiar a 12h' : 'Cambiar a 24h';
    actualizar_reloj();
});

const modoGuardado = localStorage.getItem('modo') || 'claro';
document.body.classList.add(`modo-${modoGuardado}`);
const icono = document.getElementById('modoIcon');
icono.classList = modoGuardado === 'oscuro' ? 'fas fa-sun' : 'fas fa-moon';

document.getElementById('modoBtn').addEventListener('click', function () {
    document.body.classList.toggle('modo-oscuro');
    document.body.classList.toggle('modo-claro');

    const esModoOscuro = document.body.classList.contains('modo-oscuro');
    icono.classList = esModoOscuro ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('modo', esModoOscuro ? 'oscuro' : 'claro');
});


setInterval(actualizar_reloj, 1000);
actualizar_reloj();

