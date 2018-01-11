const express = require('express');
const app = express();
const googleauth = require('simple-google-openid');
const users = [{"email": "robstow94@gmail.com", "roles": ["user", "admin"]}];

app.use('/api', require('./api'));

// you can put your client ID here
app.use(googleauth("511406985315-rl37rcsg10p64jn3aejk6i52t9ior0bv.apps.googleusercontent.com"));

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

app.use(express.static('static', { extensions: ['html'] }));

const port = process.env.PORT || 8080;
app.listen(port, (err) => {
  if(err) console.log('error', err);
  else console.log(`app listening on port ${port}`);
});