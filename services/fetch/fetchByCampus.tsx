import { firestore } from "../authentication/firebaseClient";

const fetchByCampus = async (campus: string, maxPrice: number = 100000) => {
  // console.log(`campus ${campus} ----------price ${maxPrice}`);
  const snapshot = await firestore
    .collection("hostels")
    .where("campus", "==", campus)
    .where("maxPrice", "<=", maxPrice)
    .get();
  // snapshot.docs.forEach((e) => console.log(e.data()));
  // console.log(snapshot.empty);
  return snapshot.docs;
};

export { fetchByCampus };
