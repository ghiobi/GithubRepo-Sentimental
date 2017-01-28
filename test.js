let ExtractGithub = require('./app/github');
let Watson = require('./app/watson');

new ExtractGithub('https://github.com/twbs/bootstrap').extract(function (err, result) {
  new Watson().analyze(result, function(err, sentiment){
    console.log(sentiment);
  });
});