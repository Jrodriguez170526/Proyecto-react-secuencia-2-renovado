import React, { useState, useEffect } from 'react';

const FormularioCliente = () => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [Clientes, setClientes] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [modoEdicion, setModoEdicion] = useState(false);
    const [ClienteEditar, setClienteEditar] = useState(null);

    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = () => {
        fetch('http://localhost/backend/listarCliente.php')
            .then(response => response.json())
            .then(data => {
                setClientes(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const Cliente = {
            nombre,
            telefono,
            direccion,
            correo,
        };

        const url = modoEdicion ? 'http://localhost/backend/modificarCliente.php' : 'http://localhost/backend/insertarCliente.php';

        fetch(url, {
            method: modoEdicion ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Cliente),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.message === (modoEdicion ? 'Cliente actualizado correctamente' : 'Cliente insertado correctamente')) {
                setMensaje(`Cliente ${data.id} ${modoEdicion ? 'actualizado' : 'insertado'} correctamente.`);
                cargarClientes();
                cancelarEdicion();
            } else {
                setMensaje(`Error al intentar ${modoEdicion ? 'actualizar' : 'guardar'} el Cliente.`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMensaje('Error en la conexión o servidor.');
        });
    };

    const handleEliminarCliente = (id) => {
        fetch(`http://localhost/backend/eliminarCliente.php?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Cliente eliminado correctamente') {
                setMensaje(`Cliente con ID ${id} eliminado correctamente.`);
                cargarClientes();
            } else {
                setMensaje('Error al intentar eliminar el Cliente.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMensaje('Error en la conexión o servidor.');
        });
    };

    const iniciarEdicion = (Cliente) => {
        setModoEdicion(true);
        setClienteEditar(Cliente);
        setNombre(Cliente.nombre);
        setTelefono(Cliente.telefono);
        setDireccion(Cliente.direccion);
        setCorreo(Cliente.correo);
    };

    const cancelarEdicion = () => {
        setModoEdicion(false);
        setClienteEditar(null);
        setNombre('');
        setTelefono('');
        setDireccion('');
        setCorreo('');
    };

    return (
        <div>
        <h2>Formulario de Cliente</h2>
        {modoEdicion ? (
            <form className="w3-container w3-card-4 w3-green w3-text-red w3-margin" onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="telefono">Teléfono:</label>
                <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="direccion">Dirección:</label>
                <textarea
                    id="direccion"
                    name="direccion"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="correo">Correo:</label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <button type="submit" className="w3-button w3-block w3-section w3-red w3-ripple">Guardar Cambios</button>
                <button type="button" className="w3-button w3-block w3-section w3-red w3-ripple" onClick={cancelarEdicion}>Cancelar</button>
            </form>
        ) : (
            <form className="w3-container w3-card-4 w3-green w3-text-red w3-margin" onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="telefono">Teléfono:</label>
                <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="direccion">Dirección:</label>
                <textarea
                    id="direccion"
                    name="direccion"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="correo">Correo:</label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <button type="submit" className="w3-button w3-block w3-section w3-red w3-ripple">Guardar Cliente</button>
            </form>
        )}

        {mensaje && <p>{mensaje}</p>}

        <h2>Lista de Clientes</h2>
        <table className="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
            <thead>
                <tr className="w3-red">
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {Clientes.map(Cliente => (
                    <tr key={Cliente.id}>
                        <td>{Cliente.id}</td>
                        <td>{Cliente.nombre}</td>
                        <td>{Cliente.telefono}</td>
                        <td>{Cliente.direccion}</td>
                        <td>{Cliente.correo}</td>
                        <td>
                            <button className="w3-button w3-red w3-hover-pink" onClick={() => handleEliminarCliente(Cliente.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default FormularioCliente;