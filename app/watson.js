let request = require('request');
let AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

class Watson{

  constructor(){
    this.request = request;
    this.watson = new AlchemyLanguageV1({ api_key: '836929e582b56ff138ef55896dc5efb959fdd50b'});
  }

  analyze(string, callback){
    this.watson.sentiment({
      text: string
    }, function (err, result) {
      if (err){
        callback(err, null);
      } else {
        callback(err, result.docSentiment);
      }
    })
  }

}

module.exports = Watson;
