const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
app.use(compression());

const dir = __dirname.replace('server', '');

app.use(express.static(dir + '/dist'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(dir + 'dist/index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('Example app listening on port '+port)
})
