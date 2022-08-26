import { getrequest , postrequest , deletereuest, putrequest} from "../request"


export const getdoctordata =(data)  => {
    return getrequest("doctor")
}

export const postdoctordata =(data)  => {
    return postrequest("doctor",data)
}


export const deletedoctordata = (id) => {
    return deletereuest('doctor/', id)
}

export const updatedoctordata = (data) =>  {
    return putrequest ("doctor/" , data.id)
}