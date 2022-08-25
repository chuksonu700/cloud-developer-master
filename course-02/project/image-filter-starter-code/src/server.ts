import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles,validUrl} from './util/util';

import { get } from 'http';



(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  // app.get('/filteredimage?image_url={{URL}}',async (req,res)=>{
  app.get('/filteredimage',async (req,res)=>{
    // let url:string = req.query.image_url.slice(0, -2).substring(2);
    let url:string = req.query.image_url;
    //get validated url
    let goodUrl= await validUrl(url);
    if(!goodUrl){
      res.status(400).send("invalid image url");
    } else{
      let saved_image = await filterImageFromURL(url);
      res.sendFile(saved_image,async (err) => {
            if (err) {
              console.log(err);
              res.status(501).send("internal Server error")
            } else {
              deleteLocalFiles([saved_image]);
            }
      })
    }
    
  })
  
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();