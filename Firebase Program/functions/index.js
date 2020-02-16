const functions = require('firebase-functions');
const express = require('express')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

/*exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});*/

const app = express()
app.get('/abc', (request, response) => {
    response.send("123!");
});

exports.AppFunction = functions.https.onRequest(app)