
//API GENERATED WITH LOVE BY https://github.com/skiod
//v 0.0.1
const express = require('express');

const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use('/',require('./routes/web'))
app.use('/',require('./routes/user')) 
app.use('/',require('./routes/community')) 
app.use('/',require('./routes/user_community')) 
app.use('/',require('./routes/post')) 
app.use('/',require('./routes/comment')) 
app.use('/',require('./routes/vote')) 

app.listen(process.env.PORT,() => {
    console.log(` LISTEN TO PORT ${process.env.PORT}`)
})