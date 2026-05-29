const User = require("../models/User");
const bcrypt = require("bcrypt");

const registrar = async(request, response) => {
    try {
        const nombre = request.body.nombre;
        const email = request.body.email;
        const password = request.body.password;

        let user = await User.findOne({ email: email });
        if(user) return response.status(400).json({ msg: `El usuario ${ email } ya existe en la base de datos` });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User ({
            nombre: nombre,
            email: email,
            password: hashedPassword
        });

        await user.save();

        return response.status(201).json({
            msg: "El usuario se ha registrado correctamente" 
        });
    } catch(error) {

        return response.status(500).json({ error
            : error.message });
    }

};

const login = async(request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });
        if(!user) return response.status(400).json({ msg: "El usuario no existe en la base de datos" });
    
        const passwordsCoinciden = await bcrypt.compare(password, user.password);
        if(!passwordsCoinciden) return response.status(400).json({ msg: "Contraseña incorrecta" });

        

        response.json({
            msg: "Iniciaste sesión correctamente!!"
        });

    } catch(error) {
        
        return response.status(500).json({ error: error.message });
    }
};


module.exports = {
    registrar,
    login
};





