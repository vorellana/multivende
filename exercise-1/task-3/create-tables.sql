-- Base de Datos: PostreSQL

CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    dni VARCHAR(20),
    direccion VARCHAR(255),
    correo VARCHAR(100),
    fecha_nacimiento DATE
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    codigo VARCHAR(20),
    precio_unitario DECIMAL(10, 2)
);

CREATE TABLE compras (
    id_compra SERIAL PRIMARY KEY,
    id_cliente INT,
    fecha_compra DATE,
    monto_total DECIMAL(10, 2),
    FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)
);

CREATE TABLE compras_productos (
    id_compra INT,
    id_producto INT,
    cantidad INT,
    monto_por_producto DECIMAL(10, 2),
    PRIMARY KEY (id_compra, id_producto),
    FOREIGN KEY (id_compra) REFERENCES compras (id_compra),
    FOREIGN KEY (id_producto) REFERENCES productos (id_producto)
);

CREATE TABLE despachos (
    id_despacho SERIAL PRIMARY KEY,
    id_compra INT,
    fecha_programada DATE,
    monto_despacho DECIMAL(10, 2),
    FOREIGN KEY (id_compra) REFERENCES compras (id_compra)
);

CREATE TABLE despachos_productos (
    id_despacho INT,
    id_producto INT,
    cantidad_despachada INT,
    PRIMARY KEY (id_despacho, id_producto),
    FOREIGN KEY (id_despacho) REFERENCES despachos (id_despacho),
    FOREIGN KEY (id_producto) REFERENCES productos (id_producto)
);
