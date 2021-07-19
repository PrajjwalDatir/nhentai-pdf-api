# nhentai-pdf

### API to be used for getting the holy numbers in pdf 🌚 Welcome to the Darkness 

## Routes Availables:
  ### validate:
    it checks if the doujin exists.
    returns boolean
  ### fetch:
    returns a json object
  ### save:
    returns a pdf


## Usage:

### validate:
```javascript
// make a request to the server using axios
axios.get('/validate?holyNumber=177013').then(function(response) {
  // do something with the response
  console.log(response);
});
```

### fetch:
```javascript
// make a request to the server using axios
axios.get('/fetch?holyNumber=177013').then(function(response) {
  // do something with the response
  console.log(response);
});
```

### save:
```javascript
// make a request to the server using axios
axios.get('/save?holyNumber=177013').then(function(response) {
  // do something with the response
  console.log(response);
});
```
