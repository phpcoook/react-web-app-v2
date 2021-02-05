import React from 'react'
import { Bar } from 'react-chartjs-2'

const Chart = (props) => {
	const data = props.data

	if (!data || data === undefined) {
		return null
	}

	console.log(data)

	data.shift()

	const labels = data.map((row) => row[0])

	const state = {
		labels: labels,
		datasets: [
			{
				label: 'Price',
				backgroundColor: '#0000FF',
				borderColor: 'rgba(0,0,0,1)',
				borderWidth: 2,
				data: data.map((row) => row[1]),
			},
		],
	}

	return (
		<div>
			<Bar
				data={state}
				options={{
					title: {
						display: true,
						text: 'Price Per Product',
						fontSize: 20,
					},
					legend: {
						display: true,
						position: 'right',
					},
				}}
			/>
		</div>
	)
}

export default Chart
