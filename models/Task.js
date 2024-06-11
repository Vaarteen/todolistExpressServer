module.exports = (db) => {
    return {
        getAllTasks: (callback) => {
            db.query('SELECT * FROM tasks', (err, results) => {
                callback(err, results);
            });
        },
        createTask: (task, callback) => {
            db.query('INSERT INTO tasks (task) VALUES (?)', [task], (err, result) => {
                callback(err, { id: result.insertId, task, completed: false });
            });
        },
        updateTask: (id, task, completed, callback) => {
            db.query(
                'UPDATE tasks SET task = ?, completed = ? WHERE id = ?',
                [task, completed, id],
                (err) => {
                    callback(err);
                }
            );
        },
        deleteTask: (id, callback) => {
            db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
                callback(err);
            });
        }
    };
};
