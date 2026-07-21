import './style.css'
import { StorageService } from './services/StorageService'
import { Repository } from './services/Repository'
import { Habit } from './models/Habit';
import { OneTimeTask } from './models/OneTimeTask';
import { Priority } from './models/Priority'
import { Status } from './models/Status';

const storage = StorageService.obtenerInstancia(),
    habitos = new Repository<Habit>(storage, "habitos", Habit.desdeObjeto),
    tareas = new Repository<OneTimeTask>(storage, "tareas", OneTimeTask.desdeObjeto);

const formulario = document.querySelector("#form-habito") as HTMLFormElement,
    inpNombre = document.querySelector("#nombre-habito") as HTMLInputElement,
    txtDescripcion = document.querySelector("#descripcion") as HTMLTextAreaElement,
    slctPrioridad = document.querySelector("#prioridad") as HTMLSelectElement,
    contenedorHabitos = document.querySelector("#lista-habitos") as HTMLElement;

const formularioTarea = document.querySelector("#form-tarea") as HTMLFormElement,
    inpNombreTarea = document.querySelector("#nombre-tarea") as HTMLInputElement,
    txtDescripcionTarea = document.querySelector("#descripcion-tarea") as HTMLTextAreaElement,
    inpFechaTarea = document.querySelector("#fecha-tarea") as HTMLInputElement,
    inpHoraTarea = document.querySelector("#hora-tarea") as HTMLInputElement,
    slctPrioridadTarea = document.querySelector("#prioridad-tarea") as HTMLSelectElement,
    contenedorTareas = document.querySelector("#lista-tareas") as HTMLElement;

const hoy = new Date(),
    hoyString = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
    inpFechaTarea.min = hoyString;

const renderizarHabitos = (): void => {
    contenedorHabitos.innerHTML = "";
    const habits = habitos.obtenerTodos();
    for(let habito of habits) {
        const hoy = habito.obtenerFechaLocal(new Date());
        const completadoHoy = habito.ultimaFecha === hoy;
        contenedorHabitos.innerHTML += `<article class="tarjeta-habito">
                    <h2 class="tarjeta-habito__nombre">${habito.nombre}</h2>
                    <p class="tarjeta-habito__descripcion">${habito.descripcion}</p>
                    <p class="tarjeta-habito__prioridad">Prioridad: ${habito.prioridad}</p>
                    <p class="tarjeta-habito__racha">Racha: ${habito.racha}</p>
                    <button class="tarjeta-habito__boton tarjeta-habito__boton--completar"  data-id="${habito.id}" ${completadoHoy ? "disabled" : ""}>Completar</button>
                    <button class="tarjeta-habito__boton  tarjeta-habito__boton--eliminar" data-id="${habito.id}">Borrar</button>
                </article>`
    }

}

const renderizarTareas = (): void => {
    contenedorTareas.innerHTML = "";
    const listaTareas = tareas.obtenerTodos();
    for (let tarea of listaTareas) {
        contenedorTareas.innerHTML += `<article class="tarjeta-tarea">
                    <h2 class="tarjeta-tarea__nombre">${tarea.nombre}</h2>
                    <p class="tarjeta-tarea__descripcion">${tarea.descripcion}</p>
                    <p class="tarjeta-tarea__prioridad">Prioridad: ${tarea.prioridad}</p>
                    <p class="tarjeta-tarea__fecha">Vence: ${new Date(tarea.fechaFinal).toLocaleDateString()} a las ${tarea.horaFinal}</p>
                    <button class="tarjeta-tarea__boton tarjeta-tarea__boton--completar" data-id="${tarea.id}" ${tarea.completado ? "disabled" : ""}>Completar</button>
                    <button class="tarjeta-tarea__boton tarjeta-tarea__boton--eliminar" data-id="${tarea.id}">Borrar</button>
                </article>`
    }
}

formulario.addEventListener("submit", (event)=> {
    event.preventDefault();

    const nombre = inpNombre.value,
        descripcion = txtDescripcion.value,
        prioridad = slctPrioridad.value as Priority,
        id = Date.now();
    
    if(!nombre || !descripcion || !prioridad){
        alert("Por favor completa todos los campos");
        return;
    }

    const habito = new Habit(id, nombre, prioridad, descripcion); 
    habitos.agregar(habito);
    renderizarHabitos();
    formulario.reset();
});

formularioTarea.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = inpNombreTarea.value,
        descripcion = txtDescripcionTarea.value,
        fecha = inpFechaTarea.value,
        hora = inpHoraTarea.value,
        prioridad = slctPrioridadTarea.value as Priority,
        id = Date.now();

    if (!nombre || !descripcion || !fecha || !hora || !prioridad) {
        alert("Por favor completa todos los campos");
        return;
    }

    const tarea = new OneTimeTask(id, nombre, prioridad, descripcion, new Date(fecha), hora);
    tareas.agregar(tarea);
    renderizarTareas();
    formularioTarea.reset();
});

const actualizarHoraMinima = ():void => {
    const ahora = new Date();
    const hoyStringActual = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}-${String(ahora.getDate()).padStart(2, "0")}`;
    
    if (inpFechaTarea.value === hoyStringActual) {
        const horaActual = `${String(ahora.getHours()).padStart(2, "0")}:${String(ahora.getMinutes()).padStart(2, "0")}`;
        inpHoraTarea.min = horaActual;
    }
}

inpFechaTarea.addEventListener("change", actualizarHoraMinima);
inpHoraTarea.addEventListener("focus", actualizarHoraMinima);
inpHoraTarea.addEventListener("click", actualizarHoraMinima);

contenedorHabitos.addEventListener("click", (event)=> {
    const elemento = event.target as HTMLElement;

    if(elemento.classList.contains("tarjeta-habito__boton--completar")){
        const id = Number(elemento.dataset.id);
        const habito = habitos.obtenerPorId(id);
        if(habito){
            const seActualizo = habito.incrementarRacha();
            if(seActualizo){
                habitos.actualizar(id, habito);
            }
            
        }

    } else if (elemento.classList.contains("tarjeta-habito__boton--eliminar")){
        const id = Number(elemento.dataset.id);
        habitos.eliminar(id);
    } 
    renderizarHabitos();
});

contenedorTareas.addEventListener("click", (event) => {
    const elemento = event.target as HTMLElement;

    if (elemento.classList.contains("tarjeta-tarea__boton--completar")) {
        const id = Number(elemento.dataset.id);
        const tarea = tareas.obtenerPorId(id);
        if (tarea) {
            tarea.marcarCompletado();
            tareas.actualizar(id, tarea);
        }
    } else if (elemento.classList.contains("tarjeta-tarea__boton--eliminar")) {
        const id = Number(elemento.dataset.id);
        tareas.eliminar(id);
    }
    renderizarTareas();
});

renderizarHabitos();
renderizarTareas();