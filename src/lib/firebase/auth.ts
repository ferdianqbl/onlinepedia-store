import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const db = getFirestore(app);

export async function signUp(data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
}) {
  const q = query(collection(db, "users"), where("email", "==", data.email));
  const querySnapshot = await getDocs(q);
  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (users.length > 0)
    return { status: false, message: "Email already exists" };

  try {
    data.role ?? "member";
    data.password = await bcrypt.hash(data.password, 10);

    await addDoc(collection(db, "users"), data);
    return { status: true, message: "User created successfully" };
  } catch (e) {
    return { status: false, message: "Error creating user" };
  }
}
