import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDB } from './DB/MongoDB.js'
const app = express();

// getting controllers from controller server
import { registerUser , loginUser , logoutUser , checkAuth } from './controller/auth/userAuthcontroller.js'
import { sessionSaveDraft , publishSession , deleteSessions , getAllSession , getMySession , getOneSession } from './controller/session/sessionController.js'
import { validationSchema } from './middleware/authParseValidation.js'
import { registerSchema , loginSchema } from './Validation/validation.js'
import { checkToken } from './middleware/verifyToken.js'

// configuration
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config();

// Database connection
connectDB(process.env.DB_URL);


// routes
// Authentication
app.route("/v1/register").post(validationSchema(registerSchema) , registerUser)
app.route("/v1/login").post(validationSchema(loginSchema) , loginUser)
app.route("/v1/logout").get(logoutUser)
app.route("/v1/check-auth").get(checkAuth)

// Session routes
app.route("/v1/my-sessions/save-draft").post(checkToken , sessionSaveDraft);
app.route("/v1/my-sessions/publish").post(checkToken , publishSession)
app.route("/v1/sessions").get(checkToken , getAllSession)
app.route("/v1/my-sessions").get(checkToken , getMySession)
app.route("/v1/my-sessions/:id").get(checkToken , getOneSession)
app.route("/v1/sessions/:id").delete(checkToken , deleteSessions)


const port = process.env.PORT || 8000;
app.listen(port , () => console.log(`Server is running on http://localhost:${port}`))