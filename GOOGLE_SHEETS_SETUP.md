# Google Sheets — Driver Application Setup

Step-by-step guide to connect the TNE website driver application form to your "TNE DRIVER APPLICATION" Google Sheet.

---

## Step 1: Set Up the Sheet Columns

Open your **TNE DRIVER APPLICATION** Google Sheet and add these headers in Row 1:

| A | B | C | D | E |
|---|---|---|---|---|
| Timestamp | Full Name | Phone | CDL Type | Years Experience |

---

## Step 2: Open Apps Script

1. In the Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code in the editor
3. Paste the following script:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      new Date().toLocaleString(),   // Timestamp
      data.fullName,                 // Full Name
      data.phone,                    // Phone
      data.cdlType,                  // CDL Type
      data.yearsExperience           // Years Experience
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Application received'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: test function to verify sheet access
function testAppend() {
  var testData = {
    fullName: 'Test Driver',
    phone: '(555) 000-0000',
    cdlType: 'Class A',
    yearsExperience: '5'
  };

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date().toLocaleString(),
    testData.fullName,
    testData.phone,
    testData.cdlType,
    testData.yearsExperience
  ]);

  Logger.log('Test row added successfully');
}
```

4. Click **Save** (Ctrl+S / Cmd+S)
5. Name the project something like `TNE Driver Form`

---

## Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon ⚙️ next to "Select type" → choose **Web app**
3. Set the following:
   - **Description**: `TNE Driver Application v1`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. **Authorize** when prompted:
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to TNE Driver Form (unsafe)" → "Allow"
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycbx...LONG_ID.../exec
   ```

---

## Step 4: Paste the URL into the Website

Open `js/main.js` and find this line (near line 61):

```javascript
var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

Replace `YOUR_SCRIPT_ID` with the full URL you copied. Example:

```javascript
var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxYourActualIdHere/exec';
```

Save the file.

---

## Step 5: Test It

1. Open the website
2. Fill out the driver application form
3. Click "Submit Driver Application"
4. Check the Google Sheet — a new row should appear

---

## Form Field Names (for reference)

These are the `name` attributes on the form inputs in `index.html` that map to `data.xxx` in the script:

| Form Input | name attribute | Apps Script key |
|------------|---------------|-----------------|
| Full Name | `fullName` | `data.fullName` |
| Phone | `phone` | `data.phone` |
| CDL Type | `cdlType` | `data.cdlType` |
| Years Exp | `yearsExperience` | `data.yearsExperience` |

---

## Troubleshooting

- **Form says "ERROR — TRY AGAIN"**: Check the Apps Script URL is correct and the deployment has "Anyone" access.
- **Sheet doesn't update**: Go to Apps Script → Executions (left sidebar) to see error logs.
- **Changed the script?**: You must create a **New deployment** (not edit the existing one) for changes to go live. Or use "Manage deployments" → edit the existing one → set version to "New version" → Deploy.

---

## Later: Add SMS Notifications (Optional)

When you're ready to add SMS alerts for new applications, you can integrate Textbelt (like your A&S Flooring setup) by adding `sendSMSToOwner()` inside the `doPost()` function after the `sheet.appendRow()` call.
