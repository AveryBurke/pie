export default function stateReducer(state: State, action: Disparcth): State {
    const {
        type,
        payload
    } = action
    switch (type) {
        case 'update_data':
            return {
                ...state,
                data: payload,
                lastChange:{type}
            }
        case 'update_parameter_key':
            return {
                ...state,
                parameters:{
                    ...state.parameters,
                    [payload.parameter]:{
                        ...state.parameters[payload.parameter],
                        key:payload.key
                    }
                },
                lastChange:{type,parameter:payload.parameter}
            }
        case 'update_parameter_set':
            return {
                ...state,
                parameters:{
                    ...state.parameters,
                    [payload.parameter]:{
                        ...state.parameters[payload.parameter],
                        set:payload.set
                    }
                },
                lastChange:{type,parameter:payload.parameter}
            }
        case 'update_state':
            return payload
        case 'reset_parameter':
            return {
                ...state,
                parameters:{
                    ...state.parameters,
                    [payload.parameter]:payload.initialState.parameters[payload.parameter]
                },
                lastChange:{type,parameter:payload.parameter}
            }
        default:
            return state
    }
}