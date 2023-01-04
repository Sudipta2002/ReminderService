const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const { sendBasicEmail } = require('./services/email-service');
const setUpAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
        sendBasicEmail(
            'support@admin.com',
            'khelahobe.aj000@gmail.com',
            'This is a testing email',
            'Hey babes , I hope you like the reminder service support. Thanks !'
        );
    })
}
setUpAndStartServer();