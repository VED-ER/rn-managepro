import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAuth, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN, REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_STORAGE_BUCKET, REACT_APP_FIREBASE_MESSAGING_SENDER_ID, REACT_APP_FIREBASE_APP_ID } from '@env'
import { collection, getFirestore, Timestamp, addDoc, setDoc, doc, updateDoc, initializeFirestore, query, where, getDocs, orderBy, limit, startAfter } from "firebase/firestore"
import { Alert } from "react-native";

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
const usersCollectionRef = collection(db, COLLECTIONS.USERS)

// for users
const addUserToFirebase = async (data, docID) => {
    return setDoc(doc(db, COLLECTIONS.USERS, docID), data)
}

const updateUserCollection = async (data, docID) => {
    return updateDoc(doc(db, COLLECTIONS.USERS, docID), data)
}

const searchUsers = async (searchText) => {
    const usersSearchQuery = query(usersCollectionRef, where('name_lowercase', '==', searchText.toLowerCase()))
    return getDocs(usersSearchQuery)
}

const getUsers = async (lastVisible) => {
    if (!lastVisible) {
        const first = query(usersCollectionRef, orderBy('name'), limit(5))
        return getDocs(first)
    } else {
        const next = query(usersCollectionRef, orderBy('name'), startAfter(lastVisible), limit(5));
        return getDocs(next)
    }

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
    searchUsers,
    getUsers,
    addProjectToFirebase,
    updateProjectsCollection
}