# xacademy-challenge-fifa

Este proyecto consta de un backend en Node.js (Express + Sequelize) y un frontend en Angular 19.

## 🐳 Instrucciones para ejecutar el proyecto con Docker

#### 1. Clonar el repositorio y posicionarse en la raíz

```bash
git clone https://github.com/ivanfc7/xacademy-challenge-fifa.git
cd xacademy-challenge-fifa
```

#### 2. Levantar todo con: 
```bash
docker compose up --build
```

## Instrucciones para correr el sistema en local

## Requisitos Previos en local
- Node.js (versión 22.12.0)
- MySQL con phpMyAdmin e importar la BD que esta en docker/bd/init.sql

### Instrucciones para el Backend
1. Navega a la carpeta del backend: `cd fifa-backend`
2. Instala las dependencias: `npm install`
3. El archivo `.env` contiene las credenciales para la base de datos. 
4. Descomentar el primer bloque y comentar el segundo bloque de variables en el `.env`
5. Correr el comando `node src/app.js`

### Instrucciones para el Frontend
1. Navega a la carpeta del frontend: `cd fifa-frontend`
2. Instala las dependencias: `npm install`
3. Levanta el servidor de desarrollo: `ng serve`
4. Abre el navegador en `http://localhost:4200`

### Instrucciones para ver la documentacion de API 
1. Luego de levantar el servidor backend ingresar a la url `http://localhost:8080/api-docs`

### Credenciales para el login
- email: admin@gmail.com
- password: abc789 

## Decisiones tecnicas
- El programa se desarrollo en windows 10.
- No se pudo probar Docker debido a los recursos de la computadora (4 GB de RAM) Sin embargo se realizo los archivos de configuracion de docker
- Se trabajo con una parte de la base de datos `fifa_male_players.sql`. No se exporto todo debido a que phpMyAdmin lo restringia por el tamaño en MB.
- La documentacion de las APIs se realizo utilizando `swagger.js`
  
## Historial de commits
```bash
λ git log --oneline
c300225 (HEAD -> master, origin/master) Implementacion de detalles faltantes
e528a12 Implementacion de swagger.js
6c5688d Funcion cerrar sesion y otros detalles
20ff537 Terminando la funcion editar jugados en el frontend
c957360 Crear un nuevo jugador
8d0b27d Implementando chart.js
b029c81 Implementando estilos en login y tabla de jugadores
6cd7d8e Implementando login en backend y frontend
8775233 Primera estructura del frontend angular
02039bb Endpoint del backend user y player
fb14153 Agregando README
42d8cbb Iniciando proyecto
```

## Decisiones Funcionales
- Se opto por un diseño minimalista
- Se utilizaron interceptors y guards para manejar la autenticacion en el frontend

