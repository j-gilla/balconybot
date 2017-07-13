const fs = require('fs');
const path = require('path');
const Twit = require('Twit');
const config = require(path.join(__dirname, 'config.js'));

const tweet = new Twit(config);

function pickRandomImage(){
  let images = [
    'one.jpg',
    'two.jpg',
    'three.jpg',
    'four.jpg'
  ];
  return images[Math.floor(Math.random() * images.length)];
};



function uploadRandomImage(){
  console.log('Opening image...')
  let imagePath = path.join(__dirname, '/assets/' + pickRandomImage()),
  b64content = fs.readFileSync(imagePath, { encoding: 'base64' });

  console.log('Uploading an image...');

  tweet.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if(err) {
      console.log('ERROR');
      console.log(err);
    }
    else{
      console.log('Uploaded an image!');

      tweet.post('statuses/update', {
        status: new Array(data)
      },
      function(err, data, response) {
        if (err) {
          console.log("Final error");
          console.log(err);
        } else {
          console.log("Posted an image")
        }
      }
    );
  }
});
}

setInterval(
  uploadRandomImage,
  10000
);





//

// tweet.post('statuses/update', { status: 'All watched over by balconies of love and grace'}, function(err, data,response){
//   console.log(data);
// });
