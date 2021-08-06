var aws = require('aws-sdk');
var ses = new aws.SES({region: 'us-west-2'});
exports.handler = (event, context, callback) => {
    addToDB(event.emailAddress, event.name, event.Message)
    sendMail(event.emailAddress, event.name, event.Message)
};

async function addToDB(emailAddress, name, message) {
  
  const documentClient = new aws.DynamoDB.DocumentClient({region:'us-west-2'})
  
  const params = {
    TableName: "MkFormTable",
    Item: {
      email: emailAddress, 
      name: name,
      message: message
    }
  }
  
  try {
    const data = await documentClient.put(params).promise()
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}

async function sendMail(emailAddress, name, message) {
  const emailParams = {
        Destination: {
          ToAddresses: [emailAddress],
        },
        Message: {
          Body: {
            Text: { Data: message },
          },
          Subject: { Data: "Hello " + name },
        },
        Source: "daniel.shteremberg0@gmail.com",
  };
      
  try {
        let key = await ses.sendEmail(emailParams).promise();
        console.log("MAIL SENT SUCCESSFULLY!!");      
  } catch (e) {
        console.log("FAILURE IN SENDING MAIL!!", e);
      }  
  return;
}