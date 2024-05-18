import { signInWithPopup } from "firebase/auth";

export const handleSignUp = (email, password) => {
    if (typeof signInWithPopup !== 'undefined') {
        signInWithPopup(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("User Created -" + user.email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    } else {
        // Handle sign-in differently for Hermes
        // For example, use a different method like signInWithEmailAndPassword
    }
}

