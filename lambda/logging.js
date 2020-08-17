exports.handler = async event => {
  console.log(event.headers["client-ip"], event.body);
  return {
    statusCode: 200
  }
}