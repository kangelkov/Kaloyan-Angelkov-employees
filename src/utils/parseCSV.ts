import Papa from 'papaparse'
import { parse, format } from 'date-fns'
import { CSVRow, EmployeeData } from '../types'

const DATE_FORMATS = ['yyyy-MM-dd', 'dd/MM/yyyy']

const UNIFIED_DATE_FORMAT = 'yyyy-MM-dd'

const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null
    if (dateStr.trim() === 'NULL') return new Date()
    for (const dateFormat of DATE_FORMATS) {
        const parsedDate = parse(dateStr.trim(), dateFormat, new Date())
        if (!isNaN(parsedDate.getTime())) {
            return new Date(format(parsedDate, UNIFIED_DATE_FORMAT))
        }
    }
    console.error(`Failed to parse date: ${dateStr}`)
    return null
}

export const parseCSV = (file: File): Promise<EmployeeData[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            complete: (results) => {
                const data = (results.data as CSVRow[]).map((row: CSVRow) => {
                    return {
                        EmpID: parseInt(row[0]),
                        ProjectID: parseInt(row[1]),
                        DateFrom: parseDate(row[2]),
                        DateTo: parseDate(row[3]),
                    }
                }) as EmployeeData[]
                resolve(data)
            },
            error: (error) => {
                reject(error)
            },
        })
    })
}
