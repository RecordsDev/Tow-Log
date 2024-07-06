// Function to show the specified section and hide others
function showSection(sectionId) {
    const mainContent = document.getElementById('mainContent');
    const ppiRepoForm = document.getElementById('ppiRepoForm');
    const policeTowForm = document.getElementById('policeTowForm');

    // Hide all sections
    mainContent.style.display = 'none';
    if (ppiRepoForm) ppiRepoForm.style.display = 'none';
    if (policeTowForm) policeTowForm.style.display = 'none';

    if (sectionId === 'main') {
        mainContent.style.display = 'block';
    } else {
        let formContainer = document.getElementById(sectionId + 'Form');
        if (!formContainer) {
            formContainer = document.createElement('div');
            formContainer.id = sectionId + 'Form';
            formContainer.innerHTML = window[sectionId + 'Form'];
            document.body.appendChild(formContainer);
        }
        formContainer.style.display = 'block';
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

// Show main content by default
showSection('main');