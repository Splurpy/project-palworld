
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

    static async readPals() {
        return new Promise((resolve, reject) => {
            fetch('../db/paldb.db')
                .then(response => response.arrayBuffer())
                .then(buffer => {
                    const db = new SQL.Database(new Uint8Array(buffer));
                    const query = "SELECT pd.IndexOrder, bp.DexNum, bp.Name, pd.Rarity, pd.ElementType1, pd.ElementType2, pd.RideSprintSpeed, bp.Power FROM breeding_power bp JOIN pal_data pd ON bp.Name = pd.Name ORDER BY pd.IndexOrder ASC";
                    const rows = db.exec(query);

                    if (rows.length > 0) {
                        let palArray = new Array(138);
                        let numIterations = 0;

                        rows[0].values.forEach(row => {
                            let tieOrder = row[0];
                            let dexNum = row[1];
                            let name = row[2];
                            let rarity = row[3];
                            let elem1 = row[4];
                            let elem2 = row[5];
                            let sprintSpeed = row[6];
                            let breedPower = row[7];

                            palArray[tieOrder - 1] = new Pal(tieOrder, dexNum, name, rarity, elem1, elem2, sprintSpeed, breedPower);
                            numIterations++;
                        });

                        console.log(`Successfully read ${numIterations} entries`);
                        resolve(palArray);
                    } else {
                        console.log("No data retrieved");
                        reject("No data retrieved");
                    }

                    db.close();
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    }
}