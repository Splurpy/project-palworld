const sqlite3 = require('sqlite3').verbose();

class Pal {

    constructor(tieOrder, dexNum, name, rarity, elem1, elem2, sprintSpeed, breedPower) {
        this.tieOrder = tieOrder;
        this.dexNum = dexNum;
        this.name = name;
        this.rarity = rarity;
        this.elem1 = elem1;
        this.elem2 = elem2;
        this.sprintSpeed = sprintSpeed;
        this.breedPower = breedPower;
    }

    static readPals() {
        return new Promise((resolve, reject) => {
            const query = "SELECT pd.IndexOrder, bp.DexNum, bp.Name, pd.Rarity, pd.ElementType1, pd.ElementType2, pd.RideSprintSpeed, bp.Power FROM breeding_power bp JOIN pal_data pd ON bp.Name = pd.Name ORDER BY pd.IndexOrder ASC";

            let db = new sqlite3.Database('../db/paldb.db', sqlite3.OPEN_READONLY, (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    db.all(query, (err, rows) => {
                        if (err) {
                            reject(err.message);
                        } else {
                            let queriedData = rows;

                            if (queriedData) {
                                let palArray = new Array(138);
                                let numIterations = 0;
                                queriedData.forEach(row => {
                                    let tieOrder = row.IndexOrder;
                                    let dexNum = row.DexNum;
                                    let name = row.Name;
                                    let rarity = row.Rarity;
                                    let elem1 = row.ElementType1;
                                    let elem2 = row.ElementType2;
                                    let sprintSpeed = row.RideSprintSpeed;
                                    let breedPower = row.Power;

                                    palArray[tieOrder - 1] = new Pal(tieOrder, dexNum, name, rarity, elem1, elem2, sprintSpeed, breedPower);
                                    numIterations++;
                                });
                                console.log(`Successfully read ${numIterations} entries`);
                                resolve(palArray);
                            } else {
                                console.log("queriedData is undefined");
                                reject("queriedData is undefined");
                            }
                        }

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
        });
    }
}

// Usage
Pal.readPals()
    .then(palArray => {
        console.log(palArray.length);
        // Now you use palArray in the rest of your code
        let anubis = palArray[0];
        let mysteryPal = palArray[78];
        console.log(`----Pal Profile----\nName: ${anubis.name}\nDex #: ${anubis.dexNum}\nRarity: ${anubis.rarity}\n\n`)
        console.log(`----Pal Profile----\nName: ${mysteryPal.name}\nDex #: ${mysteryPal.dexNum}\nRarity: ${mysteryPal.rarity}\n`)
    })
    .catch(error => {
        console.error(error);
    });
