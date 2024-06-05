import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { DataGridContainer } from '../styles.ts'
import { DataGridProps } from '../types.ts'

const columns: GridColDef[] = [
    { field: 'EmpID1', headerName: 'Employee ID #1', width: 150 },
    { field: 'EmpID2', headerName: 'Employee ID #2', width: 150 },
    { field: 'ProjectID', headerName: 'Project ID', width: 150 },
    { field: 'DaysWorked', headerName: 'Days Worked', width: 150 },
]

const EmployeesDataGrid: React.FC<DataGridProps> = ({ rows }) => {
    return (
        <DataGridContainer>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) =>
                    `${row.EmpID1}-${row.EmpID2}-${row.ProjectID}`
                }
            />
        </DataGridContainer>
    )
}

export default EmployeesDataGrid
