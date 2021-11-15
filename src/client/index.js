import "core-js/stable";
import "regenerator-runtime/runtime";
import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
import { postData } from "./js/formHandler";
import { isValidURL } from "./js/formHandler";
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'


alert("I exist!");

export {
    checkForName,
    handleSubmit,
    postData,
    isValidURL
}
