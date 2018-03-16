import { ReduxState, Action } from '../Interfaces/interfaces';
import { INIT_STATE, FILTER_FROM_COMBOBOX } from '../BindActions/bindActions';
// const { Map } = require('immutable');
const { fromJS } = require('immutable');

export const globalReducer = (state: ReduxState, action: Action ) => {

    switch (action.type) {

        case  INIT_STATE:

        console.log('Action: INIT_STATE');
        console.log(action);

        if (Array.isArray(action.payload)) {

            return { widgets:  Array.from(action.payload), filters: [] };
        }

        return state;           

        case FILTER_FROM_COMBOBOX:

        console.log('Action: FILTER_COMBOBOX');
        let isStateChanged = true;

        if (!Array.isArray(action.payload)) { 

            let keys = Object.keys(state.filters);   

            for (let key of keys) {
                if (key in state.filters) {
                    if (state.filters[key] === action.payload) {
                        isStateChanged = false;
                    }
                }          
            }

            if (isStateChanged) {                  

                if (action.payload.filters.values.length > 0) {         
                    
                    let val: string[] = action.payload.filters.values;

                   // let newState: ReduxState = Map(state).set('filters', action.payload.filters.values);
                    let nested = fromJS(state).updateIn(['widgets', '1', 'data'], (data: object[]) =>  val);
                    let result: ReduxState = nested.toJS();
                    return result;
                } 
            } 
        }

        return state;

        default:
        return state || {};
    }
};