import { deleteRequest, getRequest, postRequest, putRequest } from "../request"

export const getdoctorData = () => {
    return getRequest('doctors');
}

export const postDoctorData = (data) => {
    return postRequest('doctors',data);
}

export const deleteDoctorData = (id) => {
    return deleteRequest('doctors/', id)
}

export const putDoctorData = (data) => {
    return putRequest('doctors/', data)
}