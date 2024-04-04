import  express  from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import userRoute from "./routes/userRoute.js";
import userDetail from "./routes/userDetailRoute.js"
import storyRoute from "./routes/storyRoute.js"
import bodyParser from "body-parser";
import { mangroves } from "./controller/userController.js";

const app = express()
dotenv.config()
app.use(cors({
	origin: '*',
	credentials: true,          

}))

app.use(express.json())
app.use('/auth', userRoute)
app.get("/mangroves", mangroves)
app.use('/user', userDetail)
app.use('/userstory', storyRoute)
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

const Port = process.env.PORT || 3001

app.get('/',(req,res)=>{
	res.send('Server Is Working')

})


app.listen(Port, ()=>{
	console.log(`Server is Running at port ${Port}` );
})

