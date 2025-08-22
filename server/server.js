const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');


const app = express();
const port = 3000;

const sslOptions = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};

app.use(express.json()); // per leggere il body JSON

app.get('/files/:filename', (req, res) =>{
    const filename = req.params.filename;
    console.log("richiesto file: ", filename);
    const path = `./files/${filename}`;
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) return res.status(404).send("File non trovato");
        res.send(data);
    });
});

app.post('/downloads', (req, res) =>{
  const  {filename, content} = req.body;

  if(!filename || !content) return res.status(400).send("dati mancanti");
  
  const path = "./files/" + filename;
  fs.writeFile(path, content, 'utf-8', (err) => {
    if(err) return res.status(404).send("file non trovato");
    console.log("funzioan");
    res.send("positivo");
  });

})

https.createServer(sslOptions, app).listen(port, '0.0.0.0', () => {
  console.log(`✅ Server HTTPS avviato su https://localhost:${port}`);
});