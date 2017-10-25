import { SET_DEPARTMENTS } from '../actions/departments.action';
import { ADD_DEPARTMENT } from '../actions/departments.action';
import { GET_DEPARTMENTBYID, UPDATE_DEPARTMENT,DELETE_DEPARTMENT } from '../actions/departments.action';


export default function departments(state = [], action = {}) {
    switch (action.type) {

        case SET_DEPARTMENTS: {
            return action.departments;
            break;
        }

        case ADD_DEPARTMENT: {
            return [
                ...state,
                action.department
            ]
            break;
        }

         case UPDATE_DEPARTMENT: {
            return [
                ...state,
                action.department
            ]
            break;
        }

        case GET_DEPARTMENTBYID: {
            const index = state.findIndex(item => item.DepartmentId === action.department.DepartmentId);
            if (index > -1) {
                return state.map(item => {
                    if (item.DepartmentId === action.department.DepartmentId) {
                        return action.department;
                    } else {
                        return item;
                    }
                })
            } else {
                return [
                    ...state,
                    action.department
                ]
            }
            break;
        }

        case DELETE_DEPARTMENT: {
            return state.filter(item => item.DepartmentId !== action.payload.departmentId);
            break;
        }

        default: return state;
    }
}