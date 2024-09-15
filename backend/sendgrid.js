const sendGrid = require('@sendgrid/mail')

sendGrid.setApiKey(apikey)

 async function sendEmail(){

    const messageData = {
        to:"kevic50m@gmail.com",
        from:"kevic100@hotmail.com",
        subject:"test email",
        text: "this is a test",
        html:"<p>This is a tests</p>"

    };

    try{
        await sendGrid.send(messageData);
        console.log("message send")
    }

    catch (err){
        console.log(err)
    }

}