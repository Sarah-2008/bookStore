import express from "express"
import User from "../models/User.js";

const router = express.Router();

router.get("/register", async (req, res) => {
    try {
        const {username, email, password} = req.body

        if(!username || !email || !password){
            return res.status(400).json({ message : "TODOS OS CAMPOS PRECISAM ESTAR PREENCHIDOS" })
        }

        if(password.lenght < 6){
            return res.status(400).json({ message: "A SENHA DEVERÁ CONTER MAIS DE SEIS CARACTERES" })
        }

        if(password.lenght < 3){
            return res.status(400).json({ message: "A SENHA DEVERÁ CONTER MAIS DE TRÊS CARACTERES" })
        }

        // checar se existe
        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({ message : "Email já cadastrado!"}) 
        }

        const existingUsername = await User.findOne({username})
        if(existingUsername){
            return res.status(400).json({ message : "Nome já cadastrado!"}) 
        }

        // coletar avatar aleatório
        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

        const user = new User({
            email,
            username,
            password,
            profileImage: "",
        })

        await user.save();
    }catch (error){

    }
})

router.get("/login", async (req, res) => {
    res.send("login");
    // res de resposta
})

export default router