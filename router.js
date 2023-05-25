const express = require('express');
const conexion = require('./database/db');
const router = express.Router();


//MENU PRINCIPAL
router.get('/', (req,res) =>{
    conexion.query('SELECT * FROM alimento WHERE estado_alimento_id_fk = 1', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('index',{results:results});
        }
        
    });
    
});

router.get('/intranet', (req, res) =>{
    res.render('intranet')
})

//DESPLIEGUE DE INFORMACION DE ALIMENTO
router.get('/alimentocrud', (req, res) =>{
    conexion.query('SELECT * FROM alimento WHERE estado_alimento_id_fk = 1', (error, results) =>{
        if(error){
            throw error;
        }else{
            res.render('alimentocrud', {results:results});
        }
    })
})

//VISTA DE CREACION DE ALIMENTO
router.get('/crearalimento', (req, res) =>{
    res.render('crearalimento')
})

//VISTA DE EDICION DE ALIMENTO
router.get('/editaralimento/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('SELECT * FROM alimento WHERE alimento_id = ?', [id], (error, results)=>{
        if(error) throw error;

        conexion.query('SELECT * FROM categoria WHERE estado_categoria_id_fk = 1', (errorcategoria, categoria) =>{
            
            if(errorcategoria) throw errorcategoria;

            res.render('editaralimento', {results : results[0] , categoria:categoria})
        })
    })
})

//DESHABILITAR ALIMENTO
router.get('/deshabilitarAlimento/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('UPDATE alimento SET estado_alimento_id_fk = 2 WHERE alimento_id = ? ', [id], (error)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/alimentocrud')
        }
    })
})


router.get('/crearcategoria', (req, res) =>{
    res.render('crearcategoria')
})

//DESPLIEGUE DE INFORMACION DE CATEGORIA

router.get('/categoriacrud', (req, res) =>{
    conexion.query('SELECT * FROM categoria WHERE estado_categoria_id_fk = 1', (error, results) =>{
        if(error){
            throw error;
        }else{
            res.render('categoriacrud', {results:results});
        }
    })
})

//DESHABILITAR CATEGORIA
router.get('/deshabilitarCategoria/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('UPDATE categoria SET estado_categoria_id_fk = 2 WHERE categoria_id = ? ', [id], (error)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/categoriacrud')
        }
    })
})


//VISTA DE EDICION DE CATEGORIA
router.get('/editarcategoria/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('SELECT * FROM categoria WHERE categoria_id = ?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('editarcategoria', {tipo:results[0]});
        }
    })
})

const crud = require('./controller/crud');
router.post('/GuardarAlimento', crud.GuardarAlimento);
router.post('/EditarAlimento', crud.EditarAlimento);
router.post('/GuardarCategoria', crud.GuardarCategoria);
router.post('/EditarCateforia', crud.EditarAlimento);


module.exports = router; 
