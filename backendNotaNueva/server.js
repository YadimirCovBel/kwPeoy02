const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyparser.json());

mongoose.connect('mongodb:/localhost:27017/baseDatosNotaNueva', {
    useNewUrlParser: true,
    unseUnifiedTopology: true
});

const ServicioSchema = mongoose.Schema({
    cliente:String,
    servicios: [{ servicio:String, cantidad: Number}]
});
const Servicios = mongoose.model('Servicio', ServicioSchema);

app.post('/servicios', async (req, res) => {
    const nuevoServicio = new ServicioSchema(req.body);
    await nuevoServicio.save();
    res.status(201).send('Servicio guardado');
;})
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});