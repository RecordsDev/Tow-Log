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
        fetchTowData(); // Fetch and display police tows when showing main section... will fetch every return to home screen
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

async function fetchTowData() {
    try {
        const response = await fetch('https://towlog.000webhostapp.com/fetch_data.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayPoliceTows(data.policeTows);
        displayPPIRepoTows(data.ppiRepoTows);
    } catch (error) {
        console.error('Error fetching tow data:', error);
    }
}

function displayPoliceTows(tows) {
    const logsContainer = document.getElementById('policeTowLogs');
    logsContainer.innerHTML = ''; // Clear existing entries
    tows.forEach(tow => {
        const entry = document.createElement('div');
        entry.className = 'entry';
        entry.innerHTML = `
            <p><strong>Date:</strong> ${tow.date}</p>
            <p><strong>DR:</strong> ${tow.dr}</p>
            <p><strong>Make:</strong> ${tow.make}</p>
            <p><strong>Model:</strong> ${tow.model}</p>
            <p><strong>License:</strong> ${tow.lic_plate} (${tow.lic_state})</p>
            <p><strong>Reason:</strong> ${tow.tow_reason}</p>
            <p><strong>Tow Company:</strong> ${tow.tow_company_name}</p>
        `;
        logsContainer.appendChild(entry);
    });
}

function displayPPIRepoTows(tows) {
    const logsContainer = document.getElementById('ppiRepoLogs');
    logsContainer.innerHTML = ''; // Clear existing entries
    tows.forEach(tow => {
        const entry = document.createElement('div');
        entry.className = 'entry';
        entry.innerHTML = `
            <p><strong>Date:</strong> ${tow.date}</p>
            <p><strong>Time:</strong> ${tow.time_of_tow}</p>
            <p><strong>Type:</strong> ${tow.is_ppi ? 'PPI' : 'Repo'}</p>
            <p><strong>Voluntary:</strong> ${tow.is_voluntary ? 'Yes' : 'No'}</p>
            <p><strong>Make:</strong> ${tow.make}</p>
            <p><strong>Model:</strong> ${tow.model}</p>
            <p><strong>License:</strong> ${tow.lic_plate} (${tow.lic_state})</p>
            <p><strong>Location:</strong> ${tow.location}</p>
            <p><strong>Tow Company:</strong> ${tow.tow_company_name}</p>
        `;
        logsContainer.appendChild(entry);
    });
}

// Show main content by default
showSection('main');

// Call fetchPoliceTows when the page loads
document.addEventListener('DOMContentLoaded', fetchTowData);