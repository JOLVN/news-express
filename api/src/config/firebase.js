const admin = require('firebase-admin');

let firebaseConfig;

try {
    firebaseConfig = JSON.parse(process.env.FIREBASE_CREDENTIALS);
} catch (error) {
    console.error("Error parsing Firebase credentials:", error);
    throw error;
}

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    ignoreUndefinedProperties: true
});

const db = admin.firestore();

module.exports = { db };