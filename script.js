function actualizar_reloj(){
    const ahora = new Date();

    //formato de hora(12 o 24 horas)
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();
    let ampm = horas >= 12 ? 'PM' : 'AM';
    
    //convertir a formato de 12 horas
    horas = horas % 12;
    horas = horas ? horas : 12; // el 0 debe ser 12

    //agregar ceros a la izquierda
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    const hora_actual = horas + ':' + minutos + ':' + segundos + ' ' + ampm;
    document.getElementById('clock').innerHTML = hora_actual;

    //fecha
    const opciones_fecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha_actual = ahora.toLocaleDateString('es-ES', opciones_fecha);
    document.getElementById('date').innerHTML = fecha_actual;
}

setInterval(actualizar_reloj,1000);

actualizar_reloj();