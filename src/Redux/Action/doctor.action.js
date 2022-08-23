import { deleteDoctorData, getdoctorData, postDoctorData, putDoctorData } from "../../common/apis/doctor.api";
import { BASE_URL } from "../../Urls/base_url"
import * as ActionType from '../Action/Action_Type'

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

export const addDoctorData = (data) => (dispatch) => {
  try {
    dispatch(loadingDoctor());
    setTimeout(() => {
      return postDoctorData(data)
        .then((data) => dispatch(({ type: ActionType.ADD_DOCTOR, payload: data.data })))
        .catch(error => dispatch(errorDoctor(error.message)))
    }, 2000);


   
    //   return fetch(BASE_URL + 'doctors', {
    //     method: 'POST', // or 'PUT'
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then(response => {
    //       if (response.ok) {
    //         return response;
    //       } else {
    //         var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //         error.response = response;
    //         throw error;
    //       }
    //     },
    //       error => {
    //         var errmess = new Error(error.message);
    //         throw errmess;
    //       })
    //     .then(response => response.json())
    //     .then(adddoctor => dispatch(({ type: ActionType.ADD_DOCTOR, payload: adddoctor })))
    //     .catch(error => dispatch(errorDoctor(error.message)))
    // }, 2000);


  }
  catch (error) {
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
