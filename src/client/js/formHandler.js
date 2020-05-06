function handleSubmit(event) {
    event.preventDefault()

    let data = {};
    data.city = document.getElementById("city").value;
    let date = document.getElementById("date").value;
    data.date = new Date(date);

    //Get weather from server
    fetch('http://localhost:3000/getData', {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.weather);
        document.getElementById('results').innerHTML = `${data.weather}`;
    });

    //Get image from server
    fetch(`http://localhost:3000/getImage?city=${data.city}`)
    .then(res => res.json())
    .then(data => {
        let image = document.createElement('div');
        image.innerHTML = "<img class='cityImage' src='"+data+"'>";
        image.classList.add("divImage");

        let resultsSection = document.querySelector('.resultsSection');

        if (document.querySelectorAll('.cityImage')[0] == undefined){
            resultsSection.appendChild(image);                 
            } else{
                resultsSection.replaceChild(image, document.querySelectorAll('.cityImage')[0].parentElement);
            }
    });

}

export { handleSubmit }