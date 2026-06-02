# xacademy-challenge-fifa

Este proyecto consta de un backend en Node.js (Express + Sequelize) y un frontend en Angular 19.

## Requisitos Previos
- Node.js (versión 22.12.0)
- MySQL con phpMyAdmin

## Instrucciones para correr el sistema 

### Instrucciones para el Backend
1. Navega a la carpeta del backend: `cd fifa-backend`
2. Instala las dependencias: `npm install`
3. El archivo `.env` contiene las credenciales para la base de datos.
4. Correr el comando `node src/app.js`

### Instrucciones para el Frontend
1. Navega a la carpeta del frontend: `cd fifa-frontend`
2. Instala las dependencias: `npm install`
3. Levanta el servidor de desarrollo: `ng serve`
4. Abre el navegador en `http://localhost:4200`

### Instrucciones para ver la documentacion de API 
1. Luego de levantar el servidor backend ingresar a la url `http://localhost:8080/api-docs`

## Decisiones tecnicas
- El programa se desarrollo en windows 10.
- No se utilizo Docker debido a los recursos de la computadora (4 GB de RAM)
- No se hizo una instalacion boot de Linux debido a cuestiones universitarias que hicieron que deba mantener windows.
- Se trabajo con una parte de la base de datos `fifa_male_players.sql`. No se exporto todo debido a que phpMyAdmin lo restringia por el tamaño en MB.
- La documentacion de las APIs se realizo utilizando `swagger.js`
  
## Historial de commits
```bash
λ git log --pretty=format:"%h %ad | %s" --date=short
6c5688d 2026-05-31 | Funcion cerrar sesion y otros detalles
20ff537 2026-05-30 | Terminando la funcion editar jugados en el frontend
c957360 2026-05-29 | Crear un nuevo jugador
8d0b27d 2026-05-28 | Implementando chart.js
b029c81 2026-05-28 | Implementando estilos en login y tabla de jugadores
6cd7d8e 2026-05-26 | Implementando login en backend y frontend
8775233 2026-05-23 | Primera estructura del frontend angular
02039bb 2026-05-23 | Endpoint del backend user y player
fb14153 2026-05-10 | Agregando README
42d8cbb 2026-05-10 | Iniciando 
```

## Decisiones Funcionales
- Se opto por un diseño minimalista
- Se utilizaron interceptors y guards para manejar la autenticacion en el frontend

