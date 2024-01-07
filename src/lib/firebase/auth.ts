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
import { getDataByField } from "./queries";

const db = getFirestore(app);

type UserType = {
  name: string;
  email: string;
  password: string | null;
  phone: string | null;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function signUp(data: UserType & { confirmPassword: string }) {
  try {
    const users = await getDataByField("users", "email", data.email);
    if (users.length > 0)
      return { status: false, message: "Email already exists" };
    if (data.password !== data.confirmPassword)
      return { status: false, message: "Passwords do not match" };

    if (!data.role) data.role = "member";
    data.password = await bcrypt.hash(data.password, 10);

    const newUser: UserType = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await addDoc(collection(db, "users"), newUser);
    return { status: true, message: "User created successfully" };
  } catch (e) {
    return { status: false, message: "Error creating user" };
  }
}

export async function signIn(data: { email: string; password: string }) {
  try {
    const users = await getDataByField("users", "email", data.email);
    if (users.length <= 0) return { status: false, message: "Login Failed" };
    const user: any = users[0];
    const match = await bcrypt.compare(data.password, user.password);
    if (!match) throw new Error("Login Failed");
    return { status: true, message: "Login successful", user };
  } catch (error) {
    return { status: false, message: "Login Failed" };
  }
}

export async function signInWithGoogle(data: any) {
  try {
    const users = await getDataByField("users", "email", data.email);
    if (users.length <= 0) {
      const newUser: UserType = {
        name: data.name,
        email: data.email,
        role: "member",
        password: null,
        phone: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await addDoc(collection(db, "users"), newUser);
      return { status: true, message: "Login successful", user: newUser };
    } else return { status: true, message: "Login successful", user: users[0] };
  } catch (error) {
    return { status: false, message: "Login Failed", user: null };
  }
}
