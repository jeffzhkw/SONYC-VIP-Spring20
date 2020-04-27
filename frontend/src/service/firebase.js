import React from "react";
import firebase from 'firebase';

//add logic to read from file
const config = {
    apiKey: "_",
    authDomain: "_",
    databaseURL: "_"
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
