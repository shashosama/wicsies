import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Saves a user's quiz result anonymously to Firestore.
 */
export const saveResult = async (result: {
  personality: string;
  matches: string[];
  interests: string[];
}) => {
  try {
    await addDoc(collection(db, "wicsies_results"), {
      ...result,
      timestamp: serverTimestamp(),
    });
    console.log(" Result saved to Firestore");
  } catch (err) {
    console.error(" Error saving result:", err);
  }
};
