import React from 'react'
import { DataGrid } from '@material-ui/data-grid'

export default function Output(props) {
	const data = props.data

	if (!data || data === undefined) {
		return null
	}

	const columns = [
		{ field: 'product', headerName: 'Product', width: 250 },
		{ field: 'price', headerName: 'Price', width: 250 },
	]

	data.shift()

	const rows = data.map((row, index) => {
		return {
			id: index,
			product: row[0],
			price: row[1],
		}
	})

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
		</div>
	)
}
