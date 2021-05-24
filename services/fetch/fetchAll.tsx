import { firestore } from "../authentication/firebaseClient";

const fetchAllHostels = async () => {
  const snapshot = await firestore
    .collection("hostels")
    .orderBy("hostelName", "desc")
    .limit(20)
    .get();
  // snapshot.docs.forEach((doc) => console.log(doc.data()));
  // console.log(snapshot.docs);
  return snapshot.docs;
};

export { fetchAllHostels };
