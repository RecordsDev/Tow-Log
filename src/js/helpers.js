// Function to paste SVS content from clipboard and parse it
async function pasteSVSContent() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('svsTextbox').value = text;
        parseSVSContent(text);
    } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
        alert('Unable to access clipboard. Please ensure you have given permission and try again.');
    }
}

// Levenshtein distance function
function levenshteinDistance(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

// Function to find the best match for the tow company name
function findBestMatch(input, companies) {
    let bestMatch = null;
    let bestScore = Infinity;

    const words = input.toLowerCase().split(/\s+/);

    for (let company of companies) {
        let companyWords = company.toLowerCase().split(/\s+/);

        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j <= words.length; j++) {
                let inputSubstring = words.slice(i, j).join(' ');
                let score = levenshteinDistance(inputSubstring, companyWords.join(' '));

                let normalizedScore = score / Math.max(inputSubstring.length, company.length);

                if (normalizedScore < bestScore) {
                    bestScore = normalizedScore;
                    bestMatch = company;
                }
            }
        }
    }

    if (bestScore > 0.4) {
        return null;
    }

    return bestMatch;
}

// List of predefined tow companies
const towCompanies = [
    "G&W Towing",
    "Southside Towing"
    // Add more companies here
];