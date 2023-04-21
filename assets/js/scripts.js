//variable en localStorage con los datos del cliente
var datosRecuperados = localStorage.getItem("cliente");

//data = {nombre: 'marcos', apellido: 'abarza', email: 'marcos.abarza@example.com'}
var cliente = JSON.parse(localStorage.getItem('cliente'));


function agregar_cliente(data){
    // Verificar si hay datos existentes o no
    if (cliente === null) {
        // Si no hay datos existentes, crear un array vacío
        cliente = [];
    }

    // Agregar nuevos datos al array
    cliente.push(data);
    
    // Guardar los datos actualizados en el Local Storage
    localStorage.setItem('cliente', JSON.stringify(cliente));
}

function guardar_reserva( queryString ){

    let formData = {};
    queryString = queryString.replace(/\+/g, ' ');

    queryString.split('&').forEach(function(item) {
        let keyValue = item.split('=');
        formData[keyValue[0]] = decodeURIComponent(keyValue[1]);
    });

    // Verificar si el valor es un array
    if (Array.isArray(JSON.parse(datosRecuperados))) {
        // El valor es un array y añadimos
        cliente = JSON.parse(datosRecuperados);
    } else {
        // El valor no es un array, borramos el valor de la clave "cliente"
        localStorage.removeItem('cliente');
        cliente = null
    }
    
    // Verificar si hay datos existentes o no
    if (cliente === null) {
        // Si no hay datos existentes, crear un array vacío
        cliente = [];
    }        
    // Agregar nuevos datos al array
    cliente.push(formData);

        // Guardar los datos actualizados en el Local Storage
    localStorage.setItem('cliente', JSON.stringify(cliente));

    mostrar_calendario();
}

function enviar_reserva(){        

    // capturamos el botón que envía el formulario
    let form = document.getElementById('appointments');
    // creamos la variable que almacena los datos del formulario
    let datosFormulario = new FormData(form);
    // pasamos los datos  del formulario a string
    let queryString = new URLSearchParams(datosFormulario).toString(); 
    
    // el string se lo pasamos a la función guardar reserva y ejecutamos
    guardar_reserva(queryString);
    console.log('enviado la siguiente reserva: ' + queryString);
}

function mostrar_reserva(dia){

    var reservas = JSON.parse(datosRecuperados);
    var reservasDia = [];

    // Recorrer las reservas y agregar las que sean del día indicado a un nuevo arreglo
    reservas.forEach(function (reserva) {
        // Obtener la fecha en UTC
        var fechaUTC = new Date(Date.UTC(reserva.fecha.split("-")[0], reserva.fecha.split("-")[1] - 1, reserva.fecha.split("-")[2]));

        // Comparar si el día es igual al indicado
        if (fechaUTC.getUTCDate() === dia) {
             // Obtener el índice de la reserva en el array original
            var index = reservas.indexOf(reserva);
            reservasDia.push({ reserva_unit : reserva, indice_real: index });
        }
    });

    // Mostrar las reservas del día
    console.log("Reservas del día " + dia + ":");
    console.log(reservasDia);

    html = '<aside class="">';
    html += '<h5 class="m-0">Listado de reservas</h5>';
    html += '<h4 class="selected-date"><span class="material-symbols-outlined">calendar_month</span> '+dia+' de Abril 2023</h4>';
    html += '<div class="reserva-container">';
    reservasDia.forEach(function (elemento){
        html += '<div class="reserva w-100 row mb-2 mx-0">';
        html += '<div class="col-1 dinner-icon d-flex justify-content-center align-items-center">';
        html += '<span class="material-symbols-outlined">';
        html += 'restaurant';
        html += '</span>';
        html += '</div>';
        html += '<div class="col-5 col-md-7">';
        html += '<p class="reserva-name m-0">'+ elemento.reserva_unit.nombre + '</p>';
        html += '<p class="reserva-people m-0 purple">'+ elemento.reserva_unit.personas + ' personas</p>';
        html += '<p class="reserva-hour m-0">A las '+ elemento.reserva_unit.hora + ' hrs</p>';
        html += '<p class="reserva-place place">'+ elemento.reserva_unit.lugar + '</p>';
        html += '</div>';
        html += '<div class="col-6 col-md-4">';
        html += '<div class="m-0 d-flex flex-row justify-content-around m-0">';
        html += '<a class="reserva-number" href="tel:'+ elemento.reserva_unit.telefono + '">';
        html += '<button class="call-button">';
        html += '<span class="material-symbols-outlined">phone</span>';
        html += '<span class="d-md-block d-none">Llamar</span>';
        html += '</button>';
        html += '</a>';
        html += '<button class="edit-button" onclick="modal_editar('+ elemento.indice_real + ','+ dia +');" >';
        html += '<span class="material-symbols-outlined" >edit</span>';
        html += '<span class="d-md-block d-none">Editar</span>';
        html += '</button>';
        html += '<button class="delete-button" onclick="borrar_reserva('+ elemento.indice_real + ','+ dia +');" >' ;
        html += '<span class="material-symbols-outlined">close</span>';
        html += '<span class="d-md-block d-none">Eliminar</span>';
        html += '</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    });
    html += '</div>';
    html += '</aside>';

    calendarioPrincipal = document.querySelector('.calendario-principal');
    calendarioPrincipal.innerHTML = html;
}

function mostrar_calendario(){
    var datosRecuperados = localStorage.getItem("cliente");
    var citas = JSON.parse(datosRecuperados);

    mes = [];

    citas.forEach(function(cita) {
        var fecha = cita.fecha.split('-');
        var dia = new Date(Date.UTC(fecha[0], fecha[1]-1, fecha[2])).getUTCDate();
        
        if (!mes[dia]) {  // Si la posición dia no está definida, se crea como un array vacío
            mes[dia] = [];
        }

        mes[dia].push(1);
        
    });
    console.log(mes);

    if (mes) {
        mes.forEach(function(elemento, indice) {
          var cantidadElementos = elemento.length;
          var contenedor = document.querySelector('[data-dia="' + indice + '"]');
          var s = cantidadElementos === 1 ? "" : "s";
      
          var badgeElements = contenedor.querySelectorAll('.badge');
          if (badgeElements.length > 0) {
            badgeElements.forEach(function(badge) {
              badge.remove();
            });
          }
      
          var badge = document.createElement('span');
          badge.classList.add('badge', 'bg-primary', 'rounded-pill');
          badge.textContent = cantidadElementos + ' reserva' + s;
          contenedor.querySelector('.contenedor').appendChild(badge);
        });
    }
}