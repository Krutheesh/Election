import express from "express";
import cors from 'cors';
import rout from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cors(
{
  credentials : true

}
));

app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }));


app.use("/api", rout);


export default app