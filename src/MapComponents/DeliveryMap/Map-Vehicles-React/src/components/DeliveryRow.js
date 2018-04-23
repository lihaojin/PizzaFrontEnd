import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class DeliveryRow extends Component{
	constructor(props){
		super(props);
		this.state={
			order: [],
			index: -1
		}
	}

	componentDidMount(){
		this.setState({
			order: this.props.order ,
			index: this.props.index
		})
	}

	getOrder(){
		this.props.getSelectedOrder(this.state.order);
	}

	render(){
		return(
			<TableRow onRowSelection={()=>{console.log("hello")}} key={this.state.index}>
                <TableRowColumn>{this.state.order.order_number}</TableRowColumn>
                <TableRowColumn>{this.state.order.address}</TableRowColumn>
                <TableRowColumn>{this.state.order.contents}</TableRowColumn>
                <TableRowColumn><button onClick={this.getOrder.bind(this)}>Select</button></TableRowColumn>
              </TableRow>

			)
	}
}
