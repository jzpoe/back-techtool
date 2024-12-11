const bcrypt = require('bcryptjs');
const User = require('../model/model-sesion');

// Controlador de sesión (por ahora vacío)
const sesion = async (req, res) => {
    const { username, password } = req.body;
    // Aquí agregas la lógica de inicio de sesión si lo deseas
};

// Controlador de registro de usuario
const registrar = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si los datos están presentes
        if (!username || !password) {
            return res.status(400).json({ message: 'El nombre de usuario y la contraseña son obligatorios.' });
        }

        // Cifrado de la contraseña
        const cifrado = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const usuario = new User({ username, password: cifrado });
        await usuario.save(); // Guardar el usuario en la base de datos

        // Responder con éxito
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        // Mostrar el error completo para depuración
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
};

module.exports = {
    registrar,
    sesion
};