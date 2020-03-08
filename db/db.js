const sqlite = require('sqlite3');

class AppDB {
    constructor(dbFilePath) {
        this.db = new sqlite.Database(dbFilePath, (err) => {
            if (err) {
                console.log('Could not connect to database', err);
            } else {
                console.log('Connected to database');
            }
        });
    }

    run(sql, params=[]) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) {
                    console.log(`Error running sql\n ${sql}`);
                    console.log(err.message);
                    reject(err);
                } else {
                    resolve({id: this.lastID, changes: this.changes});
                }
            })
        })
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql\n ' + sql);
                    console.log(err.message);
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error running sql\n ' + sql);
                    console.log(err.message);
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    createUserTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS USER(
            ID INTEGER PRIMARY KEY      AUTOINCREMENT,
            DISPLAY_ID         TEXT,
            IS_COMPLETED       INT      NOT NULL,
            START_TIME         TEXT     NOT NULL,
            END_TIME           TEXT,
            X1                 REAL,
            Y1                 REAL,
            X2                 REAL,
            Y2                 REAL
        )`;
        this.run(sql).then((res) =>{
            console.log('User table created');
        }).catch((err) => {
            console.log('Error creating the User table');
        });
    }

    addUser(displayId, x, y) {
        const sql = `
        INSERT INTO USER(DISPLAY_ID, IS_COMPLETED, START_TIME, X1, Y1)
        VALUES(?, 0, ?, ?, ?)`;

        const info = '[displayId: ' + displayId +'; x: ' + x + '; y: ' + y + ']';
        const date = new Date().toISOString();
        const params = [displayId, date, x, y];

        return new Promise((resolve, reject) => {
            this.run(sql, params).then((res) => {
                console.log(`Added user with ID ${res.id} ${info}`);
                resolve(res);
            }).catch((err) => {
                console.log(`Could not add user ${info}`);
                reject(err);
            });
        });
    }

    fullAdd(x1, y1, x2, y2) {
        const sql = `
        INSERT INTO USER(IS_COMPLETED, START_TIME, END_TIME, X1, Y1, X2, Y2)
        VALUES(1, ?, ?, ?, ?, ?, ?)`;

        const info = '[x1: ' + x1 + '; y1: ' + y1 + '; x2: ' + x2 + '; y2: ' + y2 + ']';
        const date = new Date().toISOString();
        const params = [date, date, x1, y1, x2, y2];

        return new Promise((resolve, reject) => {
            this.run(sql, params).then((res) => {
                console.log(`Added user with ID ${res.id} ${info}`);
                resolve(res);
            }).catch((err) => {
                console.log(`Could not add user ${info}`);
                reject(err);
            });
        });
    }

    completeUser(userID, x, y) {
        const sql = `UPDATE USER
        SET IS_COMPLETED = 1,
            X2 = ?,
            Y2 = ?,
            END_TIME = ?
        WHERE ID = ?`;

        const info = `[ID: ${userID}; x: ${x}; y: ${y}]`;
        const date = new Date().toISOString();
        const params = [x, y, date, userID];

        return new Promise((resolve, reject) => {
            this.run(sql, params).then((res) => {
                console.log(`User journey complete with ID ${res.id} ${info}`);
                resolve();
            }).catch((err) => {
                console.log(`Could not complete user journey ${info}`);
                reject(err);
            });
        });
    }

    deleteUser(id) {
        return this.run(`DELETE FROM USER WHERE ID = ?`, [id]);
    }

    getUsers() {
        return this.all(`SELECT * FROM USER`);
    }

    getUser(id) {
        return this.get(`SELECT * FROM USER WHERE ID = ?`, [id]);
    }

    close() {
        this.db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Closed the database connection');
        });
    }
}

module.exports = AppDB;