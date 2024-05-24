// XwDwvuX1nRvhGsr6
const express=require("express");
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
const productRoutes = require('./routes/products');


const app=express();
const port=process.env.PORT || 5000

//Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://imustbefocused:XwDwvuX1nRvhGsr6@cluster0.amjz8kv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

// Check connection
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

//Routes
app.use('/products', productRoutes);


app.listen(port, ()=>{
    console.log('server started running')
});

