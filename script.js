const button = document.getElementById('button');
const count = document.getElementById('words-count');
const results = document.getElementById('result');
const entropy = document.getElementById('entropy');
const storage = window.localStorage;

const DICTIONARY_KEY = 'dictionary.txt';
const STORAGE_KEY = 'dict';

/**
 * Prepares dictionary of words, downloads it if necessary
 */
async function prepareDictionary() {
    if (!storage.hasOwnProperty(STORAGE_KEY)) {
        let url = window.location.origin + '/' + DICTIONARY_KEY;
        if (window.location.href.endsWith('index.html')) {
            url = window.location.href.replace('index.html', DICTIONARY_KEY);
        }
        const response = await fetch(url);
        const body = await response.text();
        const data = body.split('\n');
        storage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    const data = storage.getItem(STORAGE_KEY);
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

button.onclick = async function () {
    const dict = await prepareDictionary()
    if (dict.length <= 1) {
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
};
