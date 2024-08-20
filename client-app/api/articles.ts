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
} from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfig";

export const getArticles = (
  userId: string,
  setArticles: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const articlesRef = collection(db, "articles");

  const q = query(articlesRef,where("userId", "==", userId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const articles: any[] = [];
    querySnapshot.forEach((doc) => {
      articles.push({ id: doc.id, ...doc.data() });
    });
    setArticles(articles);
  });

  // Return the unsubscribe function to stop listening for updates
  return unsubscribe;
};

export const createArticles = async (Articles: any) => {
  const userId=auth.currentUser?.uid;  

  const articlesRef = collection(db, "articles");
  return await addDoc(articlesRef, {...Articles,userId});
};

export const updateArticles = async (Articles: any) => {
  const articlesDoc = doc(db, "articles", Articles.id);
  await updateDoc(articlesDoc, Articles);
};

export const deleteArticles = async (articlesId: string) => {
  const articlesDoc = doc(db, "articles", articlesId);
  await deleteDoc(articlesDoc);
};
