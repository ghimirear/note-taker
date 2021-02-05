// bringing in all the required file and packages.
const noteData = require('../db/db.json');
const fs = require('fs');
const shortid = require('shortid');
const path = require ('path');
const databaseDir = path.resolve(__dirname, "../db/db.json");
// this ia an route so we are exporting everything from here.
module.exports = (app) => {
// on request we are sending json data if we have any in the db.json file.
app.get('/api/notes',  (req, res) => res.json(noteData));
// This is to save the note ie post request 
app.post('/api/notes', (req, res) => {
// Making an object to store incomming data and giving them unique id with the help of shortid package.
  let note = {
     title:  req.body.title,
     text:  req.body.text,
     id:  shortid.generate()
    }
  noteData.push(note);
//  reading the database first
  fs.readFile(databaseDir, 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {  
        // parsing the imported data via fs.read
      obj = JSON.parse(data);
      obj.push(note); 
      // rewriting the file with new obj
      fs.writeFile(databaseDir, JSON.stringify(obj, null, 4 ),'utf8', (err)=> {
        if (err) {
          throw err
        }
        console.log("your note is saved")
      });
  }});
  // since the data is updated so again reading the file and sending the response as updateddata to the user.
   updateddata = fs.readFile(databaseDir, 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } 
  })
  res.json(updateddata);
});
// pfunction to delete the file and update the database with new data.
  app.delete(`/api/notes/:id`, function(req, res) {
    // storing the requested id to delete the speific data
    let requestedId = req.params.id;
    // creating newObj object to hold the data that remain after deletion.
    let newObj = [];
    // reading the db.json file to edit it.
     fs.readFile(databaseDir, 'utf8', function (err, data) {
      if(err){console.log(err);}
      // parsing the data to an array
      parsedata = JSON.parse(data);
      // for loop to filter the data that did not match the requested id.
      for (let i = 0; i < parsedata.length; i++) {
        if(parsedata[i].id != requestedId){
          // pushing the object to newobj
         newObj.push(parsedata[i]);
        };
      } 
      // Rewriting thr db.json file with an updated newobj  
     fs.writeFile(databaseDir, JSON.stringify(newObj, null, 4), function (err){ 
      if(err){return console.log(err);}         
        }); 
    });
    // sending the reaponse as an json file to the server. 
    // ( This is the work tht I did so far but, data to be refreshed after deletion you need to double click the same deleting object)
    // if there is better way then please mention in the comment thank you.
    res.json(newObj);
    })
}
