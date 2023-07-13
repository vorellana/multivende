
# Reto Técnico - Multivende
Desarrollado principalmente con **Node.js, React, RabbitMQ, Sockets, PostgreSQL** y con despliegue en **Docker**.
<Imagen total>
  ![alt text](https://github.com/vorellana/multivende/blob/main/images/dashboard.png?raw=true)

## Instalación y uso

**Es un requisito tener instalado docker-compose.** Si no lo tiene puede ver el siguiente enlace para su instalación.
https://docs.docker.com/compose/install/
```sh
# descargamos el proyecto
git clone https://github.com/vorellana/multivende.git 

# entramos a la carpeta del proyecto y luego a exercise-2
cd multivende
cd exercise-2

# aquí encontraremos el archivo <docker-compose.yml> y ahora iniciamos la "instalación del proyecto"
docker-compose up -d 
```
y ahora ya podemos desde el Portal de Multivende en la sección "Autorizar acceso a tu cuenta... para una aplicación"
y luego redirigirá a localhost:3000 en donde estará funcionando la aplicación web de React.


## Tecnologías de desarrollo
Para el presente proyecto se utilizarón las siguientes tecnologías como librerías, frameworks, servicios en la nube, herramientas de despliegue entre otros.

### Backend
*  **Node.js:** Entorno en tiempo de ejecución para desarrollar el Backend en Javascript.
* **Express:** Infraestructura web rápida, minimalista y flexible para Node.js. 
* **Rascal:** Libería con mejores funcionalidades sobre amqplib. 
* **Socket.IO:** Comunicación bidireccional y de baja latencia para todas las plataformas. 
* **Bottleneck:**Programador de tareas y limitador de velocidad. Usado para los reintentos en un determinado tiempo. 
* **Sequelize:** ORM para PostgreSQL, Oracle, MySQL, MariaDB, SQLite and SQL Server.
* **crypto-js:** Librería para operaciones de encriptación.
* **Nodemon:** Para que se reinicie el servidor automáticamente después de cada cambio.

### Frontend
*  **React:** Biblioteca para crear aplicaciones SPA.
* **Material UI:** Librería CSS para facilitar el uso de estilos.

### Database
*  **PostgreSQL:** Base de datos del proyecto.

### Messaging Systems
*  **RabbitMQ:** Sistema de mensajería de código abierto que implementa el protocolo de Protocolo Avanzado de Cola de Mensajes (AMQP). Se utiliza para facilitar la comunicación entre las aplicaciones al enviar y recibir datos entre ellas.

### Deployment
*  **Docker:** Tecnología de contenedores que posibilita la creación y el uso de contenedores.
*  **Docker Compose:** Herramienta que permite simplificar el uso de Docker y gestionar varios contenedores.
*  **GitHub**: Servicio de repositorio de código fuente en donde se encuentran almacenados todo el código del proyecto.

## Características
* La aplicación web consta de 2 componentes: pantalla principal y tabla de productos.
* La aplicación hace uso de Sockets para la comunicación en tiempo real con un servidor Express.
* Implementación de Pruebas unitarias (para el ejercicio 1)
* Uso de sistema de colas RabbitMQ
* Uso de Sockets para la comunicación en tiempo real entre el cliente (React) y el servidor (Express)
* Encriptación y desincriptación de Tokens
* Protección de rutas por medio Middlewares
* Implementación hacia Base de datos para Tokens/acceso y Log de errores
* Manejo de solicitudes por reintentos
* Limitación del número de solicitudes en un determinado tiempo.
* Énfasis en el uso de Programación funcional.
* Estructura por capas (controllers, services, repositories).

# Gracias!