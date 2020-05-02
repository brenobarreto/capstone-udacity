// let text = "Today is a beautiful day."

// async function getSentiment(){
//     const response = await fetch(`https://api.aylien.com/api/v1/sentiment?text=${text}&mode=tweet`, {
//         method: 'POST',
//         headers: {
//             'X-AYLIEN-TextAPI-Application-ID': process.env.AYLIEN_API_ID,
//             'X-AYLIEN-TextAPI-Application-Key': process.env.AYLIEN_API_KEY
//         }
//     });
//     let sentiment = response.json();
//     console.log(sentiment);
//     console.log("test");
// }

// getSentiment();

let sentimentResponse = {
    'polarity': 'test json response',
    'subjectivity': '',
    'message': 'this is a message'
}

module.exports = sentimentResponse