import * as ActionTypes from "../ActionType"

const initalState = {
    isLoading: false,
    doctor: [],
    error: ''
}



export const doctorReducer = (state = initalState, action) => {
    console.log(action.type, action.payload);

    switch (action.type) {
        case ActionTypes.GET_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: action.payload,
                error: ''
            }
        case ActionTypes.POST_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: state.doctor.concat(action.payload),
                error: ''
            }
            case ActionTypes.DELETE_DOCTOR:
                return {
                    ...state,
                    isLoading: false,
                    doctor: state.doctor.filter((l) => l.id !== action.payload),
                    error: ''
                }

                case ActionTypes.UPDATE_DOCTOR:
                return {
                    ...state,
                    isLoading: false,
                    doctor: state.doctor.map((l) => {
                        if (l.id === action.payload.id) {
                            return action.payload
                        }else{
                            return l
                        }
                    }),
                    error: ''
                }


                case ActionTypes.LOADING_DOCTOR:
            return {
                ...state,
                isLoading: true,
                errors: ''
            }


            case ActionTypes.ERROE_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: [],
                errors: action.payload
            }
        default:
            return state;
    }
}


