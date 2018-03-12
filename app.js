const restler = require('restler');
const fs = require('fs');
const express = require('express');
const hbs = require('express-handlebars');

let app = express();

app.get('/', (req, res) => {
  getAllCards().then((cards) => {
    let images = [];
    cards.cards.forEach(element => {
      images.push(element.imageUrlHiRes);
    });
    res.send(images);
  });
});

app.listen(3000, () => console.log('Example App listening on port 3000!'));






function getAllCards() {
  return new Promise((resolve, reject) => {
    let url = 'https://api.pokemontcg.io/v1/cards';
    let options = {
  
    };
  
    restler.get(url, options)
    .on('complete', (result) => {
      resolve(result);
    });
  });
}
