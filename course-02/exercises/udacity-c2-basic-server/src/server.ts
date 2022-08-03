import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Car, cars as cars_list } from './cars';
import { DESTRUCTION } from 'dns';

(async () => {
  let cars:Car[]  = cars_list;

  //Create an express application
  const app = express(); 
  //default port to listen
  const port = 8082; 
  
  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json()); 

  // Root URI call
  app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  // Get a greeting to a specific person 
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get( "/persons/:name", 
    ( req: Request, res: Response ) => {
      let { name } = req.params;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get( "/persons/", ( req: Request, res: Response ) => {
    let { name } = req.query;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as 
  // an application/json body to {{host}}/persons
  app.post( "/persons", 
    async ( req: Request, res: Response ) => {

      const { name } = req.body;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  // @TODO Add an endpoint to GET a list of cars
  // it should be filterable by make with a query paramater
  app.get("/cars",
    async (req:Request,res:Response) => {
      const {make}= req.query;
      // getting all cars 
      let car_list = cars;

      //return all cars from a given Make e.g honda, toyota etc.
      if(make){
        //filter car to meet criteria
        car_list = cars.filter((car)=>car.make===make)
        return res.status(400).send(car_list)
      }
      //return all cars if no make is given
      if (!make) {
      return res.status(200).send(car_list);  
      }

  });

  // @TODO Add an endpoint to get a specific car
  // it should require id
  // it should fail gracefully if no matching car is found

  app.get("/cars/:id",
    async (req:Request,res:Response) => {
      // DESTRUCTION id
        const {id} = req.params;
      
      // setting id to Type Number
        let newId = Number(id)
      
      //getting specific car details  
        let car = cars.filter((car)=>car.id===newId);
      //return error if missing  
      if (car.length < 1  ) {
          return res.status(404)
                .send(`id not found`);
        }
      // return car
      return res.status(200).send(car);
  })

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
  app.post("/cars",
      async (req:Request,res:Response) => {
        //destructuring varriables
        const {id, type,model,cost,make} = req.body;
        
        //return error
        if (!id || !type || !model || !cost ||!make) {
          res.status(400).send("it should require id, type, model, and cost")
          }
        //creating new car
        let newCar:Car = {
          make: make, type: type, model: model, cost: cost, id: id 
        }
        //saving
        cars.push(newCar);

        // response
        return res.status(200).send(cars);
  })
  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
