const button = document.getElementById('button');
const count = document.getElementById('words-count');
const results = document.getElementById('result');
const entropy = document.getElementById('entropy');
const storage = window.localStorage;

const DICTIONARY_KEY = 'dictionary.txt';

/**
 * Prepares dictionary of words, downloads it if necessary
 */
async function prepareDictionary() {
    if (!storage.hasOwnProperty(DICTIONARY_KEY)) {
        const url = window.location.origin + '/diceware-generator/' + DICTIONARY_KEY;
        const response = await fetch(url);
        const body = await response.text();
        const data = body.split('\n');
        storage.setItem(DICTIONARY_KEY, JSON.stringify(data));
        return data;
    }
    const data = storage.getItem(DICTIONARY_KEY);
    return JSON.parse(data);
}

/**
 * Generates and inits an array with security random values
 *
 * @param size of array to generate
 * @returns {Uint16Array}
 */
function generate(size) {
    const array = new Uint16Array(size);
    window.crypto.getRandomValues(array);
    return array;
}

button.onclick = function () {
    prepareDictionary().then(dict => {
        if (dict.length === 0) {
            console.debug('Dictionary is inaccessible');
            return;
        }
        let words = [];
        generate(count.value).forEach(value => {
            const index = Math.floor(value * dict.length / 65536);
            words.push(dict[index]);
        });
        const wordsEntropy = Math.round(Math.log2(dict.length) * words.length);
        // Update UI values
        results.innerText = words.join(' ');
        entropy.innerText = wordsEntropy.toString() + ' bits';
    });
};
