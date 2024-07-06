window.ppiRepoForm = `
    <div id="ppiRepoForm" class="form-container">
        <form onsubmit="submitForm('ppiRepo', event)">
            <div class="form-row">
                <div class="form-group">
                    <label for="date">Date:</label>
                    <input type="date" id="date" name="date" required>
                </div>
                <div class="form-group">
                    <label for="time">Time:</label>
                    <input type="time" id="time" name="time" required>
                </div>
                <div class="form-group">
                    <label for="timeCalledIn">Time Called In:</label>
                    <input type="time" id="timeCalledIn" name="timeCalledIn" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group wide-input">
                    <label for="location">Location:</label>
                    <input type="text" id="location" name="location" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group narrow-input">
                    <label for="year">Year:</label>
                    <input type="text" id="year" name="year" required>
                </div>
                <div class="form-group">
                    <label for="make">Make:</label>
                    <input type="text" id="make" name="make" required>
                </div>
                <div class="form-group">
                    <label for="model">Model:</label>
                    <input type="text" id="model" name="model" required>
                </div>
                <div class="form-group narrow-input">
                    <label for="color">Color:</label>
                    <input type="text" id="color" name="color" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="license">License#:</label>
                    <input type="text" id="license" name="license" required>
                </div>
                <div class="form-group wide-input">
                    <label for="vin">VIN:</label>
                    <input type="text" id="vin" name="vin" required>
                </div>
                <div class="form-group narrow-input">
                    <label for="state">State:</label>
                    <input type="text" id="state" name="state" required>
                </div>
                <div class="form-group narrow-input">
                    <label for="body">Body:</label>
                    <input type="text" id="body" name="body" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group wide-input">
                    <label for="towCompany">Tow Company:</label>
                    <select id="towCompany" name="towCompany" onchange="updateTowCompanyInfo()" required>
                        <option value="">Select a tow company</option>
                        <option value="G&W Towing">G&W Towing</option>
                        <option value="Southside Towing">Southside Towing</option>
                    </select>
                    <div id="towCompanyInfo"></div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group wide-input">
                    <label for="towRequestedBy">Tow Requested By:</label>
                    <input type="text" id="towRequestedBy" name="towRequestedBy" required>
                </div>
                <div class="form-group narrow-input">
                    <label for="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="employeeId">Employee ID:</label>
                    <input type="text" id="employeeId" name="employeeId" required>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="repossessed" name="repossessed">
                    <label for="repossessed">Repossessed</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="verified" name="verified">
                    <label for="verified">28/29 Verified</label>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
        
        <!-- SVS button and textbox -->
        <button id="svsButton" onclick="pasteSVSContent()">SVS</button>
        <textarea id="svsTextbox" placeholder="SVS content will appear here"></textarea>
    </div>
`;