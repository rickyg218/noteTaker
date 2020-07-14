const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
// const router =require("router");
const readfileAsync = util.promisify(fs.readFile);
let dbNotes = require("./db/db.json");
// const appendFileAsync = util.promisify(fs.appendFile);



const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let currentNotes = [];



app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

app.get("/api/notes", async function (req, res) {
    try{
        const notesRaw = await readfileAsync(json,"utf8");
       notesRaw ? currentNotes.push(...JSON.parse(notesRaw)):[] 
     } catch(e){
         console.log("wrong",e)
     }
    console.log(res);
    return res.json(dbNotes);
});

app.post('/api/notes', function (req, res) {
    const newNotes = req.body;
    if (dbNotes === '') {
        newNotes.id = 1
    }
    else {
        newNotes.id = dbNotes.length
    }
    dbNotes.push(newNotes);
    let stringNotes = JSON.stringify(dbNotes);
    fs.writeFile("db/db.json", stringNotes, function (err) {
        if (err) {
            throw err;
        }
        console.log("notes sent");
        return newNotes
    });
    res.json(newNotes);
});

app.delete('/api/notes/:id', function (req, res) {
    const newNotes = req.params.id;
    console.log(newNotes);
    dbNotes.splice(newNotes, 1);
    let stringNotes = JSON.stringify(dbNotes);
    fs.writeFile("db/db.json", stringNotes, function (err) {
        if (err) {
            throw err;
        }
        console.log("notes removed");
        return newNotes
    });
    // if (dbNotes === undefined || !dbNotes.length === 0) {
    //     for (let i = 0; i < dbNotes.length; i++) {
    //         notes[i].id = i;
    //     }
    // }
});




app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    console.log("http://localhost:" + PORT);
});





// router.delete('/api/notes', (req, res) => {
//     notes.remove({
//         id: req.params.notes
//     }), function (err, user) {
//         if (err) {
//             return res.send(err);
//         }

//         res.db.json({ message: 'Deleted' })
//     }}) 