# Coding Challenge: Soporte TechCorp

¡Hola! Gracias por aplicar. Para esta prueba técnica, queremos simular un escenario real de nuestro día a día. No hay requerimientos abstractos, sino un problema real de soporte que debes resolver.

Se evaluará tu capacidad para:
- Entender código existente (Node.js, React/Next.js, Tailwind).
- Utilizar herramientas de IA (Claude, Cursor, Gemini, etc.) para acelerar tu diagnóstico y resolución.
- Priorizar tareas críticas bajo presión.
- Mantener el orden y las buenas prácticas al corregir bugs.

## El Contexto

Acabas de iniciar tu día y recibes el siguiente mensaje por Slack de José (Project Manager):

> **De:** José
> **Para:** Equipo de Soporte
> 
> "Hola chicos, buenos días. Les paso contexto de unos inconvenientes urgentes que tenemos en la plataforma de TechCorp. Austin (del cliente) me indica que no puede ingresar a resolver los tickets desde su celular, el botón de 'Resolver' simplemente no le hace nada. 
>
> Además, al parecer están teniendo que recargar toda la página para ver cuando un ticket cambia de estado. Es un tema urgente porque las personas de soporte de ellos no pueden gestionar los casos marcados como 'Urgente', dicen que el sistema se queda cargando y nunca termina. Ya estoy creando los tickets en Jira.
> 
> Y por último, y esto es lo más crítico: me acaban de confirmar que un usuario pudo ver los tickets de OTRA empresa. Necesitamos revisar qué está interfiriendo ahí con la base de datos o el servicio, no podemos tener esa fuga de datos.
>
> Me confirman cuando lo tengan listo para coordinar pruebas finales con ellos. Mil gracias."

## Tu Misión

1. Clona este repositorio e instala las dependencias (`npm install`).
2. Levanta la base de datos local poblada de prueba (`npm run db:setup`) y el servidor (`npm run dev`).
3. Identifica y resuelve los 4 problemas mencionados por José en su mensaje.
4. Sube tu código a un repositorio público (GitHub/GitLab) y envíanos el enlace.

## Solución técnica (resumen)

Implementé correcciones enfocadas en asegurar consistencia de UI, evitar bloqueos en la API y prevenir fuga de datos entre compañías.

### 1) Botón "Resolver" no funciona en móvil

El contenido quedaba debajo del footer fijo en pantallas pequeñas, por lo que el último ticket y su botón podían quedar tapados. Agregué padding inferior al contenedor principal para que el área clickeable no quede bloqueada.

### 2) Cambios de estado no se reflejan sin recargar

El estado de React se estaba mutando en sitio (modificando el arreglo original). Reemplacé esa actualización por un update inmutable (`map`) para que React detecte el cambio y re-renderice inmediatamente.

### 3) Tickets "Urgente" se quedan cargando al resolver

En el handler `PATCH` se esperaba una promesa que nunca resolvía al simular el envío de una notificación. Hice que la promesa resuelva (simulando IO con un `setTimeout`) y mantuve la actualización del ticket.

### 4) Fuga de datos: un usuario ve tickets de otra empresa

El endpoint `GET /api/tickets` traía todos los tickets sin filtrar. Apliqué un filtro por `companyId` (empresa actual simulada) y reforcé el `PATCH` para rechazar actualizaciones sobre tickets de otra compañía.

## Notas de entorno (Prisma)

Este proyecto usa SQLite. Para ejecutar Prisma localmente, define `DATABASE_URL` en un archivo `.env`.

Ejemplo:

`DATABASE_URL="file:./dev.db"`

**Nota:** Tienes total libertad de usar herramientas de IA para apoyarte. Lo que nos importa es cómo analizas el problema, cómo guías a la IA y la calidad de la solución final. ¡Éxitos!
