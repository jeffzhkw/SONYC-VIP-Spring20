import React from "react";
import firebase from 'firebase'

//add logic to read from file
const config = {
    apiKey: "AIzaSyBckDz5An7Rx4LcI_T2RL6eIw4xz4JdXyE",
    authDomain: "sonyc-4fea8.firebaseapp.com",
    databaseURL: "https://sonyc-4fea8.firebaseio.com"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();

export function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}
