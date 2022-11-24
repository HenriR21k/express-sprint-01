// Imports -----------------------------
import express from 'express';
import database from './database.js'
import cors from 'cors';

// Configure express app ---------------
const app = new express();

// Configure middleware ----------------
app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Controllers -------------------------

const buildSetFields = (fields) => fields.reduce((setSQL, field, index) =>
  setSQL + `${field}=:${field}` + ((index === fields.length - 1) ? '' : ', '), 'SET ');

const postTasksController = async (req, res) => {
    // Validate request
  
    //Conformance
    //takes the req.body as a parameter, then use replace and slice as an example to refactor the dates
    //create a conformance method.
    // so like dateConformance(object)
    // tasks.taskSetDate.replace then slice
    // tasks.taskDeadline

    // Access data
    const sql = createTasks(req.body);
    const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
    if (!isSuccess) return res.status(400).json({ message: accessorMessage });
    
    // Response to request
    res.status(201).json(result);
  };

const createTasks = (record) => {
    let table = 'tasks';
    let mutableFields = ['TaskTitle', 'TaskDescription', 'TaskStatus', 'TaskSetDate', 'TaskDeadline', 'GroupID'];
    return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
  };

const create = async (sql,record) => {
    try {
      const status = await database.query(sql,record);

      const table = 'tasks';
      const whereField = 'tasks.TaskID';
      const fields = ['tasks.TaskID','tasks.TaskTitle', 'tasks.TaskDescription', 'tasks.TaskStatus', 'tasks.TaskSetDate', 'tasks.TaskDeadline']
      const sql2 = `SELECT ${fields} FROM ${table} WHERE ${whereField}=${status[0].insertId}`;

      console.log(sql2)

      let isSuccess = false;
      let message = "";
      let result = null;
      try {
      [result] = await database.query(sql2);
      if (result.length === 0) message ="No records found";
      else {
        isSuccess = true;
        message = 'Records successfully recovered';
      }
      }
      catch (error) {
        message = `-Failed to execute message ${error.message}`
      }

      return isSuccess
        ? { isSuccess: true, result: result, message: 'Record successfully recovered' }
        : { isSuccess: false, result: null, message: `Failed to recover the inserted record: ${message}` };
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
    }
};




const groupsOfUserController = async (req, res) => {
  const id = req.params.id;
  //Build SQL
  const table = 'Groups ON Groupmembers.GroupID=Groups.GroupID';
  const whereField = 'Groupmembers.UserID'
  const fields = ['Groups.GroupID', 'Groups.GroupName']
  const extendedTable = `Groupmembers INNER JOIN ${table}`;
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

const GroupmemberTasksController = async (req, res) => {
  const id1 = req.params.id1; //Group ID
  const id2 = req.params.id2; //User ID
  //Build SQL
  const table = 'tasks on taskassignment.TaskID=tasks.TaskID';
  const whereField = 'tasks.GroupID';
  const whereField2 = 'taskassignment.userID';
  const whereField3 = 'tasks.TaskStatus';
  const whereCondition = "Outstanding";
  const fields = ['tasks.TaskID','tasks.TaskTitle']
  const extendedTable = `taskassignment INNER JOIN ${table}`;
  const extendedFields = `${fields}`;
  const sql = `SELECT ${extendedFields} FROM ${extendedTable} WHERE ${whereField}=${id1} and ${whereField2}=${id2} and ${whereField3}=\'Outstanding\'`;
 
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

const getGroupsTasks = async (req, res) => {
  const id = req.params.id;
  //Build SQL
  const table = 'tasks';
  const whereField = 'tasks.GroupID';
  const fields = ['tasks.TaskID','tasks.TaskTitle', 'tasks.TaskDescription', 'tasks.TaskStatus', 'tasks.TaskSetDate', 'tasks.TaskDeadline']
  const sql = `SELECT ${fields} FROM ${table} WHERE ${whereField}=${id}`;
 
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

const getGroupTask = async (req, res) => {
  const id1 = req.params.id1;
  const id2 = req.params.id2;

  //Build SQL
  const table = 'tasks';
  const whereField = 'tasks.GroupID';
  const whereField2 = 'tasks.TaskID';
  const fields = ['tasks.TaskID','tasks.TaskTitle', 'tasks.TaskDescription', 'tasks.TaskStatus', 'tasks.TaskSetDate', 'tasks.TaskDeadline']
  const sql = `SELECT ${fields} FROM ${table} WHERE ${whereField}=${id1} and ${whereField2}=${id2}`;
  
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

const getTasks = async (req, res) => {
  //Build SQL
  const fields = ['TaskID','TaskTitle', 'TaskDescription', 'TaskStatus', 'TaskSetDate', 'TaskDeadline']
  const table = ['tasks']
  const sql = `SELECT ${fields} FROM ${table}`;
  
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

const getTask = async (req, res) => {
  const id = req.params.id;
  //Build SQL
  const fields = ['TaskID','TaskTitle', 'TaskDescription', 'TaskStatus', 'TaskSetDate', 'TaskDeadline']
  const table = ['tasks']
  const whereField = ['TaskID']
  const sql = `SELECT ${fields} FROM ${table} WHERE ${whereField}=${id}`;
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
app.get('/api/groups/users/:id', groupsOfUserController); //All groups a user is in
app.get('/api/groups/:id1/users/:id2/tasks', GroupmemberTasksController); //All tasks assigned to a user in a group
app.get('/api/groups/:id/tasks', getGroupsTasks); //All tasks belonging to a group
app.get('/api/groups/:id1/tasks/:id2', getGroupTask) // Get a task belonging to a group

app.get('/api/tasks', getTasks) //All tasks
app.get('/api/tasks/:id', getTask) //Specific Task

app.post('/api/tasks', postTasksController); //Create a task for a group



// Start server ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server started on port ${PORT}`));