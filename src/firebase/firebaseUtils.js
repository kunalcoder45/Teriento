import { auth, googleProvider } from './firebase'; // Import the Firebase Auth instance
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from 'firebase/auth';


/**
 * Sign in a user with email and password
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise} - Resolves to user data or an error message
 */
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Return the signed-in user
    } catch (error) {
        throw new Error(error.message); // Throw error if sign-in fails
    }
};

/**
 * Register a new user with email and password
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise} - Resolves to user data or an error message
 */
export const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Return the registered user
    } catch (error) {
        throw new Error(error.message); // Throw error if registration fails
    }
};

/**
 * Google login
 * @returns {Promise} - Resolves to user data or an error message
 */
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider); // Google login popup
        const user = result.user; // User data
        console.log('Google user:', user);
        return user; // Return the user data
    } catch (error) {
        throw new Error('Error during Google login: ' + error.message); // Error handling
    }
};

/**
 * Sign out the current user
 * @returns {Promise} - Resolves when user is signed out
 */
export const signOutUser = async () => {
    try {
        await signOut(auth); // Sign out the user
        console.log('User signed out');
    } catch (error) {
        throw new Error('Error signing out: ' + error.message); // Throw error if sign-out fails
    }
};

/**
 * Get the Firebase ID token of the current user
 * @returns {Promise} - Resolves to the ID token or an error message
 */
export const getIdToken = async () => {
    const user = auth.currentUser; // Get the currently signed-in user
    if (user) {
        try {
            const idToken = await user.getIdToken();
            return idToken; // Return the ID token
        } catch (error) {
            throw new Error('Error fetching ID token: ' + error.message);
        }
    } else {
        throw new Error('No user is signed in');
    }
};

/**
 * Listen to auth state changes (user login/logout)
 * @param {function} callback - The callback to execute on state change
 */
export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback); // Subscribe to auth state changes
};
