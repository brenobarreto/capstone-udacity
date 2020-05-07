function formEventListener(){
    let travelPlace = document.querySelector('.travelPlace');
    travelPlace.addEventListener('click', () => {
        handleSubmit(event);
    });
}

function formSubmit(){
    let formSubmit = document.querySelector('.formSubmit');
    formSubmit.addEventListener('click', () => {
        handleSubmit(event);
    });
}

export { formEventListener };
export { formSubmit };