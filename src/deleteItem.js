const AWS = require("aws-sdk")

const deleteItem = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient()
  const { id } = event.pathParameters;
  let item;

  try {
   await dynamoDB.delete({
      TableName: "ItemTable",
      Key: { id }
    }).promise();
  } catch (error) {
    console.log(error)
  }
  return {
    statusCode: 200,
    body: JSON.stringify({msg: "Item deletado com sucesso!"})
  }
}

module.exports = {
  handler: deleteItem
} 