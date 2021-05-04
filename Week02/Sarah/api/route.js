const Pool= require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"2007anaksulung",
    database:"api",
    host:"localhost",
    port:5432
});

module.exports = pool;

const getData = async(req,res)=>{
  try{
      const allData = await pool.query("SELECT * FROM users");
      res.json(allData.rows);
  }catch(err){
      console.error(err.message);
  }
}

const getDataID = async(req,res)=>{
  const { id } = req.params;
  try{
    const data = await pool.query("SELECT * FROM users WHERE id = ($1)", [id]);

    res.json(data.rows[0]);
  }catch(err){
      console.error(err.message);
  }
}

const createData = async(req, res)=>{
  try{
      const {id, name, email}= req.body;
      const newData = await pool.query(
          "INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *",
          [id, name, email]
      );

      res.json(newData.rows[0]);
  }catch(err){
      console.error(err.message);
  }
}

const editData = async(req, res)=>{
  try{
      const { id } = req.params;
      const {name, email} = req.body;
      const editData = await pool.query(
          "UPDATE users SET (name, email) = ($1, $2) WHERE id = ($3)",
          [name, email, id]
      );

      res.json(editData.rows[0]);
      console.log("Edit success!")
  }catch(err){
      console.error(err.message);
  }
}

const deleteData = async(req, res)=>{
  try{
      const { id } = req.params;
      const deleteData = await pool.query(
          "DELETE FROM users WHERE id = ($1)",
          [id]
      );

      res.json(deleteData.rows[0]);
      console.log("Delete success!")
  }catch(err){
      console.error(err.message);
  }
}

pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})

module.exports = {
    getData,
    getDataID,
    createData,
    editData,
    deleteData
  }