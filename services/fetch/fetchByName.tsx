import { firestore } from "../authentication/firebaseClient";

const fetchHostelByName = async (
  hostelName: String,
  campus: String,
  hostelImg: String
) => {
  // console.log(`${hostelName}\n${campus}\n${hostelImg}`);
  const snapshot = await firestore
    .collection("hostels")
    .where("hostelName", "==", hostelName)
    .where("campus", "==", campus)
    .where("hostelImg", "==", hostelImg)
    .get();

  return snapshot.docs;
};

export { fetchHostelByName };
