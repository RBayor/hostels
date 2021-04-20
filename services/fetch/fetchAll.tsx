import { firestore } from "../firebaseClient";

const getHostels = async () => {
  const snapshot = await firestore
    .collection("hostels")
    .orderBy("hostelName", "desc")
    .limit(10)
    .get();
  // snapshot.docs.forEach((doc) => console.log(doc.data()));
  // console.log(snapshot.docs);
  return snapshot.docs;
};

export { getHostels };
