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