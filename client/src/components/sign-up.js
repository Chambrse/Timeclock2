import React, { Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';



const pstyle = {
	color: "red",
	margin: "0px",
};
const styles = theme => ({
	button: {
	  margin: theme.spacing.unit,
	},
	TextField: {
	  display: 'none',
	},
  });

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			usernameErrors: [],
			companyName: '',
			companyNameErrors: [],
			city: '',
			cityErrors: [],
			country: '',
			countryErrors: [],
			postalCode: '',
			postalCodeErrors: [],
			brand: '',
			brandErrors: [],
			email: '',
			emailErrors: [],
			adminFirstName: '',
			adminFirstNameErrors: [],
			adminLastName: '',
			adminLastNameErrors: [],
			password: '',
			passwordErrors: [],
			passwordMatch: '',
			passwordMatchErrors: [],
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/user/', this.state)
			.then(response => {

				if (response.data.errors) {

					let newErrorsObj = {
						companyNameErrors: [],
						usernameErrors: [],
						emailErrors: [],
						adminFirstNameErrors: [],
						adminLastNameErrors: [],
						cityErrors: [],
						countryErrors: [],
						postalCodeErrors: [],
						brandErrors: [],
						passwordErrors: [],
						passwordMatchErrors: [],
					};

					for (let key in response.data) {
						console.log([key]);
						if ([key] != 'errors') {

							response.data[key].forEach(element => {

								newErrorsObj[key].push(element.msg);

							});

						}
					}
					this.setState(newErrorsObj);
				}

				/* 				if (!response.data.errmsg) {
									console.log('successful signup')
									this.setState({ //redirect to login page
										redirectTo: '/login'
									})
								} else {
									console.log('username already taken')
								} */
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


	render() {
		const { classes } = this.props;

		return (
			<Paper className={classes.root} elevation={1}>
				<h4>Sign up</h4>
				<form className="form-horizontal">
					<Grid justify="center" className="form-group">
						<Grid justify="center" className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="username">Username</label>
						</Grid >
						<Grid justify="center" className="col-3 col-mr-auto">
							<TextField className="form-TextField"
								type="text"
								id="username"
								name="username"
								placeholder="Username"
								value={this.state.username}
								onChange={this.handleChange}
							/>
							{this.state.usernameErrors.length > 0 ? (
								this.state.usernameErrors.map((element, i) => {
									return <p style={pstyle} key={i}>{element}</p>
								})
							) : console.log("it was false")
							}
						</Grid >


					</Grid >
					<Grid justify="center" className="form-group">
						<Grid justify="center" className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="company">Company</label>
						</Grid >
						<Grid justify="center" className="col-3 col-mr-auto">
							<TextField className="form-TextField"
								type="text"
								id="companyName"
								name="companyName"
								placeholder="companyName"
								value={this.state.companyName}
								onChange={this.handleChange}
							/>
							{this.state.companyNameErrors.length > 0 ? (
								this.state.companyNameErrors.map((element, i) => {
									return <p style={pstyle} key={i}>{element}</p>
								})
							) : console.log("it was false")
							}
						</Grid >
					</Grid >
					<Grid justify="center" className="form-group">
						<Grid justify="center" className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="city">City</label>
						</Grid >
						<Grid justify="center" className="col-3 col-mr-auto">
							<TextField className="form-TextField"
								type="text"
								id="city"
								name="city"
								placeholder="city"
								value={this.state.city}
								onChange={this.handleChange}
							/>
							{this.state.cityErrors.length > 0 ? (

								this.state.cityErrors.map((element, i) => {
									return <p style={pstyle} key={i}>{element}</p>
								})
							) : console.log("it was false")
							
							}
						</Grid >
					</Grid >
					<Grid justify="center" className="form-group">
						<Grid justify="center" className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="country">Country</label>
						</Grid >
						<Grid justify="center" className="col-3 col-mr-auto">
							<TextField className="form-TextField"
								type="text"
								id="country"
								name="country"
								placeholder="country"
								value={this.state.country}
								onChange={this.handleChange}
							/>
							{this.state.countryErrors.length > 0 ? (
								this.state.countryErrors.map((element, i) => {
									return <p style={pstyle} key={i}>{element}</p>
								})
							) : console.log("it was false")
							}
						</Grid >
					</Grid >
					<Grid justify="center" className="form-group">
						<Grid justify="center" className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="postalCode">Postal Code</label>
						</Grid >
						<Grid justify="center" className="col-3 col-mr-auto">
							<TextField className="form-TextField"
								type="text"
								id="postalCode"
								name="postalCode"
								placeholder="postalCode"
								value={this.state.postalCode}
								onChange={this.handleChange}
							/>
							{this.state.postalCodeErrors.length > 0 ? (
								this.state.postalCodeErrors.map((element, i) => {
									return <p style={pstyle} key={i}>{element}</p>
								})
							) : console.log("it was false")
							}
						</Grid >
					</Grid >
					<Grid justify="center" className="form-group">
						<Grid justify="center" className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="brand">Brand Statement</label>
						</Grid >
						<Grid justify="center" className="col-3 col-mr-auto">
							<TextField className="form-TextField"
								type="text"
								id="brand"
								name="brand"
								placeholder="brand"
								value={this.state.brand}
								onChange={this.handleChange}
							/>
							{this.state.brandErrors.length > 0 ? (
								this.state.brandErrors.map((element, i) => {
									return <p style={pstyle} key={i}>{element}</p>
								})
							) : console.log("it was false")
							}
						</Grid >
					</Grid >
					<Grid justify="center" className="form-group">
						<Grid justify="center" className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="email">Email</label>
						</Grid >
						<Grid justify="center" className="col-3 col-mr-auto">
							<TextField className="form-TextField"
								type="text"
								id="email"
								name="email"
								placeholder="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
							{this.state.emailErrors.length > 0 ? (
								this.state.emailErrors.map((element, i) => {
									return <p style={pstyle} key={i}>{element}</p>
								})
							) : console.log("it was false")
							}
						</Grid >
					</Grid >
					<Grid justify="center" className="form-group">
						<Grid justify="center" className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="adminFirstName">First Name</label>
						</Grid >
						<Grid justify="center" className="col-3 col-mr-auto">
							<TextField className="form-TextField"
								type="text"
								id="adminFirstName"
								name="adminFirstName"
								placeholder="adminFirstName"
								value={this.state.adminFirstName}
								onChange={this.handleChange}
							/>
							{this.state.adminFirstNameErrors.length > 0 ? (
								this.state.adminFirstNameErrors.map((element, i) => {
									return <p style={pstyle} key={i}>{element}</p>
								})
							) : console.log("it was false")
							}
						</Grid >
					</Grid >
					<Grid justify="center" className="form-group">
						<Grid justify="center" className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="adminLastName">Last Name</label>
						</Grid >
						<Grid justify="center" className="col-3 col-mr-auto">
							<TextField className="form-TextField"
								type="text"
								id="adminLastName"
								name="adminLastName"
								placeholder="adminLastName"
								value={this.state.adminLastName}
								onChange={this.handleChange}
							/>
							{this.state.adminLastNameErrors.length > 0 ? (
								this.state.adminLastNameErrors.map((element, i) => {
									return <p style={pstyle} key={i}>{element}</p>
								})
							) : console.log("it was false")
							}
						</Grid >
					</Grid >
					<Grid justify="center" className="form-group">
						<Grid justify="center" className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="password">Password: </label>
						</Grid >
						<Grid justify="center" className="col-3 col-mr-auto">
							<TextField className="form-TextField"
								placeholder="password"
								type="password"
								name="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
							{this.state.passwordErrors.length > 0 ? (
								this.state.passwordErrors.map((element, i) => {
									return <p style={pstyle} key={i}>{element}</p>
								})
							) : console.log("it was false")
							}
						</Grid >
					</Grid >
					<Grid justify="center" className="form-group">
						<Grid justify="center" className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="passwordMatch">Re-enter password</label>
						</Grid >
						<Grid justify="center" className="col-3 col-mr-auto">
							<TextField className="form-TextField"
								type="password"
								id="passwordMatch"
								name="passwordMatch"
								placeholder="passwordMatch"
								value={this.state.passwordMatch}
								onChange={this.handleChange}
							/>
							{this.state.passwordMatchErrors.length > 0 ? (
								this.state.passwordMatchErrors.map((element, i) => {
									return <p style={pstyle} key={i}>{element}</p>
								})
							) : console.log("it was false")
							}
						</Grid >
					</Grid >
					<Grid justify="center" className="form-group ">
						<Grid justify="center" className="col-6">
						<Button
							color="primary"
							variant="raised"
							className={classes.button}
							onClick={this.handleSubmit}
							type="submit"
						>Sign up</Button>
						</Grid >
					</Grid >
				</form>
			</Paper>

		)
	}
}
Signup.propTypes = {
	classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Signup)
