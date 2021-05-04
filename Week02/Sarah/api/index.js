// Entry Point of the API Server 
  
const express = require('express');
const app = express();
const db = require('./route');
  
/* Creates an Express application. 
   The express() function is a top-level 
   function exported by the express module.
*/
  
  
/* To handle the HTTP Methods Body Parser 
   is used, Generally used to extract the 
   entire body portion of an incoming 
   request stream and exposes it on req.body 
*/

app.use(express.json())
  
  

  
app.get('/getdata', db.getData)
app.get('/getdata/:id', db.getDataID)
app.post('/adddata', db.createData)
app.put('/editdata/:id', db.editData)
app.delete('/deletedata/:id', db.deleteData)
  
// Require the Routes API  
// Create a Server and run it on the port 3000
const server = app.listen(3000, function () {
    let host = server.address().address
    let port = server.address().port
    // Starting the Server at the port 3000
})