import { DataGrid } from '@mui/x-data-grid'

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'detail', headerName: 'Detail', width: 300 },
    { field: 'startDate', headerName: 'StartDate', width: 100 },
    { field: 'endDate', headerName: 'EndDate', width: 100 },
    { field: 'mode', headerName: 'Mode', width: 100 },
    { field: 'rating', headerName: 'Rating', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
]

function TaskInfoSummary( { tasks } ) {
    return (
        <div style={{height: 500, width: '80%', margin: 'auto'}}>
            <DataGrid rows={tasks} columns={columns}/>
        </div>
    )
}

export default TaskInfoSummary