import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5JLvPzsgav5U5dv3eLy511WodcTwCxk8",
    authDomain: "medvault-3ab45.firebaseapp.com",
    projectId: "medvault-3ab45",
    storageBucket: "medvault-3ab45.appspot.com",
    messagingSenderId: "769455123364",
    appId: "1:769455123364:web:640ec301531a298779af31",
    measurementId: "G-PKGMVHJ95Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "trial2"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

function renderCharts(data) {
    // Gender Distribution
    const genderCounts = data.reduce((acc, record) => {
        acc[record.gender] = (acc[record.gender] || 0) + 1;
        return acc;
    }, {});

    new Chart(document.getElementById("gender-chart"), {
        type: "pie",
        data: {
            labels: Object.keys(genderCounts),
            datasets: [{
                data: Object.values(genderCounts),
                backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#F44336"]
            }]
        }
    });

    // Diabetic Percentage
    const diabeticCount = data.filter(record => record.generalSurvey?.diabetic === "Yes").length;
    const diabeticPercentage = ((diabeticCount / data.length) * 100).toFixed(2);

    new Chart(document.getElementById("diabetic-chart"), {
        type: "doughnut",
        data: {
            labels: ["Diabetic", "Non-Diabetic"],
            datasets: [{
                data: [diabeticPercentage, 100 - diabeticPercentage],
                backgroundColor: ["#FF5722", "#03A9F4"]
            }]
        }
    });

    // Alcohol Consumption Distribution
    const alcoholCounts = data.reduce((acc, record) => {
        const alcoholStatus = record.generalSurvey?.alcohol || "Unknown";
        acc[alcoholStatus] = (acc[alcoholStatus] || 0) + 1;
        return acc;
    }, {});

    new Chart(document.getElementById("alcohol-chart"), {
        type: "bar",
        data: {
            labels: Object.keys(alcoholCounts),
            datasets: [{
                data: Object.values(alcoholCounts),
                backgroundColor: "#673AB7"
            }]
        },
        options: {
            indexAxis: "y"
        }
    });
}

async function fetchAndDisplayAnalytics() {
    try {
        const data = await fetchData();
        renderCharts(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchAndDisplayAnalytics();
