import colorPallet from "../static/colorPallet";
const dummyValue = 'K@aOE*#73)7$P4CFO3oW'
const slicePallet = colorPallet[0]!
const ringPallet = [slicePallet[0]!]
const initialState: State = {
    data: [
        {
            [`${dummyValue}_ring_key`]: `${dummyValue}_ring_value`,
            [`${dummyValue}_slice_key`]: `${dummyValue}_slice_value`,
            [`${dummyValue}_filter_key`]: `${dummyValue}_filter_value`//<--is there a better way than adding a filter value to the data?
        }
    ],
    parameters: {
        ring: {
            key: `${dummyValue}_ring_key`,
            set: [`${dummyValue}_ring_value`],
            counts:{[`${dummyValue}_ring_value`]:1},
            pallet:{
                [`${dummyValue}_ring_key`]: ringPallet
            }
        },
        slice: {
            key: `${dummyValue}_slice_key`,
            set: [`${dummyValue}_slice_value`],
            counts:{[`${dummyValue}_slice_value`]:1},
            pallet:{
                [`${dummyValue}_slice_key`]: slicePallet
            }
        }
    },
lastChange: { type: 'update_state' }
}

export { dummyValue, initialState }
