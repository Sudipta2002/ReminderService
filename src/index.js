const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const { createChannel } = require('./utils/messageQueue');
// const { sendBasicEmail } = require('./services/email-service');
const jobs = require('./utils/job');
const TicketController = require('./controllers/ticket-controller');
const setUpAndStartServer = async() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // const channel = await createChannel();
    app.post('/api/v1/tickets', TicketController.create);
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
        // jobs();
    });
}

setUpAndStartServer();