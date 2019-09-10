import {employeesData} from '../data/employee-mock.data';

export function LoadAllEmployees() {
  return new Promise(async (resolve, reject) => {
    try {
      const employees = employeesData.filter(employee => employee);
      resolve(employees);
    } catch (error) {
      reject(error);
    }
  });
}

export function deleteEmployeeById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const employeeToBeDeleted = employeesData.filter(employee => employee.id === id);
      resolve({
        result: employeesData.filter(employee => employee.id !== id),
        count: employeeToBeDeleted.length
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function saveEmployeeDetails(employee) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!employee.id) {
        employee.id = `5d6f705653106f633ad9${employeesData.length + 1}cde`;
        employeesData.push(employee);
      } else {
        const employeeIndex = employeesData.findIndex(entry => employee.id === entry.id);
        if (employeeIndex !== -1) {
          employeesData[employeeIndex] = employee;
        } else {
          throw new Error('Employee not found in database');
        }
      }
      resolve(employeesData);
    } catch (error) {
      reject(error);
    }
  });
}

export function getEmployeeById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(employeesData.find(entry => id === entry.id));
    } catch (error) {
      reject(error);
    }
  });
}
