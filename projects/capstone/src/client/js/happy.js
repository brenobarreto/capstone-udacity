function happy(mood){
    let main = document.querySelector('.main');
    if (mood == 'yes') {
        main.classList.remove('sad');
        main.classList.add('happy');
    } else {
        main.classList.remove('happy');
        main.classList.add('sad');
    }
}

export { happy }