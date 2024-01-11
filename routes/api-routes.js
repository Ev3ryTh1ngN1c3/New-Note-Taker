const router = require('express').Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Define a GET request to the /api/notes endpoint:
router.get("/api/notes", async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync("db/db.json"));
    res.json(dbJson);
});

// This route reads the contents of the db.json file & sends it as a JSON response.
// Define a POST request to the /api/notes endpoint:
router.post("/api/notes", (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json"));
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJson.push(newFeedback);
    fs.writeFileSync("db/db.json", JSON.stringify(dbJson));
    res.json(dbJson);
});

// This route reads the contents of the db.json file, 
// creates a new note object with a unique ID generated using uuidv4(), 
// adds the new note to the array, and then writes the updated array back to the db.json file. 
// Finally, it sends the updated array as a JSON response.
// Define a DELETE request to the /api/notes/:id endpoint:

router.delete("/api/notes/:id", (req, res) => {
    let data = fs.readFileSync("db/db.json", "utf8");
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
    res.json("Note deleted.");
});

// This route reads the contents of the db.json file, 
// filters out the note with the specified ID, 
// writes the updated array back to the db.json file, 
// and sends a response indicating that the note has been deleted.

// Export the router:

module.exports = router;

// This allows the api-routes.js file to be imported & used in other files.