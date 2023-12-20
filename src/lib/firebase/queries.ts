import {
  query,
  collection,
  getFirestore,
  where,
  getDocs,
} from "firebase/firestore";
import app from "./init";

const db = getFirestore(app);

export const getDataByField = async (
  collectionName: string,
  field: string,
  value: string
) => {
  const q = query(collection(db, collectionName), where(field, "==", value));
  const querySnapshot = await getDocs(q);
  const res = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return res;
};
