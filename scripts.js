// Function to show the specified section and hide others
function showSection(sectionId) {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('ppiRepoForm').style.display = 'none';
    document.getElementById('policeTowForm').style.display = 'none';

    if (sectionId === 'main') {
        document.getElementById('mainContent').style.display = 'block';
    } else {
        document.getElementById(sectionId + 'Form').style.display = 'block';
    }
}

// Function to handle form submission
function submitForm(formType, event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const entry = document.createElement('div');
    entry.className = 'entry';

    for (let [key, value] of formData.entries()) {
        const p = document.createElement('p');
        p.textContent = `${key}: ${value}`;
        entry.appendChild(p);
    }

    const logsContainer = document.getElementById(formType + 'Logs');
    logsContainer.insertBefore(entry, logsContainer.firstChild);

    form.reset();
    showSection('main');
}

// Function to update the tow company information based on the selected company
function updateTowCompanyInfo() {
    const towCompany = document.getElementById('towCompany').value;
    const infoDiv = document.getElementById('towCompanyInfo');
    
    if (towCompany === "G&W Towing") {
        infoDiv.innerHTML = "Address: 965 W 18th St, Costa Mesa CA<br>Phone: 949-642-1252";
    } else if (towCompany === "Southside Towing") {
        infoDiv.innerHTML = "Address: 1643 Placentia Ave, Costa Mesa CA<br>Phone: 949-631-8698";
    } else {
        infoDiv.innerHTML = "";
    }
}

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

// Function to parse SVS content and populate the form fields
function parseSVSContent(content) {
    const lines = content.split('\n');
    let licenseNum, state, year, vin, make, model, style, color, towCompany;

    for (const line of lines) {
        if (line.includes('LIC/')) {
            const parts = line.split(' ');
            for (const part of parts) {
                if (part.startsWith('LIC/')) licenseNum = part.split('/')[1];
                if (part.startsWith('LIS/')) state = part.split('/')[1];
                if (part.startsWith('LIY/')) year = part.split('/')[1];
            }
        }
        if (line.includes('VIN/')) {
            const vehicleInfoParts = line.split(' ');
            if (vehicleInfoParts.length >= 6) {
                year = vehicleInfoParts[0];
                make = vehicleInfoParts[1];
                model = vehicleInfoParts[2];
                style = vehicleInfoParts[3];
                color = vehicleInfoParts[4];
                vin = vehicleInfoParts[5].split('/')[1];
            }
        }
        if (line.includes('MIS/')) {
            const misInfo = line.split('MIS/')[1].trim();
            towCompany = findBestMatch(misInfo, towCompanies);
        }
    }

    document.getElementById('license').value = licenseNum || '';
    document.getElementById('state').value = state || '';
    document.getElementById('year').value = year || '';
    document.getElementById('vin').value = vin || '';
    document.getElementById('make').value = make || '';
    document.getElementById('model').value = model || '';
    document.getElementById('color').value = color || '';
    document.getElementById('body').value = style || '';

    if (towCompany) {
        document.getElementById('towCompany').value = towCompany;
        updateTowCompanyInfo();
    }
}

// Show main content by default
showSection('main');
