import cuid from 'cuid';
import firebase from '../config/firebase';

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
    if(!snapshot.exists) return undefined;
    const data = snapshot.data();

    for (const prop in data){
        if(data.hasOwnProperty(prop)){
            if (data[prop] instanceof firebase.firestore.Timestamp) {
                data[prop] = data[prop].toDate();
            }
        }
    }
    
    return {
        ...data,
        id: snapshot.id
    }
}

export function listenToEventsFromFireStore(){
    return db.collection('events').orderBy('date');
}

export function listenToEventsFromFirestore(eventId) {
    return db.collection('events').doc(eventId);
}

export function addEventToFirestore(event) {
    return db.collection('events').add({
        ...event,
        hostedBy: 'Yukino',
        hostPhotoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: cuid(),
            displayName: 'Yukino',
            photoURL: 'https://randomuser.me/api/portraits/women/20.jpg'
        })
    })
}

export function updateEventInFirestore(event) {
    return db.collection('events').doc(event.id).update(event);
}

export function deleteEventInFirestore(eventId) {
    return db.collection('events').doc(eventId).delete();
}

export function cancelEventToggle(event) {
    return db.collection('events').doc(event.id).update({
        isCancelled: !event.isCancelled
    })
}

export function setUserProfileData(user) {
    return db.collection('user').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}

export function getUserProfile(userId) {
    return db.collection('user').doc(userId);
}

export async function updateUserProfile(profile) {
    const user = firebase.auth().currentUser;
    console.log(user);
    try {
        if (user.displayName !== profile.displayName) {
            await user.updateProfile({
                displayName: profile.displayName
            })
        }
        return await db.collection('user').doc(user.uid).update(profile);
        // return await db.collection('users').doc(user.uid).set(profile, SetOptions.merge())
    } catch (error) {
        throw error;
    }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
    const user = firebase.auth().currentUser;
    const userDocRef = db.collection('user').doc(user.uid);
    try {
        const userDoc = await userDocRef.get();
        if (!userDoc.data().photoURL) {
            await db.collection('user').doc(user.uid).update({
                photoURL: downloadURL
            });
            await user.updateProfile({
                photoURL: downloadURL
            });
        }
        return await db.collection('user').doc(user.uid).collection('photos').add({
            name: filename,
            url: downloadURL
        })
    } catch (error) {
        throw error;
    }
}

export function getUserPhotos(userUid) {
    return db.collection('user').doc(userUid).collection('photos');
}

export async function setMainPhoto(photo) {
    const user = firebase.auth().currentUser;
    try {
        await db.collection('user').doc(user.uid).update({
            photoURL: photo.url
        })
        return await user.updateProfile({
            photoURL: photo.url
        }) 
    } catch (error) {
        throw error;
    }
}

export function deletePhotoFromCollection(photoId) {
    const userUid = firebase.auth().currentUser.uid;
    return db.collection('user').doc(userUid).collection('photos').doc(photoId).delete();
}