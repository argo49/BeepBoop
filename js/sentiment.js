//get the object
//courtesy of taewook kang

var moodTags = {
    "positive": [ "excellent", "great", "fine", "pleasing", "capital", "acceptable", "pleasant", "worthy", "first-class", "divine", "splendid", "satisfactory", "superb", "enjoyable", "awesome", "dope", "world-class", "admirable", "agreeable", "super", "pleasurable", "wicked", "first-rate", "tiptop", "bitchin'"],
    "negative": ["inferior", "poor", "inadequate", "pathetic", "faulty", "unsatisfactory", "mediocre", "defective", "second-class", "deficient", "imperfect", "second-rate", "shoddy", "low-grade", "erroneous", "substandard"],
    "neutral":  ["unbiased", "impartial", "disinterested", "even-handed", "dispassionate", "sitting on the fence", "uninvolved", "noncommittal"]
};

var sentiment;

function getSentiment(sentObj){
    var mood = sentObj.sentiment-text;
    var weight = sentObj.sentiment-score;

    switch (mood) {
        case 'positive':
            sentiment = moodTags.positive[Math.floor(Math.random()*moodTags.positive.length];
            break;
        case 'negative':
            sentiment =moodTags.negative[Math.floor(Math.random()*moodTags.negative.length];
            break;

        case "neutral":
            sentiment  = moodTags.neutral[Math.floor(Math.random()*moodTags.neutral.length];
            break;

        default:
            //play a random song
            break;

    }


}
