import { firestore } from "../firebaseClient";

const fetchByCampus = async (campus: String = "Dungu") => {
  const snapshot = await firestore
    .collection("hostels")
    .where("campus", "==", campus.toLowerCase())
    .get();
  snapshot.docs.forEach((e) => console.log(e));
  return snapshot.docs;
};

export { fetchByCampus };
