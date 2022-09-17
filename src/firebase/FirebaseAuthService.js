import firebase from './FirebaseConfig';

const auth = firebase.auth();

const registerUser = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
};

const LoginUser = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
}

const logoutUser = () => {
    return auth.signOut();
}

const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail();
}

const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
}

const subscribeToAuthChanges = (handeleAuthChange) => {
    auth.onAuthStateChanged((user) => {
        handeleAuthChange(user);
    });
};

// const subscribeToAuthChanges = async () => {
//     return await auth.onAuthStateChanged();
// };

const firebaseAuthService = {

    registerUser,
    LoginUser,
    logoutUser,
    sendPasswordResetEmail,
    loginWithGoogle,
    subscribeToAuthChanges
};

export default firebaseAuthService;