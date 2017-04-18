'use strict';
const LineByLineReader = require('line-by-line'),
lr = new LineByLineReader('./input/dataSet_short.csv');

const data = [];

let tenPopularTweets = [];
let tenPopular = {};

let tweetIds = {};

let Popular = {};
Popular.words = {};

lr.on('error', function(err) {
    // 'err' contains error object
});

lr.on('line', function(line) {
    // pause emitting of lines...
    lr.pause();

    // ...do your asynchronous line processing..
    setTimeout(function() {
        // ...and continue emitting lines.

        let tweet = new Tweet(line.split(/;/));
        if (tweet.id) {
            //console.log(JSON.stringify(tenPopularTweets) + '\n');

            addToPopularWords(tweet.content);
            addToPopular(tweet);

            data.push(tweet);
        }
        lr.resume();
    }, 50);
});

lr.on('end', function() {
    // All lines are read, file is closed now.
    main();
});

function main() {

    //tenPopular хранит 10 популярных твитов в неотсортирванном виде, сортируем и выводим
    let temp = [];
    for (let content in tenPopular) {
        let tweet = tenPopular[content];
        temp.push(tweet);
    }
    temp.sort(function(a, b) {
        return b.rts - a.rts;
    });
    console.log(JSON.stringify(temp));

    //частота слов. число слов неизвестно заранее потому необходимо хранить все значения

    var words = [];
    for (var word in Popular.words) {
        let count = Popular.words[word];
        words.push([word, count]);
    }

    words.sort(function(a, b) {
        return b[1] - a[1];
    });

    for (let i = 0; i < 10; i++) {
        let[word, count] = words[i];
        console.log(word + "->" + count);
    }

}

let Tweet = function(arr) {
    if (!(/^[0-9]+\s*$/.test(arr[0]))) {
        return undefined;
    }
    //let headers='Tweet Id;Date;Hour;User Name;Nickname;Bio;Tweet content;Favs;RTs;Latitude;Longitude;Country;Place (as appears on Bio);Profile picture;Followers;Following;Listed;Tweet language (ISO 639-1);Tweet Url'.split(/;/);
    let content = arr[6];
    let reTweet = false;
    let reTweetedAuthor = '';
    //не нашел как присвоить значениям переменных значения подстрок $1 и $2 сделал заменой
    if (/^RT /.test(content)) {
        reTweet = true;
        reTweetedAuthor = content.replace(/^"?RT \@([^:]*):\s*(.*)$/, '$1');
        content = content.replace(/^"?RT \@([^:]*):\s*(.*)$/, '$2');
    }
    this.id = arr[0];
    this.author = arr[3];
    this.nick = arr[4];
    this.content = content;
    this.rts = arr[8];
    this.country = arr[11];
    this.reTweet = reTweet;
    this.reTweetedAuthor = reTweetedAuthor;
    return this;
}

function addToPopularWords(content) {
    if (!content) return;
    content.replace(/[^A-z0-9@# ]+$/, ' ');
    for (let word of content.split(/\s+/)) {
        let lWord = word.toLowerCase();
        if (!/^[A-z]+$/i.test(lWord)) {
            continue;
        }
        if (Popular.words[lWord]) {
            Popular.words[lWord] += 1;
        } else {
            Popular.words[lWord] = 1;
        }
    }

}

function addToPopular(tweet) {
    if (!tweet.rts) return;
    let search = tweet.reTweetedAuthor + ' ' + tweet.content
    if (tenPopular[search]) {
        if (tweet.rts != tenPopular[search].rts) {
            console.log('error in retweets ID: ' + tweet.id);
        }
        return;
    } else {
        tenPopular[search] = tweet;
    }
    if (tenPopular.length > 10) {
        let temp = [];
        for (let content in tenPopular) {
            let tweet = tenPopular[content];
            temp.push([content, tweet]);
        }
        temp.sort(function(a, b) {
            return b[1].rts - a[1].rts;
        });
        delete tenPopular[temp[10]];
    }
}