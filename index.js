const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
const bodyParser = require("body-parser")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null, uniqueName)
    }
}

)
const upload = multer({ storage, limits: { fileSize: 1000000 * 3 } })


const staticPath = path.join(__dirname, "/public")
const viewPath = path.join(__dirname, "/templates/views")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", hbs)
app.set("views", viewPath)
console.log(staticPath, viewPath)
app.use(express.static(staticPath))

app.get("/form", async (req, res) => {
    console.log(req.body)
    res.render("form.hbs")

})
app.post("/form", upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: "image3", maxCount: 1 }]), async (req, res) => {

    if (req.files){
        console.log(req.files)
    }
    console.log(req.body)
res.send("file uploaded")

    }

)



app.listen(3000, () => {
    console.log("listening on 3000")
})