exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    // (process.env.NODE_ENV === 'production' ?
    // 'mongodb://localhost/shopping-list' :
    // 'mongodb://localhost/shopping-list-dev'
    'mongodb://<tzuridis>:<greece1124>@ds029106.mlab.com:29106/mlab-shopping'
// exports.PORT = process.env.PORT || 8080;
