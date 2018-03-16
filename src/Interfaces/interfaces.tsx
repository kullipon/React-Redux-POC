export interface DispatchProps {
    init?: (albums: Album[]) => void;
    filterFromCombobox?: (parameterName: string, values: string[]) => void;
    filterFromComboboxAsync?: (parameterName: string, values: string[]) => void;
 }

export interface WidgetBase {
    id: AAGUID;
    header: string;
    description: string;
}

export interface Combobox extends WidgetBase {  
    data: string[];
    isMultiSelect: boolean;
    HasToIgnoreActions: boolean;
 }

export interface Grid extends WidgetBase {
    data: Object[];
 }

export interface ComboboxProps {
    data: object[];
    reduxProps: DispatchProps;
 }

export interface GridProps {
    data: object[];
    reduxProps: DispatchProps;
 }

export interface Filters {
    parameterName: string; 
    values: string[];
 }

export interface FilterAction {
    filterFromCombobox?: (parameterName: string, values: string[]) => void;
 }
 
export interface ReduxState {
    widgets: Widget[];
    filters: string[];
 }
 
export interface PropsData {
   data: string[];
 }
 
export interface Widget {
   id: number;
   name: string;
   data: Object[];
 }
 
export interface Album {
   id: number;
   title: string;
   tracks: string;
   year: string;
 }
 
export interface DataArray<T> {
   data: T[];
 }

export interface ComboboxState {
     data: string[];
     selectedItem: string;
 }

export interface Action {
    type: string;
    payload: FilterFromComboboxPayload | Widget[];
}

export interface FilterFromComboboxPayload {
    filters: Filters;
}
