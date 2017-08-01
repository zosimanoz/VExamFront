import { SET_DEPARTMENTS } from '../actions/departments.action';
import { ADD_DEPARTMENT } from '../actions/departments.action';
import { GET_DEPARTMENTBYID } from '../actions/departments.action';


export default function games(state = [], action = {}) {
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

        case GET_DEPARTMENTBYID: {
            const index = state.findIndex(item => item.DepartmentId === action.department.DepartmentId);
            console.log("idnx",index);
            if (index > -1) {
                return state.map(item => {
                    if (item.DepartmentId === action.department.DepartmentId) {
                        console.log('here found');
                        return action.department;
                    } else {
                        console.log('not found');
                        return item;
                    }
                })
            } else {
                console.log('new dat found');
                return [
                    ...state,
                    action.department
                ]
            }
            break;
        }

        default: return state;
    }
}