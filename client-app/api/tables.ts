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
  orderBy,
  limit,
  getDoc,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export const getTables = (
  setTables: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const tablesRef = collection(db, "tables");
  const q = query(tablesRef);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const tables: any[] = [];
    querySnapshot.forEach((doc) => {
      tables.push(doc.data());
    });
    setTables(tables);
  });

  // Return the unsubscribe function to stop listening for updates
  return unsubscribe;
};


export const createTable = async (table: any) => {
  const tablesRef = collection(db, "tables");
  table.timestamp = serverTimestamp(); // Add a timestamp to the salle
  return await addDoc(tablesRef, table);
};

export const updateTable = async (table: any) => {
  const tableDoc = doc(db, "tables", table.id);
  await updateDoc(tableDoc, table);
};

export const deleteTable = async (tableId: string) => {
  const tableDoc = doc(db, "tables", tableId);
  await deleteDoc(tableDoc);
};

export const getLatestTable = async () => {
  const sallesRef = collection(db, "tables");
  const q = query(sallesRef, orderBy("timestamp", "desc"), limit(1));
  const querySnapshot = await getDocs(q);
  let latestSalle: any = null;
  querySnapshot.forEach((doc) => {
    latestSalle = doc.data();
  });
  return latestSalle;
};


export const getTableById = async (tableId: string) => {
  const tableDoc = doc(db, "tables", tableId);
  const docSnap = await getDoc(tableDoc);
  return {...docSnap.data(), id: docSnap.id};
}

export const toggleTableStatus = async (tableId: string) => {
  const table = await getTableById(tableId);
  const tableDoc = doc(db, "tables", tableId);
  await updateDoc(tableDoc, {
    ...table,
    status: table?.status === "open" ? "closed" : "open",
  });
}