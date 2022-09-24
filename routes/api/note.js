const router = require("express").Router();

const fs = require("fs");
//const { resourceLimits } = require("worker_threads");
//const { route } = require(".");

router.get("/", async (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if(err){
            res.json(err);
        } else {
            const notes = JSON.parse(data)
            res.json(notes);
        }
    })
});

router.get("/:note", async (req,res) => {

    fs.readFile("./db/db.json", "utf8",(err, data) => {
        if(err){
            res.json(err);
        }else{
            const chosen = req.params.notes;
            const notes = JSON.parse(data)
            for (var i = 0; i < notes.length; i++) {
                if (chosen === notes[i].routeName) {
                    return res.json(notes[i]);
                }
            }
            return res.json(false);
        }
    })
})

router.post("/", async (req, res) => {

    fs.readFile("./db/db.json", "ust8",(err, data) => {
        if(err){
            res.json(err);
        } else {
            const newnotes = res.body;
            newnotes.routeName = newnotes.name.replace(/\s+/g, "").toLowerCase();

            const notes = JSON.parse(data)
            notes.push(newnotes);

            fs.writeFile("./db/db.json", JSON.stringify(notes, null, "\t"), (err) => {
                if(err){
                    res.json(err)
                } else{
                    res.json(notes);
                }
            })
        }
    })
})