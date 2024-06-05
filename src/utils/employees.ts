import { differenceInDays } from 'date-fns'
import { WorkPair, EmployeeData } from '../types.ts'

function calculateDaysWorked(
    employee1: EmployeeData,
    employee2: EmployeeData
): number {
    const employee1TotalTimeWorked = differenceInDays(
        employee1.DateTo || new Date(),
        employee1.DateFrom || new Date()
    )
    const employee2TotalTimeWorked = differenceInDays(
        employee2.DateTo || new Date(),
        employee2.DateFrom || new Date()
    )

    return employee1TotalTimeWorked + employee2TotalTimeWorked
}

function findEmployeesWithSameProjectID(
    employees: EmployeeData[]
): EmployeeData[] {
    const employeesByProject: Map<number, EmployeeData[]> = new Map()

    employees.forEach((employee) => {
        const { EmpID, ProjectID } = employee
        if (EmpID === null || ProjectID === null) return
        if (!employeesByProject.has(ProjectID)) {
            employeesByProject.set(ProjectID, [])
        }
        employeesByProject.get(ProjectID)!.push(employee)
    })

    const employeesWithSameProject: EmployeeData[] = []

    employeesByProject.forEach((employees) => {
        if (employees.length > 1) {
            employeesWithSameProject.push(...employees)
        }
    })

    return employeesWithSameProject
}

function findEmployeesPairWhoWorkedLongest(
    employees: EmployeeData[]
): [EmployeeData, EmployeeData] {
    let longestWorkedEmployees: [EmployeeData, EmployeeData] = [
        employees[0],
        employees[1],
    ]
    let longestWorkedDays = 0
    for (let i = 0; i < employees.length; i++) {
        for (let j = i + 1; j < employees.length; j++) {
            const employee1 = employees[i]
            const employee2 = employees[j]

            const daysWorked = calculateDaysWorked(employee1, employee2)
            if (daysWorked > longestWorkedDays) {
                longestWorkedDays = daysWorked
                longestWorkedEmployees = [employee1, employee2]
            }
        }
    }
    return longestWorkedEmployees
}

function findAllCommonProjectsOfThePair(
    employees: [EmployeeData, EmployeeData],
    data: EmployeeData[]
): WorkPair[] {
    const [employee1, employee2] = employees
    const projects1 = data
        .filter((emp) => emp.EmpID === employee1.EmpID)
        .map((emp) => emp.ProjectID)
    const projects2 = data
        .filter((emp) => emp.EmpID === employee2.EmpID)
        .map((emp) => emp.ProjectID)

    const commonProjects: WorkPair[] = []

    for (let i = 0; i < projects1.length; i++) {
        if (projects2.includes(projects1[i])) {
            const emp1 = data.find(
                (emp) =>
                    emp.EmpID === employee1.EmpID &&
                    emp.ProjectID === projects1[i]
            )
            const emp2 = data.find(
                (emp) =>
                    emp.EmpID === employee2.EmpID &&
                    emp.ProjectID === projects1[i]
            )
            if (emp1 && emp2) {
                const daysWorked = calculateDaysWorked(emp1, emp2)
                commonProjects.push({
                    ProjectID: projects1[i],
                    DaysWorked: daysWorked,
                    EmpID1: employee1.EmpID,
                    EmpID2: employee2.EmpID,
                })
            }
        }
    }

    return commonProjects
}

export const getCommonProjectsOfThePair = (
    data: EmployeeData[]
): WorkPair[] => {
    const employeesWorkedOnSameProject = findEmployeesWithSameProjectID(data)
    const longestWorkedEmployees = findEmployeesPairWhoWorkedLongest(
        employeesWorkedOnSameProject
    )
    const commonProjectsOfThePair = findAllCommonProjectsOfThePair(
        longestWorkedEmployees,
        data
    )
    return commonProjectsOfThePair
}
