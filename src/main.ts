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
    slctPrioridad = document.querySelector("#prioridad") as HTMLSelectElement;

formulario.addEventListener("submit", (event)=> {
    event.preventDefault();

    const nombre = inpNombre.value,
        descripcion = txtDescripcion.value,
        prioridad = slctPrioridad.value as Priority,
        id = Date.now();

    const habito = new Habit(id, nombre, prioridad, descripcion); 
    habitos.agregar(habito);
    formulario.reset();
});

