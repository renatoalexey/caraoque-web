// pages/api/firestore.js
import { db } from "@/lib/firebase";
import { collection, doc, addDoc, getDocs,  deleteDoc, orderBy, query } from "firebase/firestore";

export default async function handler(req, res, collectionName) {
  const clientsRef = collection(db, collectionName);

  if (req.method === "POST") {
    try {
      const docRef = await addDoc(clientsRef, req.body);
      res.status(200).json({ id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const snapshot = await getDocs(clientsRef);
      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {

  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export async function getSongs() {
	const songsRef = collection(db, "songs");
  const queryAux = query(songsRef, orderBy("createdAt", "desc"))

	const snapshot = await getDocs(queryAux)
    const docSnap = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(JSON.stringify(docSnap))
	return docSnap
}

export async function deleteSong(songId) {
	const songsRef = doc(db, "songs");

  const snapshot = await deleteDoc(songsRef, songId)

  console.log(JSON.stringify(snapshot))

}