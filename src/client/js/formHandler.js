function handleSubmit(event) {
    event.preventDefault()

    let data = {};
    data.city = document.getElementById("city").value;
    let date = document.getElementById("date").value;
    data.date = new Date(date);
    console.log(data.date);

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
        document.getElementById('results').innerHTML = `${data}`;
    });
        
}

export { handleSubmit }