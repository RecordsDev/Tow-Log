let towCompanies = [];

// Function to show the specified section and hide others
function showSection(sectionId) {
  const mainContent = document.getElementById("mainContent");
  const ppiRepoForm = document.getElementById("ppiRepoForm");
  const policeTowForm = document.getElementById("policeTowForm");

  // Hide all sections
  mainContent.style.display = "none";
  if (ppiRepoForm) ppiRepoForm.style.display = "none";
  if (policeTowForm) policeTowForm.style.display = "none";

  if (sectionId === "main") {
    mainContent.style.display = "block";
    fetchTowData();
  } else {
    let formContainer = document.getElementById(sectionId + "Form");
    if (!formContainer) {
      formContainer = document.createElement("div");
      formContainer.id = sectionId + "Form";
      formContainer.innerHTML = window[sectionId + "Form"];
      document.body.appendChild(formContainer);
    }
    formContainer.style.display = "block";
    populateTowCompanyDropdowns(); // Populate dropdowns when form is displayed
  }
}

// Function to handle form submission
async function submitForm(formType, event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const id = formData.get("id");

  let url = "https://towlog.000webhostapp.com/";
  if (formType === "policeTow") {
    url += id ? "update_police_tow.php" : "add_police_tow.php";
  } else if (formType === "ppiRepo") {
    url += id ? "update_ppirepo_tow.php" : "add_ppirepo_tow.php";
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (result.success) {
      alert(id ? "Entry updated successfully" : "New entry added successfully");
      form.reset();
      showSection("main");
      fetchTowData(); // Refresh the data display
    } else {
      alert("Error: " + (result.message || "Unknown error occurred"));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please check your connection and try again.");
  }
}

// Function to update the tow company information based on the selected company
function updateTowCompanyInfo() {
  const towCompany = document.getElementById("towCompany").value;
  const infoDiv = document.getElementById("towCompanyInfo");

  if (towCompany === "G&W Towing") {
    infoDiv.innerHTML =
      "Address: 965 W 18th St, Costa Mesa CA<br>Phone: 949-642-1252";
  } else if (towCompany === "Southside Towing") {
    infoDiv.innerHTML =
      "Address: 1643 Placentia Ave, Costa Mesa CA<br>Phone: 949-631-8698";
  } else {
    infoDiv.innerHTML = "";
  }
}

async function fetchTowData() {
  try {
    const response = await fetch("https://towlog.000webhostapp.com/fetch_data.php");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayPoliceTows(data.policeTows);
    displayPPIRepoTows(data.ppiRepoTows);
  } catch (error) {
    console.error("Error fetching tow data:", error);
  }
}

function displayPoliceTows(tows) {
  const logsContainer = document.getElementById("policeTowLogs");
  logsContainer.innerHTML = ""; // Clear existing entries

  // Create table
  const table = document.createElement("table");
  table.className = "tow-table";

  // Create header
  const header = table.createTHead();
  const headerRow = header.insertRow();
  const headers = [
    "Date",
    "DR",
    "License",
    "State",
    "Make",
    "Model",
    "Color",
    "Reason",
    "Tow Company",
    "Hold",
  ];
  headers.forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });

  // Create table body
  const tbody = table.createTBody();
  tows.forEach((tow) => {
    const row = tbody.insertRow();
    row.innerHTML = `
            <td>${tow.date}</td>
            <td>${tow.dr}</td>
            <td>${tow.lic_plate}</td>
            <td>${tow.lic_state}</td>
            <td>${tow.make}</td>
            <td>${tow.model}</td>
            <td>${tow.color}</td>
            <td>${tow.tow_reason}</td>
            <td>${tow.tow_company_name}</td>
            <td>${tow.evidence_hold ? "Yes" : "No"}</td>
        `;
    row.addEventListener("click", () => handlePoliceTowClick(tow));
  });

  logsContainer.appendChild(table);
}

function displayPPIRepoTows(tows) {
  const logsContainer = document.getElementById("ppiRepoLogs");
  logsContainer.innerHTML = ""; // Clear existing entries

  // Create table
  const table = document.createElement("table");
  table.className = "tow-table";

  // Create header
  const header = table.createTHead();
  const headerRow = header.insertRow();
  const headers = [
    "Date",
    "Time",
    "License",
    "State",
    "Make",
    "Model",
    "Color",
    "Location",
    "Type",
    "Tow Company",
  ];
  headers.forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });

  // Create table body
  const tbody = table.createTBody();
  tows.forEach((tow) => {
    const row = tbody.insertRow();
    row.innerHTML = `
            <td>${tow.date}</td>
            <td>${tow.time_of_tow}</td>
            <td>${tow.lic_plate}</td>
            <td>${tow.lic_state}</td>
            <td>${tow.make}</td>
            <td>${tow.model}</td>
            <td>${tow.color}</td>
            <td>${tow.location}</td>
            <td>${tow.is_ppi ? "PPI" : "Repo"}</td>
            <td>${tow.tow_company_name}</td>
        `;
    row.addEventListener("click", () => handlePPIRepoClick(tow));
  });

  logsContainer.appendChild(table);
}

function handlePoliceTowClick(tow) {
  showSection("policeTow");
  populatePoliceTowForm(tow);
}

function handlePPIRepoClick(tow) {
  showSection("ppiRepo");
  populatePPIRepoForm(tow);
}

function populatePoliceTowForm(tow) {
  document.getElementById("pt-dr").value = tow.dr;
  document.getElementById("pt-dateTime").value = tow.date + "T00:00"; // Assuming time is not stored
  document.getElementById("pt-reason").value = tow.tow_reason;
  document.getElementById("pt-towCompany").value = tow.tow_company_name;
  document.getElementById("pt-plate").value = tow.lic_plate;
  document.getElementById("pt-vin").value = tow.vin;
  document.getElementById("pt-make").value = tow.make;
  document.getElementById("pt-model").value = tow.model;
  document.getElementById("pt-year").value = tow.year;
  document.getElementById("pt-state").value = tow.lic_state;
  document.getElementById("pt-color").value = tow.color;
  document.getElementById("pt-notes").value = tow.notes;
  document.getElementById("pt-hold").checked = tow.evidence_hold === "1";
}

function populatePPIRepoForm(tow) {
  document.getElementById("date").value = tow.date;
  document.getElementById("time").value = tow.time_of_tow;
  document.getElementById("timeCalledIn").value = tow.time_called_in;
  document.getElementById("location").value = tow.location;
  document.getElementById("year").value = tow.year;
  document.getElementById("make").value = tow.make;
  document.getElementById("model").value = tow.model;
  document.getElementById("color").value = tow.color;
  document.getElementById("license").value = tow.lic_plate;
  document.getElementById("vin").value = tow.vin;
  document.getElementById("state").value = tow.lic_state;
  document.getElementById("towCompany").value = tow.tow_company_name;
  document.getElementById("towRequestedBy").value = tow.tow_requested_by;
  document.getElementById("phone").value = tow.phone_number;
  document.getElementById("employeeId").value = tow.employee_id;
  document.getElementById("repossessed").checked = !tow.is_ppi;
  document.getElementById("verified").checked = tow.is_voluntary === "1";
}

// Add this function to main.js
async function fetchTowCompanies() {
  if (towCompanies.length === 0) {
    // Only fetch if we haven't already
    try {
      const response = await fetch(
        "https://towlog.000webhostapp.com/fetch_tow_companies.php"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      towCompanies = await response.json();
    } catch (error) {
      console.error("Error fetching tow companies:", error);
    }
  }
}

function populateTowCompanyDropdowns() {
  const selects = document.querySelectorAll(
    'select[name="towCompany"], select[name="pt-towCompany"]'
  );
  selects.forEach((select) => {
    select.innerHTML = '<option value="">Select a tow company</option>';
    towCompanies.forEach((company) => {
      const option = document.createElement("option");
      option.value = company.id;
      option.textContent = company.name;
      select.appendChild(option);
    });
  });
}

// Show main content by default
showSection("main");

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await Promise.all([
      fetchTowCompanies(), // Fetch tow companies
      fetchTowData(), // Fetch tow data
    ]);
    showSection("main");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
});
