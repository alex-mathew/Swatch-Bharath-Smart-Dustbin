/*#include <Arduino.h>

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println("hi");
  delay(100);
}
*/

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>
//#include "FirebaseArduino.h"


#define FIREBASE_HOST "sensor-hub-dummy.firebaseio.com"                  
#define FIREBASE_AUTH "MuGpgRwlJmD3BeNQq23yf9A6hEUeJPFTCkm4SCLT"
//#define FIREBASE_AUTH "AIzaSyDMrP-n7wu95U0f_xvbJUUiDlA4wUEVTJ8"   
#define WIFI_SSID "alex"
#define WIFI_PASSWORD "helloworld"  

int deg1,deg2,deg3,deg4;

// define pin numbers
const int trigPin = 2;  //D4
const int echoPin = 0;  //D3

long duration;
int distance;
int ip;

void setup(){
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  Serial.begin(9600); // Starts the serial communication

  WiFi.begin(WIFI_SSID,WIFI_PASSWORD);                               
  while (WiFi.status()!=WL_CONNECTED){
    Serial.println("Connecting...");
    delay(500);
  }
  ip = WiFi.localIP();
  Serial.print("Connected. Allocated local IP : ");
  Serial.println(ip);
/*
  Firebase.begin(FIREBASE_HOST,FIREBASE_AUTH);
  Firebase.setInt("deger1",0);                     
  Firebase.setInt("deger2",0); 
  Firebase.setInt("deger3",0); 
  Firebase.setInt("deger4",0); 
  */
}

/*
void firebasereconnect(){
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}
*/

void loop() {

 /* if (Firebase.failed()) {
    firebasereconnect();
    return;
  } 

  Serial.println(Firebase.getString("deger1"));
  */

// Clears the trigPin
digitalWrite(trigPin, LOW);
delayMicroseconds(2);

// Sets the trigPin on HIGH state for 10 micro seconds
digitalWrite(trigPin, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin, LOW);

// Reads the echoPin, returns the sound wave travel time in microseconds
duration = pulseIn(echoPin, HIGH);

// Calculating the distance
distance= duration*0.034/2;
// Prints the distance on the Serial Monitor
Serial.print("Distance: ");
Serial.println(distance);
delay(2000);
}