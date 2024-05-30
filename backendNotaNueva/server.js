    const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    mongoose.connect('mongodb://localhost:27017/baseDatosNotaNueva');
    //definision del esquema mongoose
    // Modifica el esquema para incluir la fecha
    const ServicioSchema = new mongoose.Schema({
        cliente: String,
        fecha: Date, // Campo de fecha agregado
        servicios: [{ servicio: String, cantidad: Number }]
    });
    //modelo 
    const Servicio = mongoose.model('Servicio', ServicioSchema);

    app.get('/acumulado/:cliente', async (req, res) => {
        const { cliente } = req.params;
        const { fechaInicio, fechaFin } = req.query;
        try {
        const servicios = await Servicio.find({
            cliente: cliente,
            fecha: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) }
        }).sort({ fecha: 1 });
        res.status(200).json(servicios); // Asegúrate de que servicios es un arreglo
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicios' });
        }
    });

    app.post('/servicios', async (req, res) => {
        // la fecha se recibe en formato ISO y se convierte a un objeto Date
        req.body.fecha = new Date(req.body.fecha);
        const nuevoServicio = new Servicio(req.body);
        try {
            await nuevoServicio.save();
            res.status(201).json({ message: 'Servicio guardado' });
        }catch (error) {
            // Manejo de errores
            res.status(500).json({ message: 'Error al guardar el servicio', error: error.message });
        }
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