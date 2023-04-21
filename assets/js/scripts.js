const addButton = document.getElementById('add')
console.log(addButton)

const form = document.getElementById('reserve')
const horaInput = document.getElementById('hour')

// Crea una lista de valores permitidos
const valoresPermitidos = [];
for (let hora = 17; hora <= 22; hora++) {
  for (let minuto = 0; minuto < 60; minuto += 30) {
    valoresPermitidos.push(`${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`);
  }
}

// ENFOQUE 1
// const reservas = ["personas","fecha","hora","lugar","nombre","telefono","correo"]

// reservas.forEach((reserva) => {
//     const elemReserva = document.getElementById(reserva)


// })

// ENFOQUE 2
// const personas = document.getElementById("personas")
// const fecha = document.getElementById("fecha")
// const hora = document.getElementById("hora")
// const lugar = document.getElementById("lugar")
// const nombre = document.getElementById("nombre")
// const telefono = document.getElementById("telefono")
// const correo = document.getElementById("correo")

// function handleClick(event) {
//     event.preventDefault()
//     const reservas2 = {
//         personas: personas.value,
//         fecha: fecha.value,
//         hora: hora.value,
//         lugar: lugar.value,
//         nombre: nombre.value,
//         telefono: telefono.value,
//         correo: correo.value
//     }
//     console.log(reservas2)
// }

function readForm() {
    const fechaInput = document.getElementById("fecha")
    const horaInput = document.getElementById("hora")
    const personasInput = document.getElementById("personas")
    const lugarInput = document.getElementById("lugar")
    const nombreInput = document.getElementById("nombre")
    const telefonoInput = document.getElementById("telefono")
    const correoInput = document.getElementById("correo")
    

    const reserva = {
        fecha: fechaInput.value,
        hora: horaInput.value,
        personas: personasInput.value,
        lugar: lugarInput.value,
        nombre: nombreInput.value,
        telefono: telefonoInput.value,
        correo: correoInput.value
    }

    return reserva
}

function resetForm() {
    const fechaInput = document.getElementById("fecha")
    const horaInput = document.getElementById("hora")
    const personasInput = document.getElementById("personas")
    const lugarInput = document.getElementById("lugar")
    const nombreInput = document.getElementById("nombre")
    const telefonoInput = document.getElementById("telefono")
    const correoInput = document.getElementById("correo")

    fechaInput = '',
    horaInput = '',
    personasInput = '',
    lugarInput = '',
    nombreInput = '',
    telefonoInput = '',
    correoInput = ''

    return reserva
}

function create(event) {
    event.preventDefault()
    const tarea = readForm()
    addRow(tarea)
    resetForm()
    saveLocalData()
}

function addReserva() {
    const row = document.getElementById('')
    row.innerHTML = row += `
        <div class="">

        </div>
    `
}

function removeReserva(this) {
    const eliminar = this

}

function editReserva() {

}

function saveLocalData() {
    console.log(tareas)
    console.log(JSON.stringify(tareas))
    // Set item guardamos información en local storage
    //localStorage.setItem('tareas',tareas)
}

function readLocalData() {
    const tareas = JSON.parse(localStorage.getItem('tareas'))
    console.log(tarea)
    tareas.forEach(tarea => {
        addReserva(tarea)    
    })
}

readLocalData()
