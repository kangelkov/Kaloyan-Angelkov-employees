import FileUpload from './components/FileUpload'
import { Typography } from '@mui/material'
import { useState } from 'react'
import { getCommonProjectsOfThePair } from './utils/employees.ts'
import EmployeesDataGrid from './components/EmployeesDataGrid.tsx'
import { EmployeeData, WorkPair } from './types.ts'
import { AppContainer } from './styles.ts'

function App() {
    const [employeesData, setEmployeesData] = useState<WorkPair[]>([])
    const handleDataParsed = (parsedData: EmployeeData[]) => {
        const pairs = getCommonProjectsOfThePair(parsedData)
        setEmployeesData(pairs)
    }

    return (
        <AppContainer>
            <Typography variant="h4" component="h1" gutterBottom>
                Pair of employees who have worked together
            </Typography>
            <FileUpload onDataParsed={handleDataParsed} />
            {employeesData.length > 0 && (
                <EmployeesDataGrid rows={employeesData} />
            )}
        </AppContainer>
    )
}

export default App
