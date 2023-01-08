// const { response } = require('express');
const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');
const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
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

module.exports = { sendBasicEmail, updateTicket, fetchPendingEmails, createNotification };