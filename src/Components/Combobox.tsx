import * as React from 'react';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { ComboboxState, ComboboxProps } from '../Interfaces/interfaces';
import { DataManager } from '@syncfusion/ej2-data';

export class ComboBox extends React.Component<ComboboxProps, ComboboxState> {  

  public comboBoxComponent: ComboBoxComponent | null;
  public dataManager: DataManager = new DataManager();

  constructor(props: ComboboxProps, state: ComboboxState ) {
  super(props, state);  
  this.state = {data: [] , selectedItem: '' };
  console.log('Combobox props');
  console.log(this.props);
  this.onValueChange.bind(this);
}

componentWillReceiveProps(nextProps: ComboboxProps) {
  console.log('Combobox WillReceiveProps called');
  console.log('nextProps', nextProps);
  console.log('this.props', this.props);
  if (nextProps !== this.props) {
    console.log('Combobox new State !'); 

    if (this.comboBoxComponent !== null ) {
      this.comboBoxComponent.dataSource = [];
    }
      
    this.dataManager.dataSource.json = [];
    for (let data of nextProps.data) {
      this.dataManager.insert(data);
      }

    console.log('combobox state', this.state);  
    console.log(this.comboBoxComponent);       
  }  
}

onValueChange = () => {

  if (this.comboBoxComponent !== null) {
    console.log('props:', this.props);
    console.log('filter:', this.props.reduxProps.filterFromCombobox);
    if (this.props.reduxProps.filterFromCombobox !== undefined) {
      console.log('value:', this.comboBoxComponent.value);
      console.log(this.comboBoxComponent.value, this.props.reduxProps.filterFromCombobox);

      if (this.comboBoxComponent.value !== null) {
        let newValue: string = this.comboBoxComponent.value.toString();  
        
        if (this.props.reduxProps.filterFromComboboxAsync !== undefined) {

          this.props.reduxProps.filterFromComboboxAsync('Year', new Array<string>(newValue));        
        }

       // this.props.reduxProps.filterFromCombobox('Year', [newValue]);
      }      
    }
  }
 
}

  render() {
    return (    
      <div>       
        <ComboBoxComponent id="comboelement" width="500" dataSource={this.dataManager} change={this.onValueChange} ref={(combobox) => { this.comboBoxComponent = combobox; }}/>     
        </div> 
    );
  }
}