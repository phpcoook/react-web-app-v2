import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import useStyles from '../layout/Style'
import Main from '../components/Main'

const Dashboard = () => {
	const classes = useStyles()
	return (
		<Paper className={classes.control}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Main />
				</Grid>
			</Grid>
		</Paper>
	)
}

export default Dashboard
