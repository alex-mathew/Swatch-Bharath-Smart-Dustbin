importScripts('/__/firebase/4.6.0/firebase-app.js');
importScripts('/__/firebase/4.6.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');

var config = {
    apiKey: "AIzaSyDMrP-n7wu95U0f_xvbJUUiDlA4wUEVTJ8",
    authDomain: "sensor-hub-dummy.firebaseapp.com",
    databaseURL: "https://sensor-hub-dummy.firebaseio.com",
    projectId: "sensor-hub-dummy",
    storageBucket: "sensor-hub-dummy.appspot.com",
    messagingSenderId: "1013775122258"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    const title = 'Its Cleaning Time !!'
    const options = {
        body: payload.data.status
    };
    return self.ServiceWorkerRegistration.showNotification(title, options);
})