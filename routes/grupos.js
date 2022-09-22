const express = require('express');
const router =express.Router();
const Grupo = require('../models/grupo');

//get back all the asignaturas
router.get('/', async (req,res)=>{
    try{
        const grupos = await Grupo.find();
        res.json(grupos);
    } catch(err) {
        res.json({message:err});
    }
});

//add a program
router.post('/', async (req,res)=>{
    const grupo = new Grupo({
        
        Asignatura:req.body.Asignatura,
        Numero: req.body.Numero,
        Dias:req.body.Dias,
        Horario: req.body.Horario,
        Cupos: req.body.Cupos,
        Edificio: req.body.Edificio,
        Salon:req.body.Salon,
        IDProfesor: req.body.IDProfesor,
        IDEstudiantes:req.body.IDEstudiantes

    });    
    try{
        const savedGrupo = await grupo.save();
        res.json(savedGrupo);
    } catch(err) {
        res.json({message:err});
    }
});

//get a specific program
router.get('/:grupoId', async (req,res)=>{
    try{
        const grupo = await Grupo.findById(req.params.grupoId);
        res.json(grupo);
    } catch(err) {
        res.json({message:err});
    }    
});

//remove a post 
router.delete('/:grupoId', async (req,res)=>{
    try{
        const removedGrupo = await Grupo.remove({_id: req.params.grupoId});
        res.json(removedGrupo);
    } catch(err) {
        res.json({message:err});
    }    
});

//update a post 
router.patch('/:grupoId', async (req,res)=>{
    try{
        const updatedGrupo = await Grupo.updateOne(
            {_id: req.params.grupoId},
            {$set:{
                Numero: req.body.Numero,
                Dias:req.body.Dias,
                Horario: req.body.Horario,
                Cupos: req.body.Cupos,
                Edificio: req.body.Edificio,
                Salon:req.body.Salon,
                IDProfesor: req.body.IDProfesor,
                IDEstudiantes:req.body.IDEstudiantes
            }

            }            
        );
        res.json(updatedGrupo);
    } catch(err) {
        res.json({message:err});
    }    
});



module.exports = router;