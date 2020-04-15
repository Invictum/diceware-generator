const button = document.getElementById('button');
const count = document.getElementById('words-count');
const size = document.getElementById('min-word-size');
const results = document.getElementById('result');
const wordsEntropyElement = document.getElementById('words-entropy');
const lettersEntropyElement = document.getElementById('letters-entropy');
const storage = window.localStorage;

const DICTIONARY_KEY = 'dictionary.txt';

async function prepareDictionary() {
    if (!storage.hasOwnProperty(DICTIONARY_KEY)) {
        const url = window.location.origin + '/pass-phrase/dictionary.txt';
        const response = await fetch(url);
        const body = await response.text();
        const data = body.split('\n');
        storage.setItem(DICTIONARY_KEY, JSON.stringify(data));
        return data;
    }
    const data = storage.getItem(DICTIONARY_KEY);
    return JSON.parse(data);
}

function getRandomInt(max) {
    const number = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return Math.floor(number / 4294967296 * max);
}

button.onclick = function () {
    prepareDictionary().then(dict => {
        if (dict.length === 0) {
            console.debug('Dictionary is inaccessible');
            return;
        }
        let words = [];
        while (words.length < count.value) {
            const word = dict[getRandomInt(dict.length)];
            if (word.length < size.value) {
                continue;
            }
            words.push(word);
        }
        results.innerText = words.join(' ');
        const wordsEntropy = Math.round(Math.log2(dict.length) * words.length);
        wordsEntropyElement.innerText = wordsEntropy.toString() + ' bits';
        const lettersEntropy = Math.round(4.7 * words.join().length);
        lettersEntropyElement.innerText = lettersEntropy.toString() + ' bits';
    });
};
