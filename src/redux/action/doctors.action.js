import * as ActionTypes from "../ActionType";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../Firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

export const doctordata = (data) => async (dispatch) => {
  dispatch(loadingdoctor());
  try {
    let data = [];
    const getref = await getDocs(collection(db, "doctor"));
    getref.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    dispatch({ type: ActionTypes.GET_DOCTOR, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const postdoctor = (data) => async (dispatch) => {
  console.log(data);
  // dispatch(loadingdoctor())
  try {
    const doctorRef = ref(storage, "doctor/" + data.file.name);
    uploadBytes(doctorRef, data.file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        const docRef = await addDoc(collection(db, "doctor"), {
          name: data.name,
          designation: data.designation,
          salary: data.salary,
          url: url,
        });
        // console.log("Document written with ID: ", docRef.id);
        dispatch({
          type: ActionTypes.POST_DOCTOR,
          payload: {
            id: docRef.id,
            name: data.name,
            designation: data.designation,
            salary: data.salary,
            url: url,
          },
        });
      });
      // console.log('Uploaded a blob or file!');
    });
  } catch (error) {
    dispatch(errordoctor(error.message));
    console.error("Error adding document: ", error);
  }
};

export const deletedoctor = (id) => async (dispatch) => {
  // dispatch(loadingdoctor())
  try {
    await deleteDoc(doc(db, "doctor", id));
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: ActionTypes.DELETE_DOCTOR, payload: id });
};

export const updatedoctor = (data) => async (dispatch) => {
  // dispatch(loadingdoctor())
  try {
    const washingtonRef = doc(db, "doctor", data.id);

    await updateDoc(washingtonRef, {
      name: data.name,
      designation: data.designation,
      salary: data.salary,
    });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: ActionTypes.UPDATE_DOCTOR, payload: data });
};

export const loadingdoctor = () => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_DOCTOR });
};

export const errordoctor = (error) => (dispatch) => {
  dispatch({ type: ActionTypes.ERROE_DOCTOR, payload: error });
};
