const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator')
let cors = require('cors');
require('dotenv').config();


//imported routes
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category')
const entryRoutes = require('./routes/entry')
const productRoutes = require('./routes/product')
const sellRoutes = require('./routes/sell')
const shopRoutes = require('./routes/shop')
const versementRoutes = require('./routes/versement')
const expenseRoutes = require('./routes/expense')
const returnsRoutes = require('./routes/returns')
const photoRoutes = require('./routes/photo')
const commandRoutes = require('./routes/command')
const commandedRoutes = require('./routes/commanded')
const inventory = require('./routes/inventory')
//app
const app = express();

//middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(expressValidator())


//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected');
})

//route
app.use('/api', userRoutes);
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', entryRoutes)
app.use('/api', sellRoutes)
app.use('/api', shopRoutes)
app.use('/api', versementRoutes)
app.use('/api', expenseRoutes)
app.use('/api', returnsRoutes)
app.use('/api', photoRoutes)
app.use('/api', commandRoutes)
app.use('/api', commandedRoutes)
app.use('/api', inventory)


app.get('/', (req, res) => {
    console.log("req recu")
    res.json({ "sall": "abdoul" })
})


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})