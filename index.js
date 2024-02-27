import  express  from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import userRoute from "./routes/userRoute.js";
import bodyParser from "body-parser";

const app = express()
dotenv.config()
app.use(cors({
	origin: '*',
	credentials: true,          

}))

app.use(express.json())
app.use('/auth', userRoute)
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

const Port = process.env.PORT || 3001

app.get('/',(req,res)=>{
	res.send('Server Is Working')

})


app.listen(Port, ()=>{
	console.log(`Server is Running at port ${Port}` );
})

