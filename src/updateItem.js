const AWS = require("aws-sdk")

const updateItem = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient()
  const {itemStatus} = JSON.parse(event.body)
  const { id } = event.pathParameters;
  let item;

  try {
    await dynamoDB.update({
      TableName: "ItemTable",
      Key: {id},
      UpdateExpression: 'set itemStatus = :itemStatus',
      ExpressionAttributeValues: {
        ':itemStatus': itemStatus
      },
      ReturnValues: "ALL_NEW"
    }).promise();

  } catch (error) {
    console.log(error)
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: "Item Updated!"
    })
  }
}

module.exports = {
  handler: updateItem
} 