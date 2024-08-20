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
  serverTimestamp,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export const getSalles = (
  setSalles: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const sallesRef = collection(db, "salles");
  const q = query(sallesRef);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const salles: any[] = [];
    querySnapshot.forEach((doc) => {
      salles.push(doc.data());
    });
    setSalles(salles);
  });

  // Return the unsubscribe function to stop listening for updates
  return unsubscribe;
};

export const getSallesByUserId = async (userId: string) => {
  const sallesRef = collection(db, "salles");
  const q = query(sallesRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const salles: any[] = [];
  querySnapshot.forEach((doc) => {
    salles.push(doc.data());
  });
  return salles;
};

export const getSalleById = async (salleId: string) => {
  const sallesRef = collection(db, "salles");
  const q = query(sallesRef, where("id", "==", salleId));
  const querySnapshot = await getDocs(q);
  const salles: any[] = [];
  querySnapshot.forEach((doc) => {
    salles.push(doc.data());
  });
  return salles;
};

export const createSalle = async (salle: any) => {
  const sallesRef = collection(db, "salles");
  salle.timestamp = serverTimestamp(); // Add a timestamp to the salle
  return await addDoc(sallesRef, salle);
};

export const updateSalle = async (salle: any) => {
  const salleDoc = doc(db, "salles", salle.id);
  await updateDoc(salleDoc, salle);
};

export const deleteSalle = async (salleId: string) => {
  const salleDoc = doc(db, "salles", salleId);
  await deleteDoc(salleDoc);
};
