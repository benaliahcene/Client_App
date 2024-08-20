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

export const getCategories = (
  userId: string,
  setCategories: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const categoriesRef = collection(db, "categories");


  const q = query(categoriesRef,where("userId", "==", userId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const categories: any[] = [];
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    setCategories(categories);
  });

  // Return the unsubscribe function to stop listening for updates
  return unsubscribe;
};

export const createCategory = async (category: any) => {
  const userId=auth.currentUser?.uid

  const categoriesRef = collection(db, "categories");
  return await addDoc(categoriesRef, {...category , userId});
};

export const updateCategory = async (category: any) => {
  const categoryDoc = doc(db, "categories", category.id);
  await updateDoc(categoryDoc, category);
};

export const deleteCategory = async (categoryId: string) => {
  const categoryDoc = doc(db, "categories", categoryId);
  await deleteDoc(categoryDoc);
};
