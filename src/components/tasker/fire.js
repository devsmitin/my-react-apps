import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { fireconfig } from "../../config";

const app = initializeApp(fireconfig);
const db = getDatabase(app);

export const writeUserData = (user, data) => {
  set(ref(db, user), data);
};

export const getUserData = (userId) => {
  const dataref = ref(db, userId);
  return onValue(dataref, (snapshot) => {
    const data =  snapshot.val();
    console.log(`data`, data);
    return data;
  });
};
