import { deleteDoctorData, getdoctorData, putDoctorData } from "../../common/apis/doctor.api";
import * as ActionType from '../Action/Action_Type'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getDoctor = () => async (dispatch) => {

  try {
    dispatch(loadingDoctor());
    const querySnapshot = await getDocs(collection(db, "doctors"));

    let data = [];
    console.log(data);
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() })
      // console.log(`${doc.id} => ${doc.data()}`);

    });

    dispatch({ type: ActionType.GET_DOCTORS, payload: data })

    // getdoctorData()
    //   .then((data) => dispatch(({ type: ActionType.GET_DOCTORS, payload: data.data })));


  }
  catch (error) {
    // console.log(error);
    dispatch(errorDoctor(error))
  }
}

export const loadingDoctor = () => (dispatch) => {
  dispatch({ type: ActionType.LOADING_DOCTOR })
}

export const errorDoctor = (error) => (dispatch) => {
  dispatch({ type: ActionType.ERROR_DOCTOR, payload: error })
}

export const addDoctorData = (data) => async (dispatch) => {
  try {
    dispatch(loadingDoctor());


    const docRef = await addDoc(collection(db, "doctors"), data);
    dispatch({ type: ActionType.ADD_DOCTOR, payload: { id: docRef.id, ...data } })
    // console.log("Document written with ID: ", docRef.id);

  }
  catch (error) {
    console.error("Error adding document: ", error);
    dispatch(errorDoctor(error))
  }
}

export const deleteDoctor = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "doctors", id));
    deleteDoctorData(id)
    // .then(dispatch(({ type: ActionType.DELETE_DOCTOR, payload: id })))
    // .catch(error => dispatch(errorDoctor(error.message)))

    dispatch({ type: ActionType.DELETE_DOCTOR, payload: id })

  }
  catch (error) {
    dispatch(errorDoctor(error))
  }
}

export const upadateDoctor = (data) => async (dispatch) => {
  try {
    putDoctorData(data)
    // .then((data) => dispatch(({ type: ActionType.UPDATE_DOCTOR, payload: data.data })))
    // .catch(error => dispatch(errorDoctor(error.message)))

    const DoctorRef = doc(db, "doctors", data.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(DoctorRef, {
      age : data.age,
      degree : data.degree,
      email : data.email,
      name : data.name
    });

    dispatch({ type: ActionType.UPDATE_DOCTOR, payload: data})

  }
  catch (error) {
    dispatch(errorDoctor(error))
  }
}
