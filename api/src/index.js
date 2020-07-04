require('dotenv').config();
const express = require('express');

const bootstrap = require('./boot_sequelize');

bootstrap().then(() => {
    const app = express();

    app.set("host", process.env.API_HOST || "localhost");
    app.set("port", process.env.API_PORT || process.env.PORT || 3000);

    app.use('/', require('./routers'));

    const port = app.get("port");
    const host = app.get("host");
    app.listen(port, () => console.log(`Server listening on http://${host}:${port}/...`));
});
