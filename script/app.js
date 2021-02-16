const continents = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
},
endpoint = 'https://restcountries.eu/rest/v2',
LOCAL_STORAGE_KEY = 'countries';

let countryHolder, regionRadioButtons;

const saveCountry = (alpha2Code, add) => {
    const savedCountries = localStorage.getItem(LOCAL_STORAGE_KEY); // Hier een key gebruiken maakt het dynamisch voor hergebruikbaarheid
    const selectedRegion = document.querySelector('.js-region-radio:checked').value;
    console.log({savedCountries});

    if (!savedCountries && add) {
        
        const initialData = {
            [selectedRegion]: {[alpha2Code]: true}
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
        return; // Stap uit deze functie, het is afgehandeld
    } else {

    }

    // TODO: wat als er nog een land toegevoegd wordt? binnen zelfde continent
    

    // TODO: wat als we in een ander continent landen gaan selecteren


    // TODO: wat als je een land weer deselecteren?


}

const listenToSavedCountries = () => {
    const countries = document.querySelectorAll('.js-country-input');
    console.log({countries});

    for (const country of countries) {
        country.addEventListener('change', function() {
            saveCountry(this.id, this.checked);
        });
    }
}

const renderCountries = (countries) => {
    let countriesHTML = '';

    for (const {alpha2Code, flag, name, nativeName} of countries) {
        // Object destructuring
        // ! We kunnen nu wel niet meer aan ons originele object
        countriesHTML += `
            <section class="c-country">
                <input class="c-country__input js-country-input o-hide-accessible" type="checkbox" name="country" id="${alpha2Code}">
                <label class="c-country__label" for="${alpha2Code}">
                    <div class="c-country__flag-holder">
                        <img class="c-country__flag" src="${flag}" alt="The flag of ${name}.">
                    </div>
                    <div class="c-country__details">
                        <h2 class="c-country__name">${name}</h2>
                        <span class="c-country__native-name">${nativeName}</span>
                    </div>
                </label>
            </section>
        `;       
    }

    countryHolder.innerHTML = countriesHTML;
    listenToSavedCountries();
}

const getCountries = async (continent) => {
    const data = await get(`${endpoint}/region/${continent}`)

    renderCountries(data);
}

const enableNavigation = () => {
    for (const radio of regionRadioButtons) {
        radio.addEventListener('change', function() {
            getCountries(continents[this.value]);
        });
    }
}

const getDOMElements = () => {
    countryHolder = document.querySelector('.js-countries');
    regionRadioButtons = document.querySelectorAll('.js-region-radio');

    getCountries(continents.africa);
    enableNavigation();
}

document.addEventListener('DOMContentLoaded', () => {
    getDOMElements();
});