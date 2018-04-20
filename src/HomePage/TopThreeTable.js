import React, { Component } from 'react';
import {StoresTopThree} from '../Utils/Requests/StoresTopThree';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Top3tableRow from './Top3tableRow';

class TopThreeTable extends Component {
constructor(props){
  super(props)
  this.state = {
    stores: []
  }
}

componentDidMount(){
  StoresTopThree()
  .then(response => {
    this.setState({stores:response.data});
  })
  .catch(error => {
    alert("Error" + error);
  })
}
  render() {

    return (
      <Table>
   <TableHeader>
     <TableRow>
       <TableHeaderColumn>Name</TableHeaderColumn>
       <TableHeaderColumn>Rating</TableHeaderColumn>
     </TableRow>
   </TableHeader>
   <TableBody>
   {this.state.stores.map(function(store){
     return <Top3tableRow store = {store}/>
   })}

   </TableBody>
 </Table>
    );
  }
}

export default TopThreeTable;