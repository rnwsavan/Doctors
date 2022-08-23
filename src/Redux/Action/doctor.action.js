import { deleteDoctorData, getdoctorData,  putDoctorData } from "../../common/apis/doctor.api";
import * as ActionType from '../Action/Action_Type'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase";

export const getDoctor = () => (dispatch) => {

  try {
    dispatch(loadingDoctor());
    
    getdoctorData()
      .then((data) => dispatch(({ type: ActionType.GET_DOCTORS, payload: data.data })));


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

export const addDoctorData = (data)  => async (dispatch) => {
  try {
    dispatch(loadingDoctor());
   

    const docRef = await addDoc(collection(db, "doctors"), data);
    dispatch({type : ActionType.ADD_MEDICINE, payload : {id:docRef.id, ...data}})
    // console.log("Document written with ID: ", docRef.id);

  }
  catch (error) {
    console.error("Error adding document: ", error);
    dispatch(errorDoctor(error))
  }
}

export const deleteDoctor = (id) => (dispatch) => {
  try {
    deleteDoctorData(id)
      .then(dispatch(({ type: ActionType.DELETE_DOCTOR, payload: id })))
      .catch(error => dispatch(errorDoctor(error.message)))
   
  }
  catch (error) {
    dispatch(errorDoctor(error))
  }
}

export const upadateDoctor = (data) => (dispatch) => {
  try {
    putDoctorData(data)
    .then((data) => dispatch(({ type: ActionType.UPDATE_DOCTOR, payload: data.data })))
    .catch(error => dispatch(errorDoctor(error.message)))
    
  }
  catch (error) {
    dispatch(errorDoctor(error))
  }
}
