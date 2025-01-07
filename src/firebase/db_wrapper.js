import { db, collections } from './config.js';
import { getDocs, addDoc, updateDoc, deleteDoc, getDoc, doc, collection } from "firebase/firestore";

const custom_db = {};


collections.forEach((coll) => {
    custom_db[coll.name] = {
        list: async () => {
            const querySnapshot = await getDocs(collection(db, coll.name));
            
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    $id: doc.id,
                    ...doc.data()
                });
            });

            return data;
        },
        get: async (id) => {
            const docRef = doc(db, coll.name, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return {
                    $id: docSnap.id,
                    ...docSnap.data()
                };
            } else {
                console.log("No such document!");
            }
        },
        add: async (data) => {
            const res = await addDoc(collection(db, coll.name), data);
            return {
                $id: res.id,
                ...data
            };
        },
        update: async (id, data) => {
            await updateDoc(doc(db, coll.name, id), data);
        },
        delete: async (id) => {
            await deleteDoc(doc(db, coll.name, id));
        }
};
    
});


export default custom_db;