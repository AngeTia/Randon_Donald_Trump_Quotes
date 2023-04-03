const newQuoteButton = document.querySelector('#js-new-quote');
const twitterButton = document.querySelector('#js-tweet');

/**addEventListener prend deux arguments
 * click: l'évènement que nous voulons écouter
 * getQuote : le nom de la fonction qui sera invoquée lorsque 'click' est déclenché sur newQuoteButton
 * */
newQuoteButton.addEventListener('click', getQuote);

// Définition de l'URL de l'API
const endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

const spinner = document.querySelector('#js-spinner');
// Définition de la fonction asynchrone qui récupère la citation
async function getQuote() {

    // remove the "hidden" class on the spinner
    spinner.classList.remove('hidden');
    // disable the quote button
    newQuoteButton.disabled = true;
    try {
        // Envoi de la requête HTTP GET à l'API
        const response = await fetch(endpoint);

        // Vérification de la réponse HTTP
        if (!response.ok) {
            // Si la réponse n'est pas valide, on lance une exception
            throw Error(response.statusText);
        }

        // Conversion de la réponse HTTP en objet JSON
        const json = await response.json();

        // Affichage de l'objet JSON dans la console
        displayQuote(json.message);
        // Permet tweeter une citationsur notre mur
        setTweetButton(json.message);
    } catch (err) {
        // Si une erreur se produit, on l'affiche dans la console
        console.log(err);

        // Affichage d'une alerte pour indiquer l'échec de la récupération de la citation
        alert('Vérifiez votre connexion pour récupérer les citations!');
    } finally {
        // enable the quote button
        newQuoteButton.disabled = false;
        // add the "hidden" class back again
        spinner.classList.add('hidden');
    }
}

// Affichage des citations sur la page
function displayQuote (quote) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
}

function setTweetButton(quote) {
    twitterButton.setAttribute('href', `https://twitter.com/share?text=${quote} - Donald Trump`);
}