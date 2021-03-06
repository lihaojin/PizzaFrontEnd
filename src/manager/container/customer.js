import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import CustomerCard from '../component/customerCard';
import {getAllRegisteredCustomers} from '../Util/managerDBUtil';
import {getAllPendingCustomers} from '../Util/managerDBUtil';
import {getAllBlacklistedCustomers} from '../Util/managerDBUtil';
import { Redirect } from 'react-router';

export default class Customers extends Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			registered:[],
			blackListed:[],
			pending:[],
			redirect:false
		}
	}

	componentDidMount(){

		if(localStorage.getItem('token')==null)
		{	
			this.setState({redirect:true});
			alert("You are not logged in!");
		}
		else
		{
			getAllPendingCustomers().then( result=>{
	
				const cusomters = result.data.pending_customers.email;
				if(cusomters.length!=0)
				{
					this.setState({
			  		pending: result.data.pending_customers.email,
			  		redirect:false
			  		})
				}
		  	 
		  	}).catch(error=>{
		  		console.log("error in Pending Customer DB Retrieval: ",error);
		  		alert("Error ",error);

		  	});

		  	getAllRegisteredCustomers().then( result=>{

				const customers = result.data.registered_customers.email
				if(customers.length!=0)
				{
		  	 this.setState({
		  		registered: customers,
		  		redirect:false
		  		})}
		  	}).catch(error=>{
		  		console.log("error in registered Customer DB Retrieval: ",error);
		  		alert("Error ",error);

		  	});

		  	getAllBlacklistedCustomers().then( result=>{

		  		const customers = result.data.blacklisted_customers.email
				if(customers.length!=0)
				{


		  	 this.setState({
		  		blackListed: customers,
		  		redirect:false
		  		})				}
		  	}).catch(error=>{
		  		console.log("error in blacklisted Customer DB Retrieval: ",error);
		  		alert("Error ",error);

		  	});
		}
		 
	}
 
	render()
	{
		if(this.state.redirect)
				{
					return(
						<Redirect to='/login'/>
						)
				}
		const pending = this.state.pending.map((customer)=>

			<div key={customer.toString()}>
			<br></br>
			<CustomerCard title={customer} status="Status: Pending "  isBlacklist = {false}
			 />
			<br></br>
			</div>
			)
		const registered = this.state.registered.map((customer)=>

			<div key={customer.toString()}>
			<br></br>
			<CustomerCard title={customer} status="Status: Registered "  isBlacklist = {false}
			 />
			<br></br>
			</div>
			)
		const blacklisted = this.state.blackListed.map((customer)=>

			<div key={customer.toString()}>
			<br></br>
			<CustomerCard title={customer} status="Status: Blacklisted " isBlacklist = {true}
			 />
			<br></br>
			</div>
			)

		return(
			<div>
			{pending}
			<br/>
			{registered}
			<br/>
			{blacklisted}
			</div>

			)

	}
}