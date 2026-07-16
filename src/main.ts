import './style.css'
import { StorageService } from './services/StorageService'
import { Repository } from './services/Repository'
import { Habit } from './models/Habit';
import { OneTimeTask } from './models/OneTimeTask';
import { Priority } from './models/Priority'
import { Status } from './models/Status';

const storage = StorageService.obtenerInstancia(),
    habitos = new Repository<Habit>(storage,"habitos"),
    tareas = new Repository<OneTimeTask>(storage,"tareas");

const formulario = document.querySelector("#form-habito") as HTMLFormElement,
    inpNombre = document.querySelector("#nombre-habito") as HTMLInputElement,
    txtDescripcion = document.querySelector("#descripcion") as HTMLTextAreaElement,
    slctPrioridad = document.querySelector("#prioridad") as HTMLSelectElement,
    contenedorHabitos = document.querySelector("#lista-habitos") as HTMLElement;

const renderizarHabitos = (): void => {
    contenedorHabitos.innerHTML = "";
    const habits = habitos.obtenerTodos();
    for(let habito of habits) {
        contenedorHabitos.innerHTML += `<article class="tarjeta-habito">
                    <h2 class="tarjeta-habito__nombre">${habito.nombre}</h2>
                    <p class="tarjeta-habito__descripcion">${habito.descripcion}</p>
                    <p class="tarjeta-habito__prioridad">Prioridad: ${habito.prioridad}</p>
                    <p class="tarjeta-habito__racha">Racha: ${habito.racha}</p>
                    <button class="tarjeta-habito__boton tarjeta-habito__boton--completar"  data-id="${habito.id}">Completar</button>
                    <button class="tarjeta-habito__boton  tarjeta-habito__boton--eliminar" data-id="${habito.id}">Borrar</button>
                </article>`
    }

}

formulario.addEventListener("submit", (event)=> {
    event.preventDefault();

    const nombre = inpNombre.value,
        descripcion = txtDescripcion.value,
        prioridad = slctPrioridad.value as Priority,
        id = Date.now();

    const habito = new Habit(id, nombre, prioridad, descripcion); 
    habitos.agregar(habito);
    renderizarHabitos();
    formulario.reset();
});

contenedorHabitos.addEventListener("click", (event)=> {
    const elemento = event.target as HTMLElement;

    if(elemento.classList.contains("tarjeta-habito__boton--completar")){
        const id = Number(elemento.dataset.id);
        const habito = habitos.obtenerPorId(id);
        if(habito){
            habito.incrementarRacha();
            habitos.actualizar(id, habito);
            
        }

    } else if (elemento.classList.contains("tarjeta-habito__boton--eliminar")){
        const id = Number(elemento.dataset.id);
        habitos.eliminar(id);
    } 
    renderizarHabitos();
});

renderizarHabitos();