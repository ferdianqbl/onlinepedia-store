import {
  addDoc,
  collection,
  doc,
  getDoc,
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
  confirmPassword: string;
  phone: string;
  role?: string;
}) {
  try {
    const q = query(collection(db, "users"), where("email", "==", data.email));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (users.length > 0)
      return { status: false, message: "Email already exists" };
    if (data.password !== data.confirmPassword)
      return { status: false, message: "Passwords do not match" };

    if (!data.role) data.role = "member";
    data.password = await bcrypt.hash(data.password, 10);

    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
    };

    await addDoc(collection(db, "users"), newUser);
    return { status: true, message: "User created successfully" };
  } catch (e) {
    return { status: false, message: "Error creating user" };
  }
}

export async function signIn(data: { email: string; password: string }) {
  try {
    const q = query(collection(db, "users"), where("email", "==", data.email));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (users.length <= 0) return { status: false, message: "Login Failed" };
    const user: any = users[0];
    const match = await bcrypt.compare(data.password, user.password);
    if (!match) throw new Error("Login Failed");
    return { status: true, message: "Login successful", user };
  } catch (error) {
    return { status: false, message: "Login Failed" };
  }
}
