import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    DocumentReference,
    serverTimestamp,
  } from "firebase/firestore";
  import { auth, db } from "@/config/firebaseConfig";
  
  
  export const createCommande = async (tableId:string,commande: any ) => {
  
    const commandesRef = collection(db, "commandes");
    // return await addDoc(commandesRef, {...commande,tableId,status:"pending"});
    let timestamp = serverTimestamp(); // Add a timestamp to the salle
    const docRef: DocumentReference = await addDoc(commandesRef, {...commande, tableId, status: "pending",timestamp});
     return docRef.id;

  };
  

export const updateCommande = async (commandeId: string, commande: any) => {
    const commandeDoc = doc(db, "commandes", commandeId);
    await updateDoc(commandeDoc, commande);
  }