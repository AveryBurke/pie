import { dummyValue, initialState } from "./initialState";
import createUser from "./createUser";
import generateId from "./generateId";


const makeState = (numberOfRows:number): State => {

    const data: any[] = []
    for (let i = 0; i < numberOfRows; ++i) {
        //add dummy null values. these won't be displayed to the user
        let d = {
            [`${dummyValue}_ring_key`]: `${dummyValue}_ring_value`,
            [`${dummyValue}_slice_key`]: `${dummyValue}_slice_value`,
            [`${dummyValue}_filter_key`]: `${dummyValue}_filter_value`,
            [`${dummyValue}_color_key`]: `${dummyValue}_color_value`,
            [`${dummyValue}_id`]: generateId(8),
            ...createUser()
        }
        data.push(d)
    }

    return {
        ...initialState,
        data,
        lastChange: { type: 'update_state' }
    }
}

export default makeState