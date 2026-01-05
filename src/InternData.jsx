import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyArx3eeAj98XkXJqMtITF2I00sjm-LQDqs",
    authDomain: "vivexa-admin.firebaseapp.com",
    projectId: "vivexa-admin",
    storageBucket: "vivexa-admin.firebasestorage.app",
    messagingSenderId: "68717817629",
    appId: "1:68717817629:web:a2a6dc32979f2b2d1fbbf4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getInternById = async (id) => {
    try {
        const docRef = doc(db, "intern-certificates", id.toUpperCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { success: true, data: docSnap.data() };
        } else {
            return { success: false, error: "ID Not Found" };
        }
    } catch (e) {
        return { success: false, error: e.message };
    }
};