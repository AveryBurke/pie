export default function filterReducer(state: Filter, action: FilterDispatch): Filter {
    const {
        type,
        payload
    } = action
    switch (type) {
        case 'update_filter_key':
        case 'update_filter_set':
        case 'update_filter_selected':
            return {
                ...state,
                ...payload,
                lastChange:type
            }
        default:
            return state
    }
}