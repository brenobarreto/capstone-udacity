import { happy } from "./happy";

function handleSubmit(event) {
    event.preventDefault()

    let tweet = {};
    tweet.value = document.getElementById("tweet").value;
    console.log(tweet);

    console.log("::: Form Submitted :::");
    fetch('http://localhost:3000/getSentiment', {
        method: "POST",
        body: JSON.stringify(tweet),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => { 
        console.log(data);
        document.getElementById('results').innerHTML = 
            `Polarity: ${data.polarity} | Subjectivity: ${data.subjectivity}`;
        if (data.polarity == 'positive'){
            Client.happy('yes');
        } else {
            Client.happy('no')
        };
    });
        
}

export { handleSubmit }