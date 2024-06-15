create table if not exists productos(
 id integer primary key autoincrement,
    nombre varchar(30),
    categoria varchar(10),
    descripcion varchar(50),
    stock integer,
    precio float,
    
);

insert into productos(nombre, categoria, descripcion, stock, precio) values('Modelo S1','Patines', '1 par de patines con su instructivo', 15, 1999);
insert into productos(nombre, categoria, descripcion, stock, precio) values('Modelo S2','Patines', '1 par de patines con su instructivo', 24 , 2300);
insert into productos(nombre, categoria, descripcion, stock, precio) values('Modelo S3','Patines', '1 par de patines con su instructivo', 5, 3400);
insert into productos(nombre, categoria, descripcion, stock, precio) values('Modelo S4','PAtines', '1 par de patines con su instructivo', 45, 1700);
insert into productos(nombre, categoria, descripcion, stock, precio) values('Modelo S5','Patines', '1 par de patines con su instructivo', 28, 2300);
insert into productos(nombre, categoria, descripcion, stock, precio) values('Modelo S6','Patines', '1 par de patines con su instructivo', 48, 8700);

create table if not exists clientes(
    id integer primary key autoincrement,
    nombre varchar(30),
    telefono varchar(10),
    direccion varchar(30),
    correo varchar(30),
    
);

insert into clientes(nombre, telefono, direccion, correo) values('Mario','7821127543', 'calle galardon #1', 'mcas@hotmail.com');
insert into clientes(nombre, telefono, direccion, correo) values('Jose','9992345678', 'calle galardon #2', 'jlan@hotmail.com');
insert into clientes(nombre, telefono, direccion, correo) values('Leonardo','5543210987', 'calle galardon #3', 'lmtnz@hotmail.com');
insert into clientes(nombre, telefono, direccion, correo) values('Donald','5589123456', 'calle galardon #4', 'donlat@hotmail.com');
insert into clientes(nombre, telefono, direccion, correo) values('Rene','5567890123', 'calle galardon #5', 'rgarcia@hotmail.com');
insert into clientes(nombre, telefono, direccion, correo) values('Francisco','5512345678', 'calle galardon #6', 'franchoy@hotmail.com');


create table if not exists ventas(
    id integer primary key autoincrement,
    nombre varchar(30),
    categoria varchar(10),
    precio float,
    cantidad integer,
    total float,

    
);

insert into ventas(nombre, categoria, precio, cantidad, total) values('Modelo S1','Patines', 2,200.00, 2 , 4,400.00);
insert into ventas(nombre, categoria, precio, cantidad, total) values('Modelo S2','Patines', 1900.90, 1, 1900.90);
insert into ventas(nombre, categoria, precio, cantidad, total) values('Modelo S3','Patines', 1889.90, 1, 1889.90);
insert into ventas(nombre, categoria, precio, cantidad, total) values('Modelo S4','Patines', 1999.90, 1, 1999.90);
insert into ventas(nombre, categoria, precio, cantidad, total) values('Modelo S5','Patines', 1799.90, 1, 1799.90);
insert into ventas(nombre, categoria, precio, cantidad, total) values('Modelo S6','Patines', 2000.00, 3, 6000.00);