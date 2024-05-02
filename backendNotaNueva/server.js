const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/baseDatosNotaNueva', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
//definision del esquema mongoose
const ServicioSchema = new mongoose.Schema({
    cliente: String,
    servicios: [{ servicio: String, cantidad: Number }]
});
//modelo 
const Servicio = mongoose.model('Servicio', ServicioSchema);

app.post('/servicios', async (req, res) => {
    const nuevoServicio = new Servicio(req.body);
    await nuevoServicio.save();
    res.status(201).send('Servicio guardado');
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});