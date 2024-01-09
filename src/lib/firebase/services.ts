import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";

const db = getFirestore(app);

export async function getData(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}

export async function getDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

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

export async function updateData({
  collectionName,
  id,
  data,
}: {
  collectionName: string;
  id: string;
  data: any;
}) {
  const res = doc(db, collectionName, id);
  const updated = await updateDoc(res, data);
  return updated;
}

export async function deleteData(collectionName: string, id: string) {
  const res = doc(db, collectionName, id);
  await deleteDoc(res);
}
