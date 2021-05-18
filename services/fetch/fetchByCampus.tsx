import { firestore } from "../authentication/firebaseClient";

const fetchByCampus = async (campus: string, price: number) => {
  const snapshot = await firestore
    .collection("hostels")
    .where("campus", "==", campus)
    .where("maxPrice", "<=", price.toString())
    .get();
  snapshot.docs.forEach((e) => console.log(e));
  return snapshot.docs;
};

export { fetchByCampus };
