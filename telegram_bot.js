Apps Script:
var token = "5220849767:AAFzKPmDjlCs-YlbXsIFI_syK4roLy2GIhY";
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = "https://script.google.com/macros/s/AKfycbzyvcUdiir2UG4qpLT0ddsIThvY1CFZwoyJHSputmb4BOnUwg8ruk6-jCI6M5rrvbJ6/exec";
var ssId = "1q8PB-CmgErtVA2B1nHaD_TKuaEtvYOZLm9lv_FvaLts";
var stupidorwhat = "";

/*
 Step1: delete WebHook
 2: restart bot
 3: get me
 4: setwebhook
 5: talk to bot 
 */

function deleteWebHook() {
  var response = UrlFetchApp.fetch(telegramUrl + "/deleteWebHook");
  Logger.log(response.getContentText());
}

function getMe() {
  var response = UrlFetchApp.fetch(telegramUrl + "/getMe");
  Logger.log(response.getContentText());
}

function getUpdates() {
  var response = UrlFetchApp.fetch(telegramUrl + "/getUpdates");
  Logger.log(response.getContentText());
}

function setWebhook() {
  var response = UrlFetchApp.fetch(telegramUrl + "/setWebhook?url=" + webAppUrl);
  Logger.log(response.getContentText());
}

function sendText(id, text) {
  var response = UrlFetchApp.fetch(telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text);
  Logger.log(response.getContentText());
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Hi there" + JSON.stringify(e));
}


function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    GmailApp.sendEmail(Session.getEffectiveUser().getEmail(), "Message sent to bot", JSON.stringify(contents,null,4));
    var text = contents.message.text;
    //var ic = contents.message.ic;
    var id = contents.message.from.id;
    var name = contents.message.from.first_name + " " + contents.message.from.last_name;
    sendText(id, "Hi " + name + ". Please be patient while we work on your Medical Certificate.");
    var ss = SpreadsheetApp.openById(ssId);
    ss.appendRow([new Date(), id, name, text]);
    if(/^@/.test(text)){
      var sheetName = text.slice(1).split(" ")[0];
      var newText = text.split(" ").slice(1).join(" ");
      var sheet = ss.getSheetByName(sheetName) ? ss.getSheetByName(sheetName) : ss.insertSheet(sheetName);
      sheet.appendRow([new Date(),ic, id, name, newText]);
      sendText(id, "your number " + newText + " is now added to the waiting list. Please allow us some time to get back to you. " + sheetName);
    }

  } catch(e) {
    sendText(stupidorwhat, JSON.stringify(e,null,4));
  }
}