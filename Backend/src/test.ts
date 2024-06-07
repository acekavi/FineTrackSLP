import sequelize from './config/sequelize';
import { ModelRegistry } from './models'; // path to your models index file

async function testEagerLoading() {
    const models = ModelRegistry(sequelize);
    const results = await models.OffenceRecord.findAll({
        include: [{
            model: models.FineRecord,
            as: 'fineDetails',
        }],
    });
    console.log(results);
}

testEagerLoading();
