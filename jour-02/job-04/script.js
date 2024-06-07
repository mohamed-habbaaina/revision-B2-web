const str = "sport alimentation repos";

function separateWords(inputString) {
    let word1 = '';
    let word2 = '';
    let word3 = '';
    let currentWord = '';
    let wordCount = 1;
    let i = 0;

    while (true) {
        const char = inputString[i];

        if (char === ' ' || char === undefined) {
            if (wordCount === 1) {
                word1 = currentWord;
            } else if (wordCount === 2) {
                word2 = currentWord;
            } else if (wordCount === 3) {
                word3 = currentWord;
            }
            currentWord = '';
            wordCount++;

            if (char === undefined) {
                break;
            }
        } else {
            currentWord += char;
        }
        i++;
    }

    return { word1, word2, word3 };
}

function displaySections(str) {
    const words = separateWords(str);

    document.getElementById('section1').textContent = words.word1;
    document.getElementById('section2').textContent = words.word2;
    document.getElementById('section3').textContent = words.word3;
}

displaySections(str);
