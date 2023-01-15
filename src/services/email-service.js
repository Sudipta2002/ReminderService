// const { response } = require('express');
const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');
const sendBasicEmail = async(mailFrom, mailTo, mailSubject, mailBody) => {
    sender.sendMail({
        from: mailFrom,
        to: mailTo,
        subject: mailSubject,
        text: mailBody
    });
}
const fetchPendingEmails = async(timestamp) => {
    try {
        const repo = new TicketRepository();
        const response = await repo.get({ status: "PENDING" });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const updateTicket = async(ticketId, data) => {
    try {
        const repo = new TicketRepository();
        const response = await repo.update(ticketId, data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const createNotification = async(data) => {
    try {
        const repo = new TicketRepository();
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}
const subscribeEvents = async(payload) => {
    // console.log('Inside service layer', data);

    let service = payload.service;
    let data = payload.data;
    switch (service) {
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        case 'SEND_BASIC_MAIL':
            await sendBasicEmail(data);
            break;
        default:
            console.log("No valid event received");
            break;
    }
}
module.exports = { sendBasicEmail, updateTicket, fetchPendingEmails, createNotification, subscribeEvents };