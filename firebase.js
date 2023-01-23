import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAuth, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN, REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_STORAGE_BUCKET, REACT_APP_FIREBASE_MESSAGING_SENDER_ID, REACT_APP_FIREBASE_APP_ID } from '@env'
import { collection, getFirestore, Timestamp, addDoc, setDoc, doc, updateDoc, initializeFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID
};

const COLLECTIONS = {
    USERS: 'users',
    PROJECTS: 'projects'
}

let app
let auth
let storage
let db
if (getApps().length < 1) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
    storage = getStorage()
    db = initializeFirestore(app, {
        experimentalForceLongPolling: true, // must add this prop otherwise firebase backend won't work, also metro.config (See expo about firebse)
      });
} else {
    app = getApp();
    auth = getAuth();
    storage = getStorage()
    db = getFirestore()
}

const projectsCollectionRef = collection(db, COLLECTIONS.PROJECTS)

// for users
const addUserToFirebase = async (data, docID) => {
    return setDoc(doc(db, COLLECTIONS.USERS, docID), data)
}

const updateUserCollection = async (data, docID) => {
    return updateDoc(doc(db, COLLECTIONS.USERS, docID), data)
}

// for projects
const addProjectToFirebase = async (data) => {
    return addDoc(projectsCollectionRef, data)
}

const updateProjectsCollection = async (data, docID) => {
    return updateDoc(doc(db, COLLECTIONS.PROJECTS, docID), data)
}


export {
    auth,
    storage,
    Timestamp,
    db,
    collection,
    addUserToFirebase,
    updateUserCollection,
    addProjectToFirebase,
    updateProjectsCollection
}