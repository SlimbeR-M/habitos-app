import './style.css'
import { StorageService } from './services/StorageService'
import { Repository } from './services/Repository'
import { Habit } from './models/Habit'
import { OneTimeTask } from './models/OneTimeTask';
import { Priority } from './models/Priority'
import { Status } from './models/Status';

const storage = StorageService.obtenerInstancia();

const habitos = new Repository<Habit>(storage,"habitos");
const tareas = new Repository<OneTimeTask>(storage,"tareas");


