const express = require('express')
const bodyParser = require('body-parser');
const JSONdb = require('simple-json-db');
const db = new JSONdb('./db.json',{asyncWrite:true,syncOnWrite:true});
const app = express()
const port = 3900
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();
router.get('/getAll', async (req, res) => {
    try {
        let $res = await db.JSON();   
        res.send({status : 200 , message : 'Fetched successfully ' , data : $res}) 
    } catch (error) {
        res.send({status : 500 , message : 'Failed to get data ' , error : error}) 
    }
})
router.get('/get/:Id', async (req, res) => {
    try {
        let $res = await db.get(req.params.Id);   
        res.send({status : 200 , message : 'Fetched successfully ' , data : $res}) 
    } catch (error) {
        res.send({status : 500 , message : 'Failed to get data ' , error : error}) 
    }
})
router.delete('/deleteAll',async (req, res) => {
    try { 
        let $res = await db.JSON({ });
        res.send({status : 200 , message : 'Deleted successfully ' , data : $res}) 
    } catch (error) {
        res.send({status : 500 , message : 'Failed to delete' , error : error}) 
    }
  })
  router.delete('/delete/:Id',async (req, res) => {
    try {
        let $res = await db.delete(req.params.Id);   
        res.send({status : 200 , message : 'Deleted successfully '}) 
    } catch (error) {
        res.send({status : 500 , message : 'Failed to delete' , error : error}) 
    }
  })
router.post('/add', async (req, res) => {
    try {
        console.log('Req body', req.body);
        let $res = await db.set(req.body.key,req.body.value); 
        console.log($res);  
        res.send({status : 200 , message : 'Added successfully ', data : $res}) 
    } catch (error) {
        res.send({status : 500 , message : 'Failed to insert' , error : error.message}) 
    }
})
app.use("/v1",router)  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})