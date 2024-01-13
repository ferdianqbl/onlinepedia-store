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
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "./init";

const db = getFirestore(app);
const storage = getStorage(app);

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

export async function uploadImage(userId: string, imgFile: File) {
  if (imgFile.type !== "image/png" && imgFile.type !== "image/jpeg")
    return {
      error: 1,
      message: "File type should be png or jpeg",
      data: null,
    };
  if (imgFile.size > 1048576)
    return {
      error: 1,
      message: "File size should be less than 1MB",
      data: null,
    };
  const filename =
    "profile." +
    imgFile.name.split(".").find((e) => e === "png" || e === "jpeg");
  const storageRef = ref(storage, `images/${userId}/${filename}`);
  const uploadTask = await uploadBytesResumable(storageRef, imgFile);
  const url = await getDownloadURL(uploadTask.ref);
  return { error: 0, message: "Upload Image Successfully", data: url };
}
