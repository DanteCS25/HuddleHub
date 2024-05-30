import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const handleSignOut = () => {
    signOut(auth)
        .then(() => {
            // Signed out 
            console.log("User signed out successfully");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}
