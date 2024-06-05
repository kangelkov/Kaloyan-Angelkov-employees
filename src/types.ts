export interface EmployeeData {
    EmpID: number
    ProjectID: number
    DateFrom: Date | null
    DateTo: Date | null
}

export interface FileUploadProps {
    onDataParsed: (data: EmployeeData[]) => void
}

export interface WorkPair {
    ProjectID: number
    DaysWorked: number
    EmpID1: number
    EmpID2: number
}

export interface CSVRow {
    0: string
    1: string
    2: string
    3: string
}

export interface DataGridProps {
    rows: WorkPair[]
}
