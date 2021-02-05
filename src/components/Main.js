import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import useStyles from '../layout/Style'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { countries, cities, genders } from '../data'
import Papa from 'papaparse'
import Table from './Table'
import Chart from './Chart'
import Dialog from './Dialog'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Main = () => {
	const classes = useStyles()
	const [name, setName] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [age, setAge] = React.useState('')
	const [gender, setGender] = React.useState('')
	const [city, setCity] = React.useState('')
	const [country, setCountry] = React.useState('')
	const [file, setFile] = React.useState()
	const [rawData, setRawData] = React.useState()
	const [showOutput, setShowoutput] = React.useState(false)
	const [csvData, setcsvData] = React.useState()
	const [cityList, setCityList] = React.useState([])
	const [openDialog, setOpenDialog] = React.useState(false)

	const btnEnabeled =
		!!name &&
		!!email &&
		!!age &&
		!!gender &&
		!!city &&
		!!country &&
		(!!file || !!rawData)

	const handleReset = () => {
		setName('')
		setEmail('')
		setAge('')
		setGender('')
		setCity('')
		setCountry('')
		setFile()
		setShowoutput(false)
		setcsvData('')
		setRawData('')
	}

	/**
	 * Converts the parsed array data from csv file to csv string, and display set rawData prop to display
	 * it in Manual CSV Data input field
	 *
	 * @param {array} data - parsed array of objects from csv file
	 */
	const updateData = (data) => {
		const csv = Papa.unparse(data.data)
		setRawData(csv)
	}

	/**
	 * Checks if data is already available in Manual CSV Data input field
	 * if available, then open confirmation dialog and ask user for confirmation to replace data
	 * If not available, then call handleCSVUpload to prepare data for chart and table
	 */
	const confirmUpload = () => {
		if (!!rawData) {
			setOpenDialog(true)
		} else {
			handleCSVUpload()
		}
	}

	/**
	 * Validate the uploaded file type, if it's not in text/csv format, then display error
	 * If file is valid, parse the file and execute callback function
	 */
	const handleCSVUpload = () => {
		if (!!file && file.type === 'text/csv') {
			Papa.parse(file, {
				complete: updateData,
			})
		} else {
			toast.error('Please upload valid csv file')
		}
		setOpenDialog(false)
	}

	/**
	 * This function actully parse the final data used to show table and charts in output screen
	 * Check if rawData (comma seprated string) exists, if yes then convert it to array and call showOutPut function
	 */
	const handleSubmit = () => {
		if (!!rawData) {
			Papa.parse(rawData, {
				complete: showOutPut,
			})
		}
	}

	/**
	 * Set csvData prop and shows the output page
	 */
	const showOutPut = (data) => {
		setcsvData(data.data)
		setShowoutput(true)
	}

	return (
		<>
			{!showOutput && (
				<>
					<Typography variant='h6'>User</Typography>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<TextField
								id='name'
								label='Name'
								variant='outlined'
								fullWidth={true}
								onChange={(event) => {
									setName(event.target.value)
								}}
								value={name}
							/>
						</Grid>
						<Grid item xs={3}>
							<FormControl variant='outlined' className={classes.formControl}>
								<InputLabel id='demo-simple-select-outlined-label'>
									Gender
								</InputLabel>
								<Select
									labelId='demo-simple-select-outlined-label'
									id='demo-simple-select-outlined'
									value={gender}
									onChange={(event) => {
										setGender(event.target.value)
									}}
									label='Gender'
								>
									{genders.map((item, index) => (
										<MenuItem value={item} key={index}>
											{item}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3}>
							<FormControl variant='outlined' className={classes.formControl}>
								<InputLabel id='demo-simple-select-outlined-label'>
									Age
								</InputLabel>
								<Select
									labelId='demo-simple-select-outlined-label'
									id='demo-simple-select-outlined'
									value={age}
									onChange={(event) => {
										setAge(event.target.value)
									}}
									label='Age'
								>
									{[...Array(121)].map((elementInArray, index) => (
										<MenuItem value={index} key={index}>
											{index}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<TextField
								id='email'
								label='Email'
								variant='outlined'
								fullWidth={true}
								value={email}
								onChange={(event) => {
									setEmail(event.target.value)
								}}
							/>
						</Grid>
						<Grid item xs={3}>
							<FormControl variant='outlined' className={classes.formControl}>
								<InputLabel id='demo-simple-select-outlined-label'>
									Country
								</InputLabel>
								<Select
									labelId='demo-simple-select-outlined-label'
									id='demo-simple-select-outlined'
									value={country}
									onChange={(event) => {
										setCountry(event.target.value)
										setCityList(cities[event.target.value])
									}}
									label='Country'
								>
									{countries.map((item) => (
										<MenuItem value={item} key={item}>
											{item}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3}>
							<FormControl variant='outlined' className={classes.formControl}>
								<InputLabel id='demo-simple-select-outlined-label'>
									City
								</InputLabel>
								<Select
									labelId='demo-simple-select-outlined-label'
									id='demo-simple-select-outlined'
									value={city}
									onChange={(event) => {
										setCity(event.target.value)
									}}
									label='City'
								>
									{cityList.map((item) => (
										<MenuItem value={item}>{item}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<br />
					<Typography variant='h6'>Input Data</Typography>
					<Grid container spacing={3}>
						<Grid item xs={10}>
							<TextField
								id='name'
								variant='outlined'
								type='file'
								fullWidth={true}
								onChange={(event) => {
									setFile(event.target.files[0])
								}}
								accept='csv'
							/>
						</Grid>
						<Grid item xs={2}>
							<Button
								variant='contained'
								size='large'
								color='primary'
								className={classes.margin}
								style={{
									float: 'right',
									height: 55,
									width: '100%',
								}}
								onClick={confirmUpload}
								disabled={!file}
							>
								Upload
							</Button>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Manual CSV Data Input'
								multiline
								rows={10}
								variant='outlined'
								rowsMax={10}
								fullWidth={true}
								onChange={(event) => {
									setRawData(event.target.value)
								}}
								InputLabelProps={{
									shrink: true,
								}}
								value={rawData}
							/>
						</Grid>
					</Grid>
				</>
			)}
			{!!btnEnabeled && !!showOutput && (
				<>
					<Typography variant='h6'>Personal Information</Typography>
					<Grid container spacing={8}>
						<Grid item xs={6}>
							<Grid container spacing={3}>
								<Grid item xs={6}>
									<p style={{ textAlign: 'left', fontWeight: 'bolder' }}>
										Name :
									</p>
								</Grid>
								<Grid item xs={6}>
									<p style={{ textAlign: 'right' }}>{name}</p>
								</Grid>
							</Grid>
							<hr />
							<Grid container spacing={3}>
								<Grid item xs={6}>
									<p style={{ textAlign: 'left', fontWeight: 'bolder' }}>
										Age :
									</p>
								</Grid>
								<Grid item xs={6}>
									<p style={{ textAlign: 'right' }}>{age}</p>
								</Grid>
							</Grid>
							<hr />
							<Grid container spacing={3}>
								<Grid item xs={6}>
									<p style={{ textAlign: 'left', fontWeight: 'bolder' }}>
										Gender :
									</p>
								</Grid>
								<Grid item xs={6}>
									<p style={{ textAlign: 'right' }}>{gender}</p>
								</Grid>
							</Grid>
							<hr />
						</Grid>
						<Grid item xs={6}>
							<Grid container spacing={4}>
								<Grid item xs={6}>
									<p style={{ textAlign: 'left', fontWeight: 'bolder' }}>
										Email :
									</p>
								</Grid>
								<Grid item xs={6}>
									<p style={{ textAlign: 'right' }}>{email}</p>
								</Grid>
							</Grid>
							<hr />
							<Grid container spacing={3}>
								<Grid item xs={6}>
									<p style={{ textAlign: 'left', fontWeight: 'bolder' }}>
										Country :
									</p>
								</Grid>
								<Grid item xs={6}>
									<p style={{ textAlign: 'right' }}>{country}</p>
								</Grid>
							</Grid>
							<hr />
							<Grid container spacing={3}>
								<Grid item xs={6}>
									<p style={{ textAlign: 'left', fontWeight: 'bolder' }}>
										City :
									</p>
								</Grid>
								<Grid item xs={6}>
									<p style={{ textAlign: 'right' }}>{gender}</p>
								</Grid>
							</Grid>
							<hr />
						</Grid>
					</Grid>
					<Grid container spacing={8}>
						<Grid item xs={6}>
							<Typography variant='h6'>Data</Typography>
							<Table data={csvData} />
						</Grid>
						<Grid item xs={6}>
							<Typography variant='h6'>Chart</Typography>
							<Chart data={csvData} />
						</Grid>
					</Grid>
				</>
			)}
			<Grid container spacing={3}>
				<Grid item xs={12} style={{ textAlign: 'center' }}>
					{!showOutput && (
						<Button
							variant='contained'
							size='medium'
							color='primary'
							className={classes.margin}
							disabled={!btnEnabeled}
							style={{ marginRight: 20 }}
							onClick={handleSubmit}
						>
							Continue
						</Button>
					)}
					<Button
						variant='contained'
						size='medium'
						color='secondary'
						onClick={handleReset}
					>
						Reset
					</Button>
				</Grid>
			</Grid>
			<Dialog
				openDialog={openDialog}
				handleCloseDialog={() => {
					setOpenDialog(false)
				}}
				handleAccept={handleCSVUpload}
			/>
			<ToastContainer />
		</>
	)
}
export default Main
