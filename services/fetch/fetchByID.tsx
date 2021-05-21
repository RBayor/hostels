import { firestore } from "../authentication/firebaseClient";

const fetchByID = async (id: string) => {
  // console.log(`${hostelName}\n${campus}\n${hostelImg}`);
  const snapshot = await firestore
    .collection("hostels")
    .where("id", "==", id)
    .get();

  // snapshot.docs.forEach((doc) => console.log(doc.data()));

  return snapshot.docs;
};

export { fetchByID };
