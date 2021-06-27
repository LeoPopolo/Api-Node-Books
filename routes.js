const express = require('express');
const routes = express.Router();

routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) {
            return res.send(err);
        }

        conn.query('SELECT * FROM books WHERE 1=1', (err, rows)=>{
            if(err) {
                return res.send(err);
            }

            res.json(rows);
        });
    });
});

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) {
            return res.send(err);
        } 

        conn.query('INSERT INTO books set ?', [req.body],(err, rows)=>{
            if(err) {
                return res.send(err);
            }

            res.json("libro guardado con exito");
        });
    });
});

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) {
            return res.send(err);
        } 

        conn.query('DELETE FROM books WHERE id = ?', [req.params.id],(err, rows)=>{
            if(err) {
                return res.send(err);
            }

            res.json("libro eliminado con exito");
        });
    });
});

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) {
            return res.send(err);
        } 

        conn.query('UPDATE books set ? WHERE id = ?', [req.body, req.params.id],(err, rows)=>{
            if(err) {
                return res.send(err);
            }

            res.json("libro actualizado con exito");
        });
    });
});

module.exports = routes;