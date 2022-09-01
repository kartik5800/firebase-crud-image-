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
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";


// get doctor
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


//post doctor
export const postdoctor = (data) => async (dispatch) => {
  console.log(data);
  // dispatch(loadingdoctor())
  try {
    let rendomStr = Math.floor(Math.random() * 1000000).toString();
    const doctorRef = ref(storage, "doctor/" + rendomStr);
    uploadBytes(doctorRef, data.file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        const docRef = await addDoc(collection(db, "doctor"), {
          name: data.name,
          designation: data.designation,
          salary: data.salary,
          url:url,
          fileName: rendomStr
        });
        console.log("Document written with ID: ", docRef.id);
        dispatch({
          type: ActionTypes.POST_DOCTOR,
          payload: {
            id: docRef.id,
            name: data.name,
            designation: data.designation,
            salary: data.salary,
            url: url,
            fileName: rendomStr
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


// update doctor
export const updatedoctor = (data) => async (dispatch) => {
  // dispatch(loadingdoctor())
  try {
    const washingtonRef = doc(db, "doctor", data.id);
    if (typeof data.file === "string") {
      await updateDoc(washingtonRef, {
        name: data.name,
        designation: data.designation,
        salary: data.salary,
        url: data.url
      });

      dispatch({ type: ActionTypes.UPDATE_DOCTOR, payload: data });
    } else {
      // console.log("image with");
      const doctorRefdel = ref(storage, 'doctor/' + data.fileName);

      // Delete the file
      deleteObject(doctorRefdel).then(async () => {
        let rendomStr = Math.floor(Math.random() * 1000000).toString();
        const doctorRef = ref(storage, 'doctor/' + rendomStr);

        uploadBytes(doctorRef, data.file)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then(async (url) => {
                // console.log("Document written with ID: ", docRef.id);
                await updateDoc(washingtonRef, {
                  name: data.name,
                  designation: data.designation,
                  salary: data.salary,
                  url: url,
                  fileName: rendomStr
                });
                dispatch({ type: ActionTypes.UPDATE_DOCTOR, payload: { ...data, fileName: rendomStr, url: url, } })
              })
          }
          )
      })
    }
  } catch (error) {
    dispatch(errordoctor(error.message));
  }
}


//delete doctor
export const deletedoctor = (data) => async (dispatch) => {
  // dispatch(loadingdoctor())
  try {
    const desertRef = ref(storage, 'doctor/' + data.fileName);
    deleteObject(desertRef).then(async () => {
      dispatch(loadingdoctor())
      await deleteDoc(doc(db, "doctor", data.id));
      dispatch({ type: ActionTypes.DELETE_DOCTOR, payload: data.id });
    }).catch((error) => {
      dispatch(errordoctor(error.message))
    });
  }
  catch (error) {
    dispatch(errordoctor(error.message))
  }
}












export const loadingdoctor = () => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_DOCTOR });
};

export const errordoctor = (error) => (dispatch) => {
  dispatch({ type: ActionTypes.ERROE_DOCTOR, payload: error });
};
