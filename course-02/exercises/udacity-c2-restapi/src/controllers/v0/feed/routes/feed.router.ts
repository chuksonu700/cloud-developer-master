import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';
import axios from 'axios';
import {config} from '../../../../config/config';
import { filter } from 'bluebird';


const router: Router = Router();

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
    items.rows.map((item) => {
            if(item.url) {
                item.url = AWS.getGetSignedUrl(item.url);
            }
    });
    res.send(items);
});

//@TODO
//Add an endpoint to GET a specific resource by Primary Key
router.get('/:id',async (req:Request, res:Response) => {
        const id = req.params.id;
        // const items = await FeedItem.findAll({
        //     where:{
        //         id:id,
        //     }
        // });
        // items.map((item)=>{
        //     if(item.url){
        //         item.url = AWS.getGetSignedUrl(item.url);
        //     }
        // });
        const item = await FeedItem.findByPk(id);
        item.url = AWS.getGetSignedUrl(item.url);
        res.status(200).send(item);
});

// update a specific resource
router.patch('/:id', 
    requireAuth, 
    async (req: Request, res: Response) => {
        //@TODO try it yourself
        const id = req.params.id;
        const [url, caption] = req.body;

    // check Caption is valid
    if (!caption) {
        return res.status(400).send({ message: 'Caption is required or malformed' });
    }

    // check Filename is valid
    if (!url) {
        return res.status(400).send({ message: 'File url is required' });
    }
    const item = await FeedItem.update(
        {
            caption:caption,
            url:url
        },  
        {
            where:  {
                    id:id,
           } 
        });
        res.status(200).send(item);
        // res.status(500).send("not implemented")
});


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', 
    requireAuth, 
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url});
});

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/', 
    requireAuth, 
    async (req: Request, res: Response) => {
    const caption = req.body.caption;
    const fileName = req.body.url;

    // check Caption is valid
    if (!caption) {
        return res.status(400).send({ message: 'Caption is required or malformed' });
    }

    // check Filename is valid
    if (!fileName) {
        return res.status(400).send({ message: 'File url is required' });
    }

    const item = await new FeedItem({
            caption: caption,
            url: fileName
    });

    const saved_item = await item.save();
    console.log(saved_item.dataValues);
    
    //filter image
    const filterUrl:string = config.prod.filterImage+"image_url="+fileName;
    console.log(filterUrl)
    saved_item.url =filterUrl;
    // var configas = {
    //     method: 'get',
    //     url: filterUrl,
    // }
    // axios(configas)
    //     .then(function (response) {
    //     console.log(response.data);
    //     // console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
    // const filterImage = await axios.get(filterUrl);
    // console.log(filterImage);
    saved_item.url = AWS.getGetSignedUrl(saved_item.url);
    res.status(201).send(saved_item);
});

export const FeedRouter: Router = router;