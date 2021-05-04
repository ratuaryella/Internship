const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json())

//GET
app.get("/todos", async(req,res)=>{
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }catch(err){
        console.error(err.message);
    }
})


//GET BY ID
app.get("/todos/:id", async(req,res)=>{
    const { id } = req.params;
    try{
        const todo = await pool.query("SELECT * FROM todo WHERE id = ($1)", [id]);

        res.json(todo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

// POST
app.post("/todos",async(req, res)=>{
    try{
        const {id, description}= req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (id, description) VALUES ($1, $2) RETURNING *",
            [id, description]
        );

        res.json(newTodo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

//PUT
app.put("/todos/:id",async(req, res)=>{
    const { id } = req.params;
    const {description}= req.body;
    try{
        const todo = await pool.query("UPDATE todo SET description = ($1) WHERE id = ($2)", [description, id]);

        res.json("data updated!");
    }catch(err){
        console.error(err.message);
    }
})

//DELETE
app.delete("/todos/:id",async(req, res)=>{
    const { id } = req.params;
    try{
        const todo = await pool.query("DELETE FROM todo WHERE id = ($1)", [id]);

        res.json("data deleted!");
    }catch(err){
        console.error(err.message);
    }
})
app.listen(3000, ()=>{
    console.log("server is listening on port 3000");
})