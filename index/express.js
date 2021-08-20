const express = require('express')
const app = express()
const port = 3000

app.listen(process.env.PORT, function(){
    console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env);
});