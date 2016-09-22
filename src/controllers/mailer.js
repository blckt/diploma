const mailer = require('nodemailer');
const transporter = mailer.createTransport('smtps://surfitstudio@gmail.com:29Lx4dWbM70PR0GF1tJ5h5e82SA5aF6G@smtp.gmail.com');

module.exports = function (email, confirmLink) {
    const confirm = confirmLink;//eslint-disable no-unused-vars
    const mailOptions = {
        from: '"302-Scheduler"<surfitstudio@gmail.com>',
        to: email,
        text: `Follow this link to get a new password :  ${confirmLink}`,
        html: `<h1>Follow this link to get a new password :  ${confirmLink}</p>`
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err, info);
        }
        console.log(`Message send: ${info.response}`);
    });
};