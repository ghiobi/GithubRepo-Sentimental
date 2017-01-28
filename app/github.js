let request = require('request');

class ExtractGithub{

  constructor(url){
    let parts = url.replace('//', '/').split('/');

    this.owner = parts[2];
    this.repo = parts[3];

  }

  extract(callback){
    let text = '';
    let vm = this;

    //Extract issues
    request(vm.url('https://api.github.com/repos/' + this.owner + '/' + this.repo + '/issues'), function (err, response, body) {

      let result = JSON.parse(body);

      for(let i = 0; i < result.length; i++){
        text += ' ' + result[i].body;
      }

      request(vm.url('https://api.github.com/repos/' + this.owner + '/' + this.repo + '/comments'), function (err, response, body) {

        let result = JSON.parse(body);

        for(let i = 0; i < result.length; i++){
          text += ' ' + result[i].body;
        }

        callback(err, text);

      });
    })
  }

  clean(s){
    return s.replace(/(\r\n|\n|\r)/gm, '');
  }

  url(url){
    return {
      url: url,
      method: 'GET',
      headers: {'user-agent': 'node.js'}
    }
  }

}

module.exports = ExtractGithub;