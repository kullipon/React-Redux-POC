import * as React from 'react';
import './App.css';
import { Grid } from './Components/Grid';
import { ComboBox } from './Components/Combobox';
import { connect } from 'react-redux';
import { filterFromCombobox, initState, initStateAsync, filterFromComboboxAsync } from './BindActions/bindActions';
import { ReduxState, DispatchProps, Album } from './Interfaces/interfaces';

const logo = require('./logo.svg');

let Albums = [
              {id : 1, title : 'Queen', tracks : '10', year : '1973'}, 
              {id : 2, title : 'Queen II', tracks : '10', year : '1974'}, 
              {id : 3, title : 'Sheer Heart Attack', tracks : '10', year : '1974'},
              {id : 4, title : 'A Night At The Opera', tracks : '10' , year : '1975'},
              {id : 5, title : 'A Day at the Races', tracks : '10' , year : '1976'},
              {id : 6, title : 'News of the World', tracks : '11', year : '1977'},
              {id : 7, title : 'Jazz', tracks : '11', year : '1978'},
              {id : 8, title : 'The Game', tracks : '11', year : '1980'},
              {id : 9, title : 'Flash Gordon', tracks : '11', year : '1981'},
              {id : 10, title : 'Hot Space', tracks : '9' , year : '1982'},
              {id : 11, title : 'The Works', tracks : '11', year : '1984'},            
              {id : 12, title : 'A kind of Magic', tracks : '10', year : '1986'}, 
              {id : 13, title : 'The Miracle', tracks : '10', year : '1989'}, 
              {id : 14, title : 'Innuendo', tracks : '10', year : '1991'},
              {id : 15, title : 'Made in Heaven', tracks : '10', year : '1995'}
            ];

class App extends React.Component <ReduxState & DispatchProps, ReduxState> {  

    constructor(reduxState: ReduxState & DispatchProps, state: ReduxState) {
      super(reduxState, state);     
      initStateAsync();
      this.initState();
      this.state = this.props; 
      console.log('constructor app:', this.state);
    }    

    initState = (): void => {
      if (this.props.init !== undefined) {
        // call API
        this.props.init(Albums);      
        }          
    }    

    componentWillReceiveProps(nextProps: ReduxState & DispatchProps) {
        
      if (nextProps !== this.props) {
          console.log('componentWillReceiveProps new APP State !');
          console.log(nextProps);
          this.setState(nextProps);
      }
  }
 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Powered by React & Redux</h1>
        </header>
        <p className="App-intro"/>            
        <ComboBox data={this.props.widgets !== undefined ? this.props.widgets[0].data : []} reduxProps={this.props} /> 
        <Grid data={this.props.widgets != null ? this.props.widgets[1].data : []} reduxProps={this.props} />     

      </div>
    );
  }
}
// <Grid data={this.props.widgets != null ? this.props.widgets[1].data.map(e => { return e.toString() }) : []} reduxProps={this.props} />      

// Map Redux State to React Props
const mapStateToProps = (state: ReduxState & DispatchProps) => {
  console.log('state from mapStateToProps:');
  console.log(state);
  return Object.assign(state);
};

// Map Dispatch Actions to Props
const mapDispatchToProps = (dispatch: Function) => {
  return {
    init: (albums: Array<Album>) => { dispatch(initState(albums)); },
    filterFromCombobox: (paramName: string, values: string[]) => { dispatch(filterFromCombobox(paramName, values)); },
    filterFromComboboxAsync: (paramName: string, values: string[]) => { dispatch(filterFromComboboxAsync(paramName, values)); }
  };
};

// export default App;
export default connect<ReduxState & DispatchProps>(mapStateToProps, mapDispatchToProps)(App);

/*  GLOBAL STATE MODEL
Widgets: [
  {  
    'name' : 'ComboBox_1',
    'data' : []
  },
  {
    'name' : 'Grid_1',
    'data' : []
  }
],
Filters: []

*/