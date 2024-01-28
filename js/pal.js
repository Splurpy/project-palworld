const sqlite3 = require('sqlite3').verbose();

class Pal {
    constructor(tieOrder, dexNum, name, rarity, elem1, elem2, breedPower) {
        this.tieOrder = tieOrder;
        this.dexNum = dexNum;
        this.name = name;
        this.rarity = rarity;
        this.elem1 = elem1;
        this.elem2 = elem2;
        this.breedPower = breedPower;
    }

    static readPals(palArray) {
        const query = "SELECT pd.IndexOrder, bp.DexNum, bp.Name, pd.Rarity, pd.ElementType1, pd.ElementType2, bp.Power FROM breeding_power bp JOIN pal_data pd ON bp.Name = pd.Name ORDER BY pd.IndexOrder ASC";

        // Opening the DB as RO
        let db = new sqlite3.Database('../paldb.db', sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Connection to SQLite database successful');

                // Move the db.all and dependent code inside the callback
                db.all(query, (err, rows) => {
                    if (err) {
                        console.error(err.message);
                    } else {
                        let queriedData = rows;

                        if (queriedData) {
                            let numIterations = 0;
                            queriedData.forEach(row => {
                                let tieOrder = row.IndexOrder;
                                let dexNum = row.DexNum;
                                let name = row.Name;
                                let rarity = row.Rarity;
                                let elem1 = row.ElementType1;
                                let elem2 = row.ElementType2;
                                let breedPower = row.Power;

                                palArray[tieOrder - 1] = new Pal(tieOrder, dexNum, name, rarity, elem1, elem2, breedPower);
                                numIterations++;
                            });
                            console.log(`Successfully read ${numIterations} entries`);
                        } else {
                            console.log("queriedData is undefined");
                        }
                    }

                    // Closing the DB inside the db.all callback
                    db.close((err) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log('Connection closed successfully');
                        }
                    });
                });
            }
        });
    }
}

const palArray = new Array(138);

Pal.readPals(palArray);
const anubis = palArray[0];
// console.log(`----Pal Profile----\nName: ${anubis.Name}\nDex #: ${anubis.DexNum}\nRarity: ${anubis.Rarity}\n`)
