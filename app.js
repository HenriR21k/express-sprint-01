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
    // Access data
    const sql = createTasks();
    const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
    if (!isSuccess) return res.status(400).json({ message: accessorMessage });
    
    // Response to request
    res.status(201).json(result);
  };

  const postTaskAssignmentController = async (req, res) => {
    // Access data
    const sql = createAssignTasks();
    const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
    if (!isSuccess) return res.status(400).json({ message: accessorMessage });
    
    // Response to request
    res.status(201).json(result);
  };

  const postUserModulesController = async (req, res) => {
    // Access data
    const sql = createAssignUserModules();
    const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
    if (!isSuccess) return res.status(400).json({ message: accessorMessage });
    
    // Response to request
    res.status(201).json(result);
  };

  const deleteUserModulesController = async (req, res) => {
    // Validate request
    const id = req.params.id;
    
    // Access data
    const sql = removeUserFromModule(id);
    const { isSuccess, result, message: accessorMessage } = await remove(sql);
    if (!isSuccess) return res.status(400).json({ message: accessorMessage });
    
    // Response to request
    res.status(200).json(result);
    
  }

  const removeUserFromModule = (id) => {
    let table = 'modulemembers';
    return `DELETE from ${table} WHERE UserModuleID=${id}`;
  };

  const postFeedbackController = async (req, res) => {
    // Access data
    const sql = createPosts();
    const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
    if (!isSuccess) return res.status(400).json({ message: accessorMessage });
    
    // Response to request
    res.status(201).json(result);
  };

const postModulesController = async (req, res) => {
    // Validate request
  
    // Access data
    const sql = createModules();
    const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
    if (!isSuccess) return res.status(400).json({ message: accessorMessage });
    
    // Response to request
    res.status(201).json(result);
  };


const createModules = () => {
    let table = 'modules';
    let mutableFields = ['ModuleID', 'ModuleName', 'ModuleDescription', 'ModuleLevel', 'ModuleCode', 'ModuleStartDate', 'ModuleEndDate'];
    return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
  };

const createTasks = () => {
    let table = 'tasks';
    let mutableFields = ['TaskTitle', 'TaskDescription', 'TaskStatus', 'TaskSetDate', 'TaskDeadline', 'GroupID'];
    return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
  };

const createAssignTasks = () => {
    let table = 'taskassignment';
    let mutableFields = ['UserID', 'TaskID'];
    return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
  };

const createAssignUserModules = () => {
    let table = 'modulemembers';
    let mutableFields = ['UserID', 'ModuleID'];
    return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
  };

const createPosts = () => {
    let table = 'posts';
    let mutableFields = ['UserID', 'TaskID', 'PostDescription','PostDate'];
    return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
  };

const buildTasksUpdateSql = () => {
    let table = 'tasks';
    let mutableFields = ['TaskTitle', 'TaskDescription', 'TaskStatus', 'TaskSetDate', 'TaskDeadline', 'GroupID'];
    return `UPDATE ${table} ` + buildSetFields(mutableFields) + ` WHERE TaskID=:TaskID`;
  };

const buildModulesUpdateSql = () => {
    let table = 'modules';
    let mutableFields = ['ModuleID', 'ModuleName', 'ModuleDescription', 'ModuleLevel', 'ModuleCode', 'ModuleStartDate', 'ModuleEndDate'];
    return `UPDATE ${table} ` + buildSetFields(mutableFields) + ` WHERE ModuleID=:ModuleID`;
  };

const create = async (sql,record) => {
    try {
      const status = await database.query(sql,record);

     


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

      return isSuccess
        ? { isSuccess: true, result: result, message: 'Record successfully recovered' }
        : { isSuccess: false, result: null, message: `Failed to recover the inserted record: ${message}` };
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
    }
};

const remove = async (sql) => {
  try {
    const status = await database.query(sql);
    return status[0].affectedRows === 0
      ? { isSuccess: false, result: null, message: "Failed to delete record" }
      : { isSuccess: true, result: null, message: "Record successfully deleted" }
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to execute message ${error.message}` };
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

const putModulesController = async (req, res) => {
  // Validate request
  const id = req.params.id;
  const record = req.body;

  // Access data
  const sql = buildModulesUpdateSql();
  const { isSuccess, result, message: accessorMessage } = await updateModules(sql, id, record);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(200).json(result);
  
}

const updateTasks = async (sql, id, record) => {
  try {
    const status = await database.query(sql, { ...record, TaskID: id } );

    // const table = 'tasks';
    // const whereField = 'tasks.TaskID';
    // const fields = ['tasks.TaskID','tasks.TaskTitle', 'tasks.TaskDescription', 'tasks.TaskStatus', 'tasks.TaskSetDate', 'tasks.TaskDeadline']
    // const sql2 = `SELECT ${fields} FROM ${table} WHERE ${whereField}=${status[0].insertId}`;

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

    return isSuccess
      ? { isSuccess: true, result: result, message: 'Record successfully recovered' }
      : { isSuccess: false, result: null, message: `Failed to recover the inserted record: ${message}` };
  }
  catch (error) {
    return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
  }
};

const updateModules = async (sql, id, record) => {
  try {
    const status = await database.query(sql, { ...record, ModulesID: id } );

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

    return isSuccess
      ? { isSuccess: true, result: result, message: 'Record successfully recovered' }
      : { isSuccess: false, result: null, message: `Failed to recover the inserted record: ${message}` };
  }
  catch (error) {
    return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
  }
};

const updateProjects = async (sql, id, record) => {
  try {
    const status = await database.query(sql, { ...record, projectID: id } );

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
  let table = 'Groupmembers INNER JOIN Groups ON Groupmembers.GroupID=Groups.GroupID ';  
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

const buildGroupsSelectSql = (id,variant) => {
  let sql = '';
  let table = 'Groups';  
  let fields = ['GroupID', 'GroupName']
  
  switch(variant) {
    default:
      sql = `SELECT ${fields} FROM ${table} WHERE Groups.projectID=${id}`;
      
  }

  return sql;
}


const getUserGroupsController = async (req, res) => {
  const id = req.params.id;
  //Build SQL
  const sql = buildUsersGroupsSelectSql(id, null);
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const getGroupsInProjectsController = async (req, res) => {
  const id = req.params.id1;
  //Build SQL
  const sql = buildGroupsSelectSql(id, null);
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const postGroupController = async (req, res) => {
  // Validate request

  // Access data
  const sql = createGroup();
  const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(201).json(result);
};

const createGroup = () => {
  let table = 'groups';
  let mutableFields = ['GroupID','GroupName','projectID'];
  return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
};

const postGroupmemberController = async (req, res) => {
  // Validate request

  // Access data
  const sql = createGroupmember();
  const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(201).json(result);
};

const createGroupmember = () => {
  let table = 'groupmembers';
  let mutableFields = ['UserID','GroupID','GroupStatus'];
  return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
};


const removeGroupmemberController = async (req, res) => {
  // Validate request
  const id = req.params.id;
  
  // Access data
  const sql = removeGroupmember(id);
  const { isSuccess, result, message: accessorMessage } = await remove(sql);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(200).json(result);
  
}

const removeGroupmember = (id) => {
  let table = 'groupmembers';
  return `DELETE from ${table} WHERE GroupmemberID=${id}`;
};




const buildTasksSelectSql = (id1, id2, variant) => {
  let sql = '';
  let fields = ['TaskID','TaskTitle', 'TaskDescription', 'TaskStatus', 'TaskSetDate', 'TaskDeadline'];
  let table = 'tasks';
  let extendedTable = '';

  // let test = `SELECT taskassignment.UserID, users.firstName
  // FROM taskassignment
  // INNER JOIN users ON taskassignment.UserID = users.UserID
  // WHERE taskassignment.TaskID = 9`;

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
      break;
    case 'TaskUsers':
      fields = [`taskassignment.UserID, taskassignment.TaskUserID, users.firstName, users.lastName`]
      table = `users ON taskassignment.UserID = users.UserID`
      extendedTable = `taskassignment INNER JOIN ${table}`
      sql = `SELECT ${fields} FROM ${extendedTable} WHERE taskassignment.TaskID=${id1}`
      break;
    case 'isAssigned':
      sql = `SELECT TaskUserID 
              FROM taskassignment 
              INNER JOIN tasks ON tasks.TaskID=taskassignment.TaskID
              WHERE taskassignment.TaskID = ${id1} AND taskassignment.UserID = ${id2}`
      break;
    case 'TasksAssigned':
      sql = `SELECT taskassignment.TaskID, tasks.TaskTitle,tasks.TaskStatus,tasks.TaskSetDate, tasks.TaskDeadline, groups.groupName
              FROM taskassignment
              LEFT JOIN tasks ON taskassignment.TaskID = tasks.TaskID
              LEFT JOIN groups ON tasks.GroupID = groups.groupID
              WHERE taskassignment.UserID = ${id1} and tasks.TaskStatus=\'Outstanding\'`
      break;
  }

  return sql;
}

const buildPostsSelectSQL = (id1, id2, variant) => {
  let sql = '';
  let fields = ['posts.PostID, posts.UserID, posts.TaskID, posts.PostDescription, posts.PostDate'];
  let table = 'posts';
  let extendedTable = '';

  switch(variant) {
    default:
      sql = `SELECT ${fields} FROM ${table} WHERE PostID=${id1}`;
      break;
    case 'TaskPosts':
      table = 'tasks on posts.TaskID=tasks.TaskID'
      extendedTable = `posts INNER JOIN ${table}`;
      sql = `SELECT ${fields} FROM ${extendedTable} WHERE posts.TaskID = ${id1} ORDER BY posts.PostDescription ASC;`
      break;
  }

  return sql;

}

const getIsUserAssignedToTaskController = async (req, res) => {
  const id1 = req.params.id1;
  const id2 = req.params.id2;
  const sql = buildTasksSelectSql(id1, id2, 'isAssigned')
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const postAssignUserToTaskController = async (req, res) => {
  // Validate request

  // Access data
  const sql = createAssign();
  const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(201).json(result);
};

const createAssign = () => {
  let table = 'taskassignment';
  let mutableFields = ['UserID','TaskID'];
  return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
};

const removeAssignedUserFromTaskController = async (req, res) => {
  // Validate request
  const id = req.params.id;
  
  // Access data
  const sql = removeAssign(id);
  const { isSuccess, result, message: accessorMessage } = await remove(sql);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(200).json(result);
  
}

const removeAssign = (id) => {
  let table = 'taskassignment';
  return `DELETE from ${table} WHERE TaskUserID=${id}`;
};

const getTasksAssignedToUserController = async (req, res) => {
  
  const id1 = req.params.id1; //User ID

  const sql = buildTasksSelectSql(id1, null, 'TasksAssigned')
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

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

const getTaskPosts = async (req, res) => {
  const id1 = req.params.id1;
  const sql = buildPostsSelectSQL(id1, null, 'TaskPosts')
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const getUsersAssignedToTask = async (req, res) => {
  const id1 = req.params.id1;
  const sql = buildTasksSelectSql(id1, null, 'TaskUsers')
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const getGroupsUsersController = async (req, res) => {
  const id1 = req.params.id1;
  const sql = buildUsersSelectSql(id1, null, 'GroupsUsers')
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const buildUsersSelectSql = (id1, id2, variant) => {
  let sql = '';
  let fields = ['firstName, lastName'];
  let table = 'users';
  let extendedTable = '';
  let join = ''

  switch(variant) {
    default:
      sql = `SELECT ${fields} FROM ${table} WHERE UserID=${id1}`;
      break;
    case "userType":
      table = 'users ON usertype.UserTypeID=users.UserTypeID'
      extendedTable = `usertype INNER JOIN ${table}`;
      fields = ['UserTypeName']
      sql = `SELECT ${fields} FROM ${extendedTable} WHERE users.UserID = ${id1}`
      break;
    case "GroupsUsers":
      table = "groupmembers INNER JOIN users ON groupmembers.UserID=users.UserID"
      sql = `SELECT Groupmembers.GroupmemberID, Users.UserID ,firstName, lastName FROM ${table} WHERE groupmembers.GroupID = ${id1}`
      break;
    case "allUsers":
      sql = `SELECT * FROM users`
      break;
    case "allStudents":
        sql = `SELECT * FROM Users WHERE UserTypeID=${id1}`
        break;


  }

  return sql;

}

const getUsersController = async (req, res) => {
  
  const sql = buildUsersSelectSql(null, null, 'allUsers')
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const getUsersByUserTypeController = async (req, res) => {

  const id = req.params.id
  
  const sql = buildUsersSelectSql(id, null, 'allStudents')
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const getUserById = async (req, res) => {
  const id1 = req.params.id1;
  const sql = buildUsersSelectSql(id1, null, null)
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const buildModulesSelectSQL = (id1, id2, variant) => {
  let sql = '';
  let fields = ['ModuleID, ModuleName, ModuleDescription, ModuleLevel, ModuleCode, ModuleStartDate, ModuleEndDate'];
  let table = 'modules';
  let extendedTable = '';

  switch(variant) {
    default:
      sql = `SELECT ${fields} FROM ${table}`;
      break;
    case 'members':
      sql = `SELECT modulemembers.UserModuleID, Users.UserID, Users.firstName, Users.lastName
              FROM ModuleMembers
              INNER JOIN Users ON ModuleMembers.UserID=Users.UserID
              WHERE ModuleMembers.ModuleID=${id1} AND Users.UserTypeID=2
      `
      
  }

  return sql;

}

const getModulesController = async (req, res) => {
  
  //Validate Request

  const sql = buildModulesSelectSQL(null, null, null)
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const getUsersInModulesController = async (req, res) => {
  
  const id1 = req.params.id1

  const sql = buildModulesSelectSQL(id1, null, 'members')
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const getUserUserTypeController = async (req, res) => {

  const id1 = req.params.id1;

  const sql = buildUsersSelectSql(id1, null, "userType")
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
}

const buildProjectsSelectSQL = (id1, id2, variant) => {
  let sql = '';
  let fields = ['projectID, projectName, projectDescription, projectStartDate, projectEndDate'];
  let table = 'projects';
  let extendedTable = '';

  switch(variant) {
    default:
      sql = `SELECT ${fields} FROM ${table} WHERE ModuleID=${id1}`;
      break;
      
  }

  return sql;

}

const getProjectController = async (req, res) => {
  
  const id1 = req.params.id
  //Validate Request

  const sql = buildProjectsSelectSQL(id1, null, null)
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const postProjectController = async (req, res) => {
  // Validate request

  // Access data
  const sql = createProject();
  const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(201).json(result);
};

const createProject = () => {
  let table = 'projects';
  let mutableFields = ['projectID', 'projectName', 'projectDescription', 'projectStartDate', 'projectEndDate', 'ModuleID'];
  return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
};

const putProjectController = async (req, res) => {
  // Validate request
  const id = req.params.id;
  const record = req.body;

  // Access data
  const sql = buildProjectUpdateSql();
  const { isSuccess, result, message: accessorMessage } = await updateProjects(sql, id, record);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(200).json(result);
  
}

const buildProjectUpdateSql = () => {
  let table = 'projects';
  let mutableFields = ['projectID', 'projectName', 'projectDescription', 'projectStartDate', 'projectEndDate', 'ModuleID'];
  return `UPDATE ${table} ` + buildSetFields(mutableFields) + ` WHERE projectID=:projectID`;
};



// Endpoints ---------------------------

//app.get('/api/groups', groupsController);
app.get('/api/groups/users/:id', getUserGroupsController); //All groups a user is in
app.get('/api/tasks/:id1/users', getUsersAssignedToTask);
app.get('/api/groups/:id1/users', getGroupsUsersController);
app.get('/api/projects/:id1/groups', getGroupsInProjectsController) //get all groups for a project
app.post('/api/groups', postGroupController) //create a group for a project
app.post('/api/group/user', postGroupmemberController) //Create a user joins a group
app.delete('/api/groupmember/:id', removeGroupmemberController) //Removes relation between user and group

app.get('/api/users', getUsersController)
app.get('/api/users/userType/:id', getUsersByUserTypeController) //gets all users by user type
app.get('/api/users/:id1', getUserById); //Gets a specific user
app.get('/api/users/:id1/userType', getUserUserTypeController) //get users user type.


app.get('/api/users/:id1/tasks', getTasksAssignedToUserController)
app.get('/api/groups/:id1/users/:id2/tasks', GroupmemberTasksController); //All tasks assigned to a user in a group
app.get('/api/user/:id1/tasks', getTasksAssignedToUserController) //Get all tasks assigned to a user
app.get('/api/task/:id1/users/:id2', getIsUserAssignedToTaskController); //Checks to see if user has been assigned to a task
app.post('/api/assignTask', postAssignUserToTaskController);
app.delete('/api/unAssignTask/:id', removeAssignedUserFromTaskController); 
app.get('/api/groups/:id/tasks', getGroupsTasks); //All tasks belonging to a group
app.get('/api/tasks/:id2/groups/:id1', getGroupTask) // Get a task belonging to a group
app.get('/api/tasks', getTasks) //All tasks
app.get('/api/tasks/:id1', getTask) //Specific Task

app.post('/api/tasks', postTasksController); //Create a task for a group
app.put('/api/tasks/:id', putTasksController); //Edit a task in a group
app.post('/api/users/tasks', postTaskAssignmentController); //Assign user to task

app.get('/api/tasks/:id1/posts', getTaskPosts);
app.post('/api/tasks/posts', postFeedbackController); //Feedback for tasks

app.get('/api/modules', getModulesController);
app.get('/api/module/:id1/users', getUsersInModulesController) //get all users in a module
app.post('/api/module', postModulesController);
app.put('/api/modules/:id', putModulesController);
app.post('/api/users/modules', postUserModulesController) //Assign user to Module
app.delete('/api/users/modules/:id', deleteUserModulesController) //UnAssign user to Module


app.get('/api/modules/:id/projects', getProjectController)
app.post('/api/projects', postProjectController)
app.put('/api/projects/:id', putProjectController)



// Start server ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server started on port ${PORT}`));