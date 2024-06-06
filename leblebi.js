const { google } = require('googleapis');
const { readFileSync } = require('fs');

async function getAccessToken() {
  const keyFilePath = 'googlekey.json'; // Replace with the path to your JSON file
  const keyFileContent = readFileSync(keyFilePath);
  const credentials = JSON.parse(keyFileContent);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  const accessToken = await auth.getAccessToken();
  return accessToken;
}

getAccessToken().then(token => {
  console.log('Access Token:', token);
}).catch(error => {
  console.error('Error obtaining access token:', error);
});
