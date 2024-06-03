import { collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Corrected import

// Function to create a new competition user
export const createNewCompUser = async (user) => {
    try {
        const docRef = await addDoc(collection(db, "users"), user);
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
};

// Function to get all competition users
export const getCompUser = async () => {
    const allUsers = [];
    const q = query(collection(db, "users"), orderBy('priority', "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        allUsers.push({ ...doc.data(), id: doc.id });
    });
    return allUsers;
};
