import { firestore } from "../authentication/firebaseClient";

const fetchByQuery = async (query: string) => {
  //   console.log(`query ${query}`);
  const snapshot = await firestore
    .collection("hostels")
    .where("hostelName", "==", query)
    .get();
  // snapshot.docs.forEach((e) => console.log(e));

  if (snapshot.empty) {
    return [];
  } else {
    return snapshot.docs;
  }
};

export { fetchByQuery };
