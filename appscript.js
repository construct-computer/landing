function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  var email = data.email;
  var about = data.about || "";
  var timestamp = new Date();
  
  // Append to sheet
  sheet.appendRow([email, timestamp, about]);
  
  // Send notification to you
  MailApp.sendEmail({
    to: "ankush4singh@gmail.com",
    subject: "New Waitlist Signup: " + email,
    body: "New signup on Construct waitlist.\n\nEmail: " + email + "\nAbout: " + about + "\nTime: " + timestamp.toISOString()
  });

  MailApp.sendEmail({
    to: "naiknischal91@gmail.com",
    subject: "New Waitlist Signup: " + email,
    body: "New signup on Construct waitlist.\n\nEmail: " + email + "\nAbout: " + about + "\nTime: " + timestamp.toISOString()
  });
  
  return ContentService
    .createTextOutput(JSON.stringify({ result: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
