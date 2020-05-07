function calculateDuration(startDate, endDate){
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInTime = end - start;
    const durationInDays = Math.round(durationInTime / (1000 * 3600 * 24));

    console.log(durationInDays);

    let durationText = document.createElement('H3');
    durationText.textContent = "Length of your trip: " + durationInDays + " days.";

    let tripDurationSection = document.querySelector('.tripDuration');

    if (document.querySelectorAll('.tripDuration')[0] == undefined){
        tripDurationSection.appendChild(durationText);                 
        } else{
            tripDurationSection.replaceChild(durationText, document.querySelector('.tripDuration').firstChild);
        }
}

export { calculateDuration };