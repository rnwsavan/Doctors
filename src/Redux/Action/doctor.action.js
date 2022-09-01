import { deleteDoctorData, getdoctorData, putDoctorData } from "../../common/apis/doctor.api";
import * as ActionType from '../Action/Action_Type'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

    const rendomStr = Math.floor(Math.random() * 10000000).toString();

    const doctorRef = ref(storage, "doctors/" + rendomStr);

    uploadBytes(doctorRef, data.upload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(async (url) => {
            const docRef = await addDoc(collection(db, "doctors"), {
              age: data.age,
              degree: data.degree,
              email: data.email,
              name: data.name,
              url: url,
              fileName: rendomStr
            });
            dispatch({
              type: ActionType.ADD_DOCTOR, payload: {
                id: docRef.id,
                age: data.age,
                degree: data.degree,
                email: data.email,
                name: data.name,
                url: url,
                fileName: rendomStr
              }
            })
          })
      });


    // const docRef = await addDoc(collection(db, "doctors"), data);
    // dispatch({ type: ActionType.ADD_DOCTOR, payload: { id: docRef.id, ...data } })
    // console.log("Document written with ID: ", docRef.id);

  }
  catch (error) {
    console.error("Error adding document: ", error);
    dispatch(errorDoctor(error))
  }
}

export const deleteDoctor = (data) => async (dispatch) => {
  try {

    const deleteRef = ref(storage, 'doctors/' + data.fileName);


    deleteObject(deleteRef).then(async () => {

      await deleteDoc(doc(db, "doctors", data.id));
      // deleteDoctorData(id)


      dispatch({ type: ActionType.DELETE_DOCTOR, payload: data.id })

    }).catch((error) => {
      dispatch(errorDoctor(error))
    });
    // deleteDoctorData(id)
  }
  catch (error) {
    dispatch(errorDoctor(error))
  }
}

export const upadateDoctor = (data) => async (dispatch) => {
  try {
    putDoctorData(data)
    const DoctorRef = doc(db, "doctors", data.id);
    console.log(data);

    if (typeof data.upload === "string") {

      await updateDoc(DoctorRef, {
        age: data.age,
        degree: data.degree,
        email: data.email,
        name: data.name,
        url: data.url
      });

      dispatch({ type: ActionType.UPDATE_DOCTOR, payload: data })
    }
    else {
      console.log("Data with img")
      const deleteDocRef = ref(storage, 'doctors/' + data.fileName);


      deleteObject(deleteDocRef)
        .then(
          async () => {

            const rendomStr = Math.floor(Math.random() * 10000000).toString();

            const doctorRefadd = ref(storage, "doctors/" + rendomStr);

            uploadBytes(doctorRefadd, data.upload)

              .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                  .then(async (url) => {
                    await updateDoc(DoctorRef, {
                      age: data.age,
                      degree: data.degree,
                      email: data.email,
                      name: data.name,
                      url: url,
                      fileName: rendomStr
                    });
                    dispatch({
                      type: ActionType.UPDATE_DOCTOR, payload: {
                        ...data, url: url,
                        fileName: rendomStr
                      }
                    })
                  })
              })
          })
    }



  }
  catch (error) {
    dispatch(errorDoctor(error))
  }
}
