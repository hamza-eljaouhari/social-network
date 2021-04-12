
//API GENERATED WITH LOVE BY https://github.com/skiod
//v 0.0.1
const express = require('express');


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const bodyParser = require('body-parser');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use('/',require('./routes/web'))
app.use('/',require('./routes/user')) 
app.use('/',require('./routes/community')) 
app.use('/',require('./routes/subscription')) 
app.use('/',require('./routes/post')) 
app.use('/',require('./routes/comment')) 
app.use('/',require('./routes/vote')) 

app.listen(process.env.PORT,() => {
    console.log(` LISTEN TO PORT ${process.env.PORT}`)
})