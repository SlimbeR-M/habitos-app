# Hábitos App
Aplicación web para gestionar hábitos diarios y tareas con fecha límite. Permite marcar hábitos como completados llevando un conteo de racha, y crear tareas puntuales con fecha y hora de vencimiento.

## Funcionalidades
- Crear, completar y eliminar hábitos y tareas
- Racha de hábitos que se reinicia si se rompe la cadena de días
- Aviso cuando una tarea vence sin completarse
- No permite seleccionar fechas/horas pasadas al crear una tarea
- Ordenamiento: hábitos por prioridad, tareas por cercanía a su vencimiento
- Los datos persisten en el navegador (localStorage)

## Tecnologías
- TypeScript + Vite (sin frameworks)
- CSS con metodología BEM
- HTML
- pnpm

## Arquitectura
| Carpeta | Contenido |
|---|---|
| `src/models` | Clase abstracta `Task`, de la que heredan `Habit` y `OneTimeTask`; enums e interfaces |
| `src/services` | `Repository<T>` genérico con CRUD, y `StorageService` (Singleton) para persistencia |
| `src/main.ts` | Manejo del DOM con delegación de eventos |

## Cómo correrlo
\`\`\`bash
git clone https://github.com/SlimbeR-M/habitos-app.git
cd habitos-app
pnpm install
pnpm run dev
\`\`\`