// create a express servers which has validate, save, fetch routes
// imoprt express
const fs = require('fs');
const express = require('express');
const { Doujin } = require('./node_modules/nhentai-pdf/dist/index')
const app = express();
// create a servers
const server = app.listen(8080, () => {
  console.log('Server is running at http://localhost:8080');
}
);
// make server listen to get request on route /validate
app.get('/validate', (req, res) => {
  // get the parameters in the url with name holyNumber
  const holyNumber = req.query.holyNumber;
  let query = 'https://nhentai.net/g/' + holyNumber.toString() + '/';
  // create a new doujin object
  const doujin = new Doujin(query);
  // check if the doujin is valid
  doujin.validate().then(
    // if the doujin is valid, return true
    () => {
      res.send(true);
    },
    // if the doujin is not valid, return false
    () => {
      res.send(false);
    }
  );
});

// make server listen to get request on route /fetch
app.get('/fetch', (req, res) => {
  // get the parameters in the url with name holyNumber
  const holyNumber = req.query.holyNumber;
  let query = 'https://nhentai.net/g/' + holyNumber.toString() + '/';
  // create a new doujin object
  const doujin = new Doujin(query);
  // check if the doujin is valid
  doujin.validate().then(
    // if the doujin is valid, return fetch of doujin
    () => {
      doujin.fetch().then(
        // return the json object
        (json) => {
          res.send(json);
        }
      );
    },
    // if the doujin is not valid, return false
    () => {
      res.send(false);
    }
  );
});

// make server listen to get request on route /save
app.get('/save', (req, res) => {
  // get the parameters in the url with name holyNumber
  const holyNumber = req.query.holyNumber;
  let query = 'https://nhentai.net/g/' + holyNumber.toString() + '/';
  // create a new doujin object
  const doujin = new Doujin(query);
  // check if the doujin is valid
  const valid = doujin.validate()
  // if valid doujin.save();
  if (valid) {
    const pdf = doujin.save(holyNumber.toString() + '.pdf');
    // console.log(pdf);

    res.set('Content-Type', 'application/pdf');
    // set content disposition as pdf
    res.set('Content-Disposition', 'attachment; filename="' + holyNumber.toString() + '.pdf"');
    // set content length
    res.set('Content-Length', pdf.length);
    // set cache control
    res.set('Cache-Control', 'no-cache, must-revalidate');
    // set last modified
    res.set('Last-Modified', new Date().toUTCString());
    // set etag
    res.set('ETag', '"' + pdf.md5 + '"');
    // set status code
    res.status(200);
    // return the response
    res.send(pdf);
    res.end();
  }
  else {
    res.send(false);
  }
});
