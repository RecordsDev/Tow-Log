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

    // Create table
    const table = document.createElement('table');
    table.className = 'tow-table';

    // Create header
    const header = table.createTHead();
    const headerRow = header.insertRow();
    const headers = ['Date', 'DR', 'Make', 'Model', 'Color', 'Reason', 'Tow Company', 'Hold'];
    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });

    // Create table body
    const tbody = table.createTBody();
    tows.forEach(tow => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${tow.date}</td>
            <td>${tow.dr}</td>
            <td>${tow.make}</td>
            <td>${tow.model}</td>
            <td>${tow.color}</td>
            <td>${tow.tow_reason}</td>
            <td>${tow.tow_company_name}</td>
            <td>${tow.evidence_hold ? 'Yes' : 'No'}</td>
        `;
        // Add click event listener for future edit functionality
        row.addEventListener('click', () => {
            // Placeholder for future edit functionality
            console.log('Edit police tow:', tow);
        });
    });

    logsContainer.appendChild(table);
}

function displayPPIRepoTows(tows) {
    const logsContainer = document.getElementById('ppiRepoLogs');
    logsContainer.innerHTML = ''; // Clear existing entries

    // Create table
    const table = document.createElement('table');
    table.className = 'tow-table';

    // Create header
    const header = table.createTHead();
    const headerRow = header.insertRow();
    const headers = ['Date', 'Time', 'Location', 'Make', 'Model', 'Color', 'License', 'State', 'Type', 'Tow Company'];
    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });

    // Create table body
    const tbody = table.createTBody();
    tows.forEach(tow => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${tow.date}</td>
            <td>${tow.time_of_tow}</td>
            <td>${tow.location}</td>
            <td>${tow.make}</td>
            <td>${tow.model}</td>
            <td>${tow.color}</td>
            <td>${tow.lic_plate}</td>
            <td>${tow.lic_state}</td>
            <td>${tow.is_ppi ? 'PPI' : 'Repo'}</td>
            <td>${tow.tow_company_name}</td>
        `;
        // Add click event listener for future edit functionality
        row.addEventListener('click', () => {
            // Placeholder for future edit functionality
            console.log('Edit PPI/Repo tow:', tow);
        });
    });

    logsContainer.appendChild(table);
}

// Show main content by default
showSection('main');

// Call fetchPoliceTows when the page loads
document.addEventListener('DOMContentLoaded', fetchTowData);