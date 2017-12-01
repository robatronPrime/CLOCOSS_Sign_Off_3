const express = require('express');
const app = express();
 
const googleauth = require('simple-google-openid');
 
// you can put your client ID here
app.use(googleauth(process.env.GOOGLE_CLIENT_ID));
 
// you can put your realm here instead of 'jwt'
// return 'Not authorized' if we don't have a user
app.use('/api', googleauth.guardMiddleware({realm: 'jwt'}));
 
app.get('/api/protected', function (req, res) {
  if (req.user.displayName) {
    res.send('Hello ' + req.user.displayName + '!');
  } else {
    res.send('Hello stranger!');
  }
 
  console.log('successful authorized request by ' + req.user.emails[0].value);
});
 
// this will serve the HTML file shown below
app.use(express.static('static'));
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});