var Twitter = require('twitter');
const datapay = require('datapay');

console.log('This is just a dockerized version of work done by:');
console.log(' https://github.com/unwriter/datapay');
console.log(' https://github.com/desmondmorris/node-twitter');

// Your Bitcoin SV Private Key (use a throwaway address for security)
var privateKey = process.env.BSV_PK;

// Your Twitter account ID - https://www.wikihow.com/Find-Your-User-ID-on-Twitter
var twitter_account_id = process.env.TW_MYID;

// Your Twitter API credentials - https://developer.twitter.com/en/docs/tweets/filter-realtime/guides/basic-stream-parameters.html
var twitter_consumer_key = process.env.TW_CKEY;
var twitter_consumer_secret = process.env.TW_CSEC;
var twitter_access_token_key = process.env.TW_TKEY;
var twitter_access_token_secret = process.env.TW_TSEC;
var twitter_handle_filter = (process.env.HANDLE==undefined?'':process.env.HANDLE);

if (!privateKey || !twitter_account_id || !twitter_consumer_key || !twitter_consumer_secret || !twitter_access_token_key ||!twitter_access_token_secret) {
  console.log('Usage:');
  console.log('docker run -d \\');
  console.log(' -e BSV_PK=Your Bitcoin SV Private Key (use a throwaway address for security) \\');
  console.log(' -e TW_MYID=Your Twitter account ID - https://www.wikihow.com/Find-Your-User-ID-on-Twitter \\');
  console.log(' -e TW_CKEY=Your Twitter API credentials - https://developer.twitter.com/en/docs/tweets/filter-realtime/guides/basic-stream-parameters.html \\');
  console.log(' -e TW_CSEC= consumer_secret \\');
  console.log(' -e TW_TKEY= access_token_key \\');
  console.log(' -e TW_TSEC= access_token_secret \\');
  console.log(' -e HANDLE= twitter handle string, if defined, only tweets containing this will be pushed to blockchain, eg.: $BSV \\');
  console.log(' breign/twitter2bitcoin:latest');
  process.exit(0);
};


var client = new Twitter({
  consumer_key: twitter_consumer_key,
  consumer_secret: twitter_consumer_secret,
  access_token_key: twitter_access_token_key,
  access_token_secret: twitter_access_token_secret
});

var stream = client.stream('statuses/filter', {follow: twitter_account_id });
stream.on('data', function(event) {
//    console.log(event);
    if ( event.text.indexOf(twitter_handle_filter) != -1 ) {
        console.log("\nSending to blockchain: "+event.text);
        datapay.send({
          data: ["0x6d02", "twitter.com/"+event.user.screen_name+"/status/"+event.id_str+"\r\n"+event.text],
          pay: { key: privateKey }
        });
    }
});

stream.on('error', function(error) {
  throw error;
});

process.on('SIGINT', function() {
    process.exit();
});
