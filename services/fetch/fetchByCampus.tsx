import { firestore } from "../authentication/firebaseClient";

const fetchByCampus = async (campus: string, maxPrice: number = 100000) => {
  const snapshot = await firestore
    .collection("hostels")
    .where("campus", "==", campus)
    .where("maxPrice", "<=", maxPrice)
    .get();

  return snapshot.docs;
};

export { fetchByCampus };
