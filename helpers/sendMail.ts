import nodemailer from "nodemailer"

export const sendMail = (email, subject, html) => {
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "ducanh200574@gmail.com",
            pass: "kqvd wrwa rcqd abhf"
        }
    });
    var mailOptions = {
        from:"ducanh200574@gmail.com",
        to: email, 
        subject: subject,
        html: html
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        } else {
          console.log(response);
        }
    });
}