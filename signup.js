import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5JLvPzsgav5U5dv3eLy511WodcTwCxk8",
    authDomain: "medvault-3ab45.firebaseapp.com",
    projectId: "medvault-3ab45",
    storageBucket: "medvault-3ab45.firebasestorage.app",
    messagingSenderId: "769455123364",
    appId: "1:769455123364:web:640ec301531a298779af31",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign-Up Functionality
const signupButton = document.getElementById("signup-button");
signupButton.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Account created successfully!");
      window.location.href = "login.html"; // Redirect to login
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});
