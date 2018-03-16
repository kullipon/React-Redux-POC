import * as React from 'react';
import { GridComponent, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-grids';
import { DataManager } from '@syncfusion/ej2-data';
import { DispatchProps, GridProps } from '../Interfaces/interfaces';

export class Grid extends React.Component<GridProps & DispatchProps , GridProps> { 

    fields: string[];
    grid: GridComponent | null;
    dataManager: DataManager = new DataManager(this.props.data);

    constructor(props: GridProps & DispatchProps, state: GridProps) {    
    super(props, state);  
    } 

    // Called when new props are coming from Redux
    componentWillReceiveProps(nextProps: GridProps & DispatchProps) {

        console.log('GRID componentWillReceiveProps', nextProps);

        if (nextProps !== this.props) {
            console.log('GRID props condition ok');
            console.log(nextProps.data);

            this.setState({data: nextProps.data});

            if (this.grid != null) {

            this.dataManager.dataSource.json = []; 

            this.grid.editSettings.allowEditing = true;              

            let keys: string[] = Object.keys(nextProps.data);
            console.log('keys count:', keys.length);
            for (var key of keys) {                 
                if (key in nextProps.data) {                      
                    console.log('ROW', nextProps.data[key]);  
                    let tab: object = nextProps.data[key];   
                    this.dataManager.insert(tab);                        

                    // for (let i = 0 ; i < tab.length  ; i++ ) {
                    //     console.log(tab[i]);
                    //     this.dataManager.insert(tab[i], 'test');    
                                                    
                    // }  
                    }      
                }   
            this.grid.refresh();    
        }
    }
}
  
    render() {
        return (          
        <GridComponent dataSource={this.dataManager} ref={(gridComp) => { this.grid = gridComp; }}> 
           <ColumnsDirective >
                <ColumnDirective field="id" width="100" headerTextAlign="center" />
                <ColumnDirective field="title" width="100" headerTextAlign="center" />
                <ColumnDirective field="tracks" width="100" headerTextAlign="center" />
                <ColumnDirective field="year" width="100" headerTextAlign="center"/>
            </ColumnsDirective>
        </GridComponent>        
        );
    }
}
