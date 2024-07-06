window.policeTowForm = `
    <div id="policeTowForm" class="form-container">
        <h2>Police Tow Form</h2>
        <form onsubmit="submitForm('policeTow', event)">
            <div class="form-row">
                <div class="form-group">
                    <label for="pt-dr">DR (Case Number):</label>
                    <input type="text" id="pt-dr" name="dr" required pattern="\\d{8}" title="Please enter an 8-digit case number">
                </div>
                <div class="form-group">
                    <label for="pt-dateTime">Date/Time:</label>
                    <input type="datetime-local" id="pt-dateTime" name="dateTime" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="pt-reason">Reason:</label>
                    <input list="reason-options" id="pt-reason" name="reason" required>
                    <datalist id="reason-options">
                        <option value="Abandoned Vehicle">
                        <option value="Blocking Driveway">
                        <option value="Expired Registration">
                        <option value="Illegal Parking">
                        <option value="Traffic Hazard">
                    </datalist>
                </div>
                <div class="form-group">
                    <label for="pt-towCompany">Tow Company:</label>
                    <select id="pt-towCompany" name="towCompany" required>
                        <option value="">Select a tow company</option>
                        <option value="G&W Towing">G&W Towing</option>
                        <option value="Southside Towing">Southside Towing</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="pt-plate">Plate:</label>
                    <input type="text" id="pt-plate" name="plate">
                </div>
                <div class="form-group">
                    <label for="pt-vin">VIN:</label>
                    <input type="text" id="pt-vin" name="vin">
                </div>
                <div class="form-group">
                    <label for="pt-make">Make:</label>
                    <input type="text" id="pt-make" name="make">
                </div>
                <div class="form-group">
                    <label for="pt-model">Model:</label>
                    <input type="text" id="pt-model" name="model">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="pt-year">Year:</label>
                    <input type="text" id="pt-year" name="year">
                </div>
                <div class="form-group">
                    <label for="pt-state">State:</label>
                    <input type="text" id="pt-state" name="state">
                </div>
                <div class="form-group">
                    <label for="pt-color">Color:</label>
                    <input type="text" id="pt-color" name="color">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="pt-notes">Notes:</label>
                    <textarea id="pt-notes" name="notes"></textarea>
                </div>
                <div class="form-group">
                    <label for="pt-hold">Hold:</label>
                    <input type="checkbox" id="pt-hold" name="hold">
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
`;