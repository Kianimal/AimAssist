const express = require('express')
const app = express()
const port = 3000

app.listen(process.env.PORT || port, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});