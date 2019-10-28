const config = {
    PORT: 3000,
    DB_OPTIONS: {
        host: 'mysql-container',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'demodb',
        connectionLimit : 20,
        debug: false
    },
    PET_STATUS: {
        1: 'adopted',
        0: 'available'
    }
};

module.exports = config;