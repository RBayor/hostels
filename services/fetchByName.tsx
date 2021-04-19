import { firestore } from "./firebaseClient";

interface Props {
  hostelName: String;
  ownerName: String;
}

const fetchHostelByName = async (hostelName, campus, hostelImg) => {
  console.log(`${hostelName}\n${campus}\n${hostelImg}`);
  const snapshot = await firestore
    .collection("hostels")
    .where("hostelName", "==", hostelName)
    .where("campus", "==", campus)
    .where("hostelImg", "==", hostelImg)
    .get();

  return snapshot.docs;
};

export { fetchHostelByName };
