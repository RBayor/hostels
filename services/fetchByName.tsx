import { firestore } from "./firebaseClient";

interface Props {
  hostelName: String;
  ownerName: String;
}

const fetchHostelByName = async () => {
  const snapshot = await firestore
    .collection("hostels")
    .orderBy("campus")
    .limit(10)
    .get();
  // snapshot.docs.forEach((doc) => console.log(doc.data()));
  // console.log(snapshot.docs);
  return snapshot.docs;
};

export { fetchHostelByName };
