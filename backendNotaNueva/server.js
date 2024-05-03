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
    res.status(201).json({ message: 'Servicio guardado' });
});

app.get('/servicios', async (req, res) =>{
    try{
        const servicios =await Servicio.find({});
        res.status(200).json(servicios);
    }catch (error){
        res.status(500).json({message: 'error al obtener los servicios'});
    }
})

// Cambio de puerto de 3001 a 3002
const PORT = 3002; // Modificación realizada aquí
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});