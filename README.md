# twitter2blockchain

#### Using this, you can decide to put your tweet also on the immutable blockchain automatically.

#### It is based on the original work of https://twitter.com/amritabithi

#### You need to create twitter application first, to gain Twitter API access via https://developer.twitter.com/en/docs/tweets/filter-realtime/guides/basic-stream-parameters.html


## configuration
you can set variables in file directly, or you can pass your configuration via Environment vars

* **BSV_PK**=Your Bitcoin SV Private Key (use a throwaway address for security)
* **TW_MYID**=Your Twitter account ID - https://www.wikihow.com/Find-Your-User-ID-on-Twitter
* **TW_CKEY**=Your Twitter API credentials - https://developer.twitter.com/en/docs/tweets/filter-realtime/guides/basic-stream-parameters.html
* **TW_CSEC**= consumer_secret Twitter API credentials
* **TW_TKEY**= access_token_key Twitter API credentials
* **TW_TSEC**= access_token_secret Twitter API credentials
* **HANDLE**='$BSV' twitter handle string, if defined, only tweets containing this string will be pushed to blockchain, eg.: $BSV


### runing on your host with node

$`npm install --save datapay && npm install twitter`

$`nodejs twitter.js`

### running with docker

	docker pull breign/twitter2bitcoin:latest && docker run -d \
	 -e BSV_PK=Your Bitcoin SV Private Key (use a throwaway address for security) \
	 -e TW_MYID=Your Twitter account ID - https://www.wikihow.com/Find-Your-User-ID-on-Twitter \
	 -e TW_CKEY=Your Twitter API credentials - https://developer.twitter.com/en/docs/tweets/filter-realtime/guides/basic-stream-parameters.html \
	 -e TW_CSEC= consumer_secret Twitter API credentials \
	 -e TW_TKEY= access_token_key Twitter API credentials \
	 -e TW_TSEC= access_token_secret Twitter API credentials \
	 -e HANDLE='$BSV' twitter handle string, if defined, only tweets containing this string will be pushed to blockchain, eg.: $BSV \
	 breign/twitter2bitcoin:latest
