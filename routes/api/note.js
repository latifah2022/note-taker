const router = require("express").Router();
const {v4: uuid} = require('uuid');

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
            const chosen = req.params.note;
            console.log(chosen);
            const notes = JSON.parse(data)
            for (var i = 0; i < notes.length; i++) {
                if (chosen === notes[i].note_id) {
                    return res.json(notes[i]);
                }
            }
            return res.json(false);
        }
    })
})
router.post("/", async (req, res) => {

    fs.readFile("./db/db.json", "utf8",(err, data) => {
        if(err){
            res.json(err);
        } else {
            const newnotes = req.body;
            newnotes.id = uuid()
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

router.delete("/:id", (req, res) => {
    const noteId = req.params.id;
    fs.readFile("./db/db.json", "utf8",(err, json) => {
        if(err){
            res.json(err);
        } else {
        console.log(json);
        json = JSON.parse(json)
		const result = json.filter((note) => note.id !== noteId);
        fs.writeFile("./db/db.json", JSON.stringify(result, null, "\t"), (err) => {
            if(err){
                res.json(err)
            } else{
                res.json(`Item ${noteId} Deleted :wastebasket:`);
            }
        })
        }
	});
});

module.exports = router;
