(function() {
    // Set the configuration for your app
    var config = {
        apiKey: "AIzaSyDMrP-n7wu95U0f_xvbJUUiDlA4wUEVTJ8",
        authDomain: "sensor-hub-dummy.firebaseapp.com",
        databaseURL: "https://sensor-hub-dummy.firebaseio.com",
        projectId: "sensor-hub-dummy",
        storageBucket: "sensor-hub-dummy.appspot.com",
        messagingSenderId: "1013775122258"
    };

    firebase.initializeApp(config);

    // Get a reference to the database service
    var database = firebase.database();

    // Get element from the DOM
    const tempElement = document.getElementById('sensor1');
    //tempElement.innerText = 'jjj';

    const tempRef = database.ref().child('sensor1');
    console.log(tempRef);

    // Sync objects changes
    tempRef.on('value', function(snapshot) {
            var childData = snapshot.val();
            ValueFromSensor = childData;
            if(ValueFromSensor>=40 && ValueFromSensor<60)
            BinArray[0].setIcon(TrashIcons[2]).getPopup().setContent("<b>BIN 1</b><br />STATUS : <b>"+TrashLevels[2]+"%</b>");
            BinArray[0].openPopup();
            console.log("height: " + childData);
    });

    const messaging = firebase.messaging();
    messaging.usePublicVapidKey("AAAA7Am0v1I:APA91bGbkHyKGdC-nfVL2PGHLzXObZhAcpz9umEROMGVYC2qhSDPrDfIIrbnGbeLlDRRFP9HBJHs70p0_c_MFQG9cOZN-oiRVZj1xtH1YpS5oG6CcYtCI5dvK_6Y0R_ZckwWMOsYtR8j");
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          messaging.getToken().then((currentToken) => {
            if (currentToken) {
              sendTokenToServer(currentToken);
              updateUIForPushEnabled(currentToken);
            } else {
              // Show permission request.
              console.log('No Instance ID token available. Request permission to generate one.');
              // Show permission UI.
              updateUIForPushPermissionRequired();
              setTokenSentToServer(false);
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            showToken('Error retrieving Instance ID token. ', err);
            setTokenSentToServer(false);
          });
          messaging.onTokenRefresh(() => {
          messaging.getToken().then((refreshedToken) => {
            console.log('Token refreshed.');
            // Indicate that the new Instance ID token has not yet been sent to the
            // app server.
            setTokenSentToServer(false);
            // Send Instance ID token to app server.
            sendTokenToServer(refreshedToken);
            // ...
            }).catch((err) => {
              console.log('Unable to retrieve refreshed token ', err);
              showToken('Unable to retrieve refreshed token ', err);
            });
          });
        } else {
          console.log('Unable to get permission to notify.');
        }
      });
      



    messaging.requestPermission()
    .then(function() {
        console.log('Have Permission');
        return messaging.getToken();
    })
    .then(function(token){
        console.log(token);
    })
    .catch(function(err) {
        console.log("Error Occured");
    });

    messaging.onMessage(function(payload) {
        console.log('onMessage', payload)
    });

}());

firebase.auth().getRedirectResult().then(function(result) {
    console.log(result);
});