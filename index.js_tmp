'use strict';
const LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('./input/dataSet_short.csv');

const data = [];

let tenPopularTweets=[];
let tweetIds={};

let Popular={};

lr.on('error', function (err) {
    // 'err' contains error object
});

lr.on('line', function (line) {
    // pause emitting of lines...
    lr.pause();

    // ...do your asynchronous line processing..
    setTimeout(function () {
        // ...and continue emitting lines.

        let tweet=new Tweet(line.split(/;/));
        if (tweet.id) {
            //console.log(JSON.stringify(tenPopularTweets) + '\n');

            addToPopularWords(tweet.content);
            addToPopular(tweet);

            data.push(tweet);
        }
        lr.resume();
    }, 50);
});

lr.on('end', function () {
    // All lines are read, file is closed now.
    main();
});

function main () {
    //for (let tweet of data) {
    //    console.log(JSON.stringify(tweet));
    //}

    //Вывод информации о наиболее популярных твитах
    for (let tweet of tenPopularTweets) {
        console.log(JSON.stringify(tweet));
    }

    //частота слов
    for (let w in Popular.words) {
        console.log(w + "->" + Popular.words[w]);
    }

}

let Tweet=function (arr) {
    if (!(/^[0-9]+\s*$/.test(arr[0]))) {
        return undefined;
    }
//let headers='Tweet Id;Date;Hour;User Name;Nickname;Bio;Tweet content;Favs;RTs;Latitude;Longitude;Country;Place (as appears on Bio);Profile picture;Followers;Following;Listed;Tweet language (ISO 639-1);Tweet Url'.split(/;/);
    let content=arr[6];
    let reTweet=false;
    let reTweetedAuthor='';
    //не нашел как присвоить значениям переменных значения подстрок $1 и $2 сделал заменой
    if (/^RT /.test(content)) {
        reTweet=true;
        reTweetedAuthor=content.replace(/^"?RT \@([^:]*):\s*(.*)$/, '$1');
        content = content.replace(/^"?RT \@([^:]*):\s*(.*)$/, '$2');
    }
     this.id=arr[0];
     this.author=arr[3];
     this.nick=arr[4];
     this.content=content;
     this.rts=arr[8];
     this.country=arr[11];
     this.reTweet=reTweet;
     this.reTweetedAuthor=reTweetedAuthor;
     return this;
}

function addToPopularWords(content) {

    content.replace(/[^A-z0-9@# ]+$/, ' ');
    for (let word of content.split(/\s+/)) {
        if (Popular.words) {
            Popular.words[word]++;
        } else {
            //let map=new Map();
            let map={};
            map[word]=1;
            Popular.words=map;
        }
    }

}

function addToPopular(tweet) {

let retweets=0;

//if (!tweet.reTweet && tweet.rts) console.log('rts no retweet' + tweet.id)//return; //если это не тетви

if (!tweet.rts) return;
retweets=tweet.rts;

if (tenPopularTweets.length==0) {
    tenPopularTweets.push(tweet)
    return;
}
//если минимальный из 10 популярных запросов больше текущего ничего не делаем
if (tenPopularTweets[tenPopularTweets.length-1].rts>retweets) {
    if (tenPopularTweets.length<10) { tenPopularTweets.push(tweet) }
    return;
} 

//если число ретвитов совапло
if (tenPopularTweets[tenPopularTweets.length-1].rts==retweets) {
    if (tenPopularTweets.length<10) { 

    if (tweet.content && tenPopularTweets[0].content == tweet.content && tenPopularTweets[0].reTweetedAuthor==tweet.reTweetedAuthor) {
        //данный контент уже был ретвитнут, значит занесли в число популярных
        //автор ретвита конечно может быть другой ,важно чтобы автор твита был тот же!
        //добавляем первым элементом текущий так как он более популярен
        return;
    }
        
        tenPopularTweets.push(tweet) }
    return;
} 

//сравниваем с наиболее популярным , если текущий больше добавляем
if (tenPopularTweets[0].rts<retweets) {
    //добавляем первым элементом текущий так как он более популярен
    tenPopularTweets.unshift(tweet);
    if (tenPopularTweets.length>10) tenPopularTweets.pop();
    return;
} 

if (tenPopularTweets[0].rts==retweets) {
    if (tweet.content && tenPopularTweets[0].content == tweet.content && tenPopularTweets[0].reTweetedAuthor==tweet.reTweetedAuthor) {
        //данный контент уже был ретвитнут, значит занесли в число популярных
        //автор ретвита конечно может быть другой ,важно чтобы автор твита был тот же!
        //добавляем первым элементом текущий так как он более популярен
        return;
    }
        tenPopularTweets.unshift(tweet);
        if (tenPopularTweets.length>10) tenPopularTweets.pop();
        return;
} 


        //переформировываем массив
        let newArr=[];
        let flag=0;
        for (let t of tenPopularTweets) {
            if (t.rts<retweets && !flag && (t.content!=tweet.content || t.reTweetedAuthor!=tweet.reTweetedAuthor)) {
                newArr.push(tweet);
                flag=1;
            }
            newArr.push(t);
        }
        if (newArr.length>10) newArr.pop();
        tenPopularTweets=newArr;
}


