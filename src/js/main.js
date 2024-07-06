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
        if (key === 'hold') {
            value = value === 'on' ? 'Yes' : 'No';
        }
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

// Show main content by default
showSection('main');