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
  const queryAux = query(songsRef, orderBy("createdAt", "asc"))

	const snapshot = await getDocs(queryAux)
    const docSnap = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //console.log(JSON.stringify(docSnap))
	return docSnap
}

export async function getNextSongs() {
	const songsRef = collection(db, "nextSongs");
  const queryAux = query(songsRef, orderBy("createdAt", "asc"))

	const snapshot = await getDocs(queryAux)
    const docSnap = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //console.log(JSON.stringify(docSnap))
	return docSnap
}

export const addNextSong = async (song) => {
  
  song.createdAt = new Date()

  try {
    await addDoc(collection(db, "nextSongs"), {
      ...song,
      nextFive: false
    });
    console.log("Canção adicionada!");
  } catch (error) {
    console.error("Erro ao adicionar canção: ", error);
  }
};

export async function getClients() {
	const songsRef = collection(db, "clients");
  const queryAux = query(songsRef, orderBy("createdAt", "desc"))

	const snapshot = await getDocs(queryAux)
    const docSnap = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return docSnap
}


export async function deleteSong(songId) {
  console.log("SongId: " + songId)
	const songsRef = doc(db, "songs", songId);

  const snapshot = await deleteDoc(songsRef)
}

export async function deleteNextSong(songId) {
  console.log("SongId: " + songId)
	const songsRef = doc(db, "nextSongs", songId);

  const snapshot = await deleteDoc(songsRef)
}