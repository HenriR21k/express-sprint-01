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
    const sql = createTasks();
    const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
    if (!isSuccess) return res.status(400).json({ message: accessorMessage });
    
    // Response to request
    res.status(201).json(result);
  };



const createTasks = () => {
    let table = 'tasks';
    let mutableFields = ['TaskTitle', 'TaskDescription', 'TaskStatus', 'TaskSetDate', 'TaskDeadline', 'GroupID'];
    return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
  };

const buildTasksUpdateSql = () => {
    let table = 'tasks';
    let mutableFields = ['TaskTitle', 'TaskDescription', 'TaskStatus', 'TaskSetDate', 'TaskDeadline', 'GroupID'];
    return `UPDATE ${table} ` + buildSetFields(mutableFields) + ` WHERE TaskID=:TaskID`;
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

const putTasksController = async (req, res) => {
  // Validate request
  const id = req.params.id;
  const record = req.body;

  // Access data
  const sql = buildTasksUpdateSql();
  const { isSuccess, result, message: accessorMessage } = await updateTasks(sql, id, record);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(200).json(result);
  
}

const updateTasks = async (sql, id, record) => {
  try {
    const status = await database.query(sql, { ...record, TaskID: id } );

    const table = 'tasks';
    const whereField = 'tasks.TaskID';
    const fields = ['tasks.TaskID','tasks.TaskTitle', 'tasks.TaskDescription', 'tasks.TaskStatus', 'tasks.TaskSetDate', 'tasks.TaskDeadline']
    const sql2 = `SELECT ${fields} FROM ${table} WHERE ${whereField}=${status[0].insertId}`;

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



const buildUsersGroupsSelectSql = (id,variant) => {
  let sql = '';
  let table = '`Groupmembers INNER JOIN Groups ON Groupmembers.GroupID=Groups.GroupID ';  
  let fields = ['Groups.GroupID', 'Groups.GroupName']
  
  switch(variant) {
    default:
      sql = `SELECT ${fields} FROM ${table}`;
      if (id) sql += `WHERE Groupmembers.UserID=${id}`
  }

  return sql;
}

const read = async (selectSql) => {
  try {
    const [result] = await database.query(selectSql);
    return (result.length === 0)
      ? { isSuccess: false, result: null, message: "No record(s) found" }
      : { isSuccess: true, result: result, message: "Records successfully recovered" }
  
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to execute message ${error.message}` };
    }
}


const getUserGroupsController = async (req, res) => {
  const id = req.params.id;
  //Build SQL
  const sql = buildUsersGroupsSelectSql(id, null);
 
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

const buildTasksSelectSql = (id1, id2, variant) => {
  let sql = '';
  let fields = ['TaskID','TaskTitle', 'TaskDescription', 'TaskStatus', 'TaskSetDate', 'TaskDeadline'];
  let table = 'tasks';
  let extendedTable = '';

  switch(variant) {
    default:
      sql = `SELECT ${fields} FROM ${table} WHERE TaskID=${id1}`;
      break;
    case 'tasks':
      sql = `SELECT ${fields} FROM ${table}`
      break;
    case 'groupTask':
      fields = ['tasks.TaskID','tasks.TaskTitle', 'tasks.TaskDescription', 'tasks.TaskStatus', 'tasks.TaskSetDate', 'tasks.TaskDeadline']
      sql = `SELECT ${fields} FROM ${table} WHERE tasks.GroupID=${id1} and tasks.TaskID=${id2}`
      break;
    case 'groupTasks':
      fields = ['tasks.TaskID','tasks.TaskTitle', 'tasks.TaskDescription', 'tasks.TaskStatus', 'tasks.TaskSetDate', 'tasks.TaskDeadline']
      sql = `SELECT ${fields} FROM ${table} WHERE tasks.GroupID=${id1}`
      break;
    case 'userTasks':
      table = 'tasks on taskassignment.TaskID=tasks.TaskID';
      fields = ['tasks.TaskID', 'tasks.TaskTitle']
      extendedTable = `taskassignment INNER JOIN ${table}`;
      sql = `SELECT ${fields} FROM ${extendedTable} WHERE tasks.GroupID=${id1} and taskassignment.userID=${id2} and tasks.TaskStatus=\'Outstanding\'`

  }

  return sql;
}


const GroupmemberTasksController = async (req, res) => {
  const id1 = req.params.id1; //Group ID
  const id2 = req.params.id2; //User ID

  const sql = buildTasksSelectSql(id1, id2, 'userTasks')
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const getGroupsTasks = async (req, res) => {
  const id1 = req.params.id;
  const sql = buildTasksSelectSql(id1, null, 'groupTasks')
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const getGroupTask = async (req, res) => {
  const id1 = req.params.id1;
  const id2 = req.params.id2;

  const sql = buildTasksSelectSql(id1, id2, 'groupTask');
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const getTasks = async (req, res) => {
  
  //Validate Request

  const sql = buildTasksSelectSql(null, null, 'tasks')
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const getTask = async (req, res) => {
  const id1 = req.params.id1;

  //Validate request

  //Access data
  const sql = buildTasksSelectSql(id1, null, null);
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

// Endpoints ---------------------------

//app.get('/api/groups', groupsController);
app.get('/api/groups/users/:id', getUserGroupsController); //All groups a user is in

app.get('/api/groups/:id1/users/:id2/tasks', GroupmemberTasksController); //All tasks assigned to a user in a group
app.get('/api/groups/:id/tasks', getGroupsTasks); //All tasks belonging to a group
app.get('/api/groups/:id1/tasks/:id2', getGroupTask) // Get a task belonging to a group
app.get('/api/tasks', getTasks) //All tasks
app.get('/api/tasks/:id1', getTask) //Specific Task

app.post('/api/tasks', postTasksController); //Create a task for a group
app.put('/api/tasks/:id', putTasksController); //Edit a task in a group



// Start server ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server started on port ${PORT}`));