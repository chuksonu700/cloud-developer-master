import express, { Router, Request,Response, application  } from "express";
import bodyParser from 'body-parser';

(
   async () => {
    // let cars:Cars[]= cars_list;

    // Create an Express application
    const app = express();
    //default port for listen
    const port =8078

    //Our Middleware
    app.use(bodyParser.json());

    //Root URI call
    app.get("/",(req:Request,res:Response)=>{
        res.status(200).send("Welcome to the cloud");
    })
    app.listen(port,()=>{
        console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
    })
}
   
)