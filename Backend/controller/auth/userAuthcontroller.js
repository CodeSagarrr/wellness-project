import bcrypt from 'bcrypt'
import JWT from "jsonwebtoken";
import { UserAuth } from '../../model/userAuth.js';

export const registerUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const salt = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdUser = await UserAuth({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            createdAt : Date.now()
        })
        await createdUser.save();
        res.status(200).json({ message: "success" , user : createdUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const loggedUser = await UserAuth.findOne({ email });
        if (!loggedUser) return res.status(404).json({ message: "email is incorrect" });
        const passMatch = await bcrypt.compare(password, loggedUser.password);
        if (!passMatch) {
            res.status(401).json({ message: "Password is incorrect" });
        }
        const tokenPayload = {
            id: loggedUser._id,
            firstname : loggedUser.firstname,
            lastname : loggedUser.lastname,
            email: loggedUser.email,
        };
        const token = JWT.sign(tokenPayload, process.env.JWT_SEC_KEY , { expiresIn: '2 days' });
        res.cookie("jwtToken", token, {
            httpOnly: true,
            secure: true,
        });
        res.status(200).json({
            message: "Login successful",
            user: {
                firstname: loggedUser.firstname,
                lastname: loggedUser.lastname,
                email: loggedUser.email,
            },
        });

    } catch (error) {
        console.log(error.message);
    }
}

export const logoutUser = async(req , res) => {
    const token = req.cookies.jwtToken
    try {
        if(token){
            res.clearCookie("jwtToken");
            res.status(200).json({message :  "user successfully logout"})
        }
    } catch (error) {
        console.log("error" , error.message)
    }
}

export const checkAuth = async(req , res) => {
    const token = req.cookies.jwtToken;

    if(!token) return res.status(401).json({ message : "User is not login" ,  isAuthenticated: false });

    try {
        const decode = JWT.verify(token , process.env.JWT_SEC_KEY);
        res.status(200).json({
            isAuthenticated : true,
            firstname : decode.firstname,
            lastname : decode.lastname,
            email : decode.email,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({isAuthenticated : false})
    }
}