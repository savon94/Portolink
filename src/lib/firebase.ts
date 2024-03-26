import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable, type Readable, derived } from "svelte/store";

const firebaseConfig = {
    apiKey: "AIzaSyCr-xL3uaZInYtEH-6UNIytQtVfxOIBMZg",
    authDomain: "portolink-5f8be.firebaseapp.com",
    projectId: "portolink-5f8be",
    storageBucket: "portolink-5f8be.appspot.com",
    messagingSenderId: "705234516979",
    appId: "1:705234516979:web:b3dc91552451e06366b086",
    measurementId: "G-XN45VTX19L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();


//return a store with the current firebase user
function userStore() {
    let unsubscribe: () => void;

    if (!auth || !globalThis.window) {
        console.warn('Auth is not initialized or not in browser');
        const { subscribe } = writable<User | null>(null);
        return {
            subscribe,
        }
    }

    const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
            set(user);
        });

        return () => unsubscribe();
    });

    return {
        subscribe,
    };
}

export const user = userStore();

/**
 * @param  {string} path document path or reference
 * @param  {any} startWith optional default data
 * @returns a store with realtime updates on document data
 */

export function docStore<T>(
    path: string,
) {
    let unsubscribe: () => void;

    const docRef = doc(db, path);

    const { subscribe } = writable<T | null>(null, (set) => {
        unsubscribe = onSnapshot(docRef, (snapshot) => {
            set((snapshot.data() as T) ?? null);
        });

        return () => unsubscribe();
    });

    return {
        subscribe,
        ref: docRef,
        id: docRef.id,
    };
}



interface UserData {
    username: string;
    bio: string;
    photoURL: string;
    links: any[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
    if ($user) {
        return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
    } else {
        set(null);
    }
});  