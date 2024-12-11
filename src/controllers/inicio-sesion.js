const bcrypt = require('bcryptjs');
const User = require('../model/model-sesion');

// Controlador de sesión (por ahora vacío)
const sesion = async (req, res) => {
    const { username, password } = req.body;
    console.log('Datos recibidos:', { username, password });


    try {
        // Buscar al usuario en la base de datos
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña es correcta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Guardar información del usuario en la sesión
        //req.session.userId = user._id;
        //req.session.username = user.username;

        res.json({ message: 'Inicio de sesión exitoso', username: user.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
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