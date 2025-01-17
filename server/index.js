import express from "express"
import multer from "multer";
import db from "./db/connection.js"
import cors from "cors"

const app=express();


const port=3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname}`)
    }
})
  
const upload = multer({ storage: storage })

app.use(express.json())
app.use(cors()) 
app.use('/uploads', express.static('uploads'))

app.get("/", (req, res)=>{
    res.json({"message":"Hello World!"});
})

app.get("/blog/:cat", async (req, res)=>{
    
    const result=await db.query(
        req.params.cat!='all' ? `SELECT * FROM blogs where category = '${req.params.cat}' ORDER by id DESC` : 'SELECT * FROM blogs ORDER by id DESC'
    );
    res.json({"data": result.rows});
})

app.get("/blog/id/:id", async (req, res)=>{
    const result=await db.query(`SELECT * FROM blogs WHERE id = ${req.params.id} ORDER by id DESC`);
    res.json({"data": result.rows});
})

app.post("/blog", async (req, res)=>{
    const result=await db.query('INSERT INTO blogs (title, image, post, category) VALUES($1, $2, $3, $4)', [req.body.title, req.body.image, req.body.post, req.body.category]);
    res.json({"message": "Added a new blog", "desc": result.rowCount});
})

app.post('/blogimage', upload.single('file'), function (req, res, next) {
    res.json(req.file)
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})