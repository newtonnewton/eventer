import firebase from '../config/firebase';
import { setUserProfileData } from './firestoreService';

export function signInWithEmail(creds) {
    return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
}

export function signOutFirebase() {
    return firebase.auth().signOut();
}

export async function registerInFirebase(creds) {
    try {
        const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(creds.email, creds.password);
        await result.user.updateProfile({
            displayName: creds.displayName,
        });
        return await setUserProfileData(result.user);
    } catch (error) {
        throw error;
    }
}

export function updateUserPassword(creds) {
    const user = firebase.auth().currentUser;
    return user.updatePassword(creds.newPassword1);
}

export function uploadToFirebaseStorage(file, filename) {
    const user = firebase.auth().currentUser;
    console.log(user);
    const storageRef = firebase.storage().ref();
    console.log(storageRef);
    return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}

export function deleteFromFirebaseStorage(filename) {
    const userUid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref();
    const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
    return photoRef.delete();
}
