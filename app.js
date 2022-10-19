// Imports -----------------------------
import express from 'express';
import database from './database.js'
// Configure express app ---------------
const app = new express();

// Configure middleware ----------------

// Controllers -------------------------
const groupsOfUserController = async (req, res) => {
  const id = req.params.id;
  //Build SQL
  const table = 'Groups ON Groupmember.GroupID=Groups.GroupID';
  const whereField = 'Groupmember.UserID'
  const fields = ['Groups.GroupID', 'Groups.GroupName']
  const extendedTable = `Groupmember INNER JOIN ${table}`;
  const extendedFields = `${fields}`;
  const sql = `SELECT ${extendedFields} FROM ${extendedTable} WHERE ${whereField}=${id}`;
 
  //Execute Query
  let isSuccess = false;
  let message = "";
  let result = null;
  try {
  [result] = await database.query(sql);
  if (result.length === 0) message ="No records found";
  else {
    isSuccess = true;
    message = 'Records successfully recovered';
  }
  }
  catch (error) {
    message = `-Failed to execute message ${error.message}`
  }
  //Response
  isSuccess
    ? res.status(200).json(result)
    : res.status(400).json({ message })
};

// Endpoints ---------------------------
//app.get('/api/groups', groupsController);
app.get('/api/groups/users/:id', groupsOfUserController);


// Start server ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server started on port ${PORT}`));