console.log('Bot is starting! (Yay!!!!)');

var Twit = require('twit')
var config = require('./config')
var T = new Twit(config)

var fs = require('fs')

var database = JSON.parse(fs.readFileSync('./dictionary.json'))
var compliments = database['words']

var num = Math.floor(Math.random() * 7)

var stream = T.stream('statuses/filter', { track: ['@starsignbot sign', '@starsignbot star sign', '@starsignbot zodiac']  })
 
stream.on('tweet', function (tweet) {
  complimentTweet(tweet.user.screen_name, tweet.id_str)
})

function complimentTweet(name, reply) {

    var tweet = {
    status: '@' + name + " " + compliments[num].word
    , in_reply_to_status_id: reply
    }
    
    T.post('statuses/update', tweet, tweeted)

}

function tweeted(err, data, response) {
    if (err) {
        console.log('Whoops! Something went wrong.')
    } else {
        console.log('It worked!')
    }
}