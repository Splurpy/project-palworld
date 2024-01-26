class Pal {
    constructor(dexnum, name, power) {
        this.dexnum = dexnum;
        this.name = name;
        this.power = power;
    }

    readPals(databaseName) {
        const sqlite3 = require('sqlite3').verbose();

        // Opening the DB as RO
        let db = new sqlite3.Database('paldb.db', sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Connection to SQLite database successful');
            }
        });

        // Do DB stuff here with db.run('QUERY')

        // Closing the DB
        db.close((err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Connection closed successfully');
            }
        });
    }
}