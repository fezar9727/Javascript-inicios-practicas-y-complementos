const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async(request, response) => {
    try {
        const nombre = request.body.nombre;
        const email = request.body.email;
        const password = request.body.password;

        let user = await User.findOne({ email: email });
        if(user) return response.status(400).json({ msg: `El usuario ${ email } ya existe en la base de datos` });

        await User.save();

    } catch(error) {
        response.status(500).json({ error
            : error.message });
    }

};
