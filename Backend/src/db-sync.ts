import sequelize from "./sequelize";

// Sync models in the order of dependencies
sequelize.sync({ force: true })
    .then(() => {
        console.log('Successfully synced database tables with models.');
    })
    .catch((err) => {
        console.error('Error creating database tables:', err);
    }).finally(() => {
        sequelize.close();
    })
