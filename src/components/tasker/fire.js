import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { fireconfig } from "../../config";

const app = initializeApp(fireconfig);
const db = getDatabase(app);

export const writeUserData = (userId, data) => {
  const dataref = ref(db, userId);
  set(dataref, data);
};

export const getUserData = (userId, callback) => {
  const dataref = ref(db, userId);
  onValue(dataref, (snapshot) => {
    const data =  snapshot.val();
    (typeof callback == "function") && (callback(data))
  });
};
