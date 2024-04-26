const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')//importe cors
const app = express();

app.use(cors()); //habilite cors
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/backend', {
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
    console.log('Estado actual: ', estado || {valor:0}); //imprime el estado actual
    res.json(estado || {valor: 0});
});

//Actualizar estado
app.post('/estado', async (req,res) => {
    const estado = await Estado.findOne();
    const nuevoValor = estado && estado.valor === 0 ? 1:0; 
    console.log('Nuevo valor: ', {valor:nuevoValor}); //imprime el nuevo valor
    await Estado.findOneAndUpdate({}, {valor: nuevoValor}, {upsert: true});
    res.json({ valor:nuevoValor});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
