import { Album, Action } from '../Interfaces/interfaces';

export const INIT_STATE: string = 'INIT_STATE';
export const FILTER_FROM_COMBOBOX: string = 'FILTER_FROM_COMBOBOX';

export const filterFromCombobox = (paramName: string, values: string[]): Action => {
    return {
                type: FILTER_FROM_COMBOBOX ,
                payload: { filters: { parameterName: paramName, values: values }}
            };            

};

export const filterFromComboboxAsync = (parameterName: string, values: string[]) => {
    return (dispatch: Function): void => {      

        // API CALL
        if (values.length > 0) {

            fetch('http://localhost:49390/api/albums/year/' + values[0] || '')
            .then((resp) => {
                console.log(resp);
                resp.json().then(data => {
                    console.log('reponse', data);
                    dispatch(filterFromCombobox(parameterName, data));                        
                });
                        
            } ).catch((resp) => {
                console.error(resp);
            });  
        }        
    };
};

export const initStateAsync = ()  => {

    return (dispatch: Function): void => {  
        
        fetch('http://localhost:51248/api/Widget')
        .then((resp) => {
                console.log('Widget API Call', resp);
                resp.json().
                then((data) => {
                console.log('API result', data);

               // dispatch(initState)
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.error(err);
            
        });
    };    
};

export const initState = (albums: Array<Album>) => { 
    return { 
            type: INIT_STATE ,
            payload: [
                    {
                    'id' : 0,
                    'name' : 'ComboBox_1',
                    'data' : albums.map(a => { return a.year; })
                    },
                    {
                    'id' : 1,
                    'name' : 'Grid_1',
                    'data' : albums
                    }
                ]
            };
};
