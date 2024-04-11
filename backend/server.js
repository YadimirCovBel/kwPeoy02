const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb:localhost/backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('conexion a mongoDB exitosa');
}).catch(err => {
    console.error('Error conectado a mongoDB', err);
});

const EstadoSchema = new mongoose.Schema({ valor: { type:Number, default: 0}
});

const Estado = mongoose.model('Estado', EstadoSchema);

//obtener estado actual
app.get('/estado', async (req,res) => {
    const estado = await Estado.findOne();
    res.json(estado || {valor: 0});
});

//Actualizar estado
app.post('/estado', async (req,res) => {
    const estado = await Estado.findOne();
    const nuevoValor = estado && estado.valor === 0 ? 1:0; 
    await Estado.findOneAndUpdate({}, {valor: nuevoValor}, {upsert: true});
    res.json({ valor:nuevoValor});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log('Servidor corriendo en puerto ${PORT}');
});