function handleSubmit(event) {
    event.preventDefault()

    let data = {};
    data.city = document.getElementById("city").value;
    data.date = document.getElementById("date").value;
    console.log(data);

    console.log("::: Form Submitted :::");
    fetch('http://localhost:3000/getData', {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => { 
        console.log(data);
        document.getElementById('results').innerHTML = 
            `Polarity: ${data.polarity} | Subjectivity: ${data.subjectivity}`;
    });
        
}

export { handleSubmit }