import { handleSubmit } from './js/formHandler'

import './styles/base.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/results.scss'
import './styles/footer.scss'

document.addEventListener('DOMContentLoaded', () => {

    let formSubmit = document.querySelector('.formSubmit');

    formSubmit.addEventListener('click', () => {
        handleSubmit(event);
    });

});

export { handleSubmit };