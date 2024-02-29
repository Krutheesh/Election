import express from "express";
import cors from 'cors';
import rout from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
const app = express();

app.use(express.json());
app.use(cors(
{
  credentials : true

}
));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


app.use("/api", rout);


export default app