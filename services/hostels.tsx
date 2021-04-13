import { firestore } from "./firebase";

const getHostels = async () => {
  const snapshot = await firestore.collection("hostels").get();
  snapshot.docs.forEach((doc) => console.log(doc.data()));
};

export { getHostels };
