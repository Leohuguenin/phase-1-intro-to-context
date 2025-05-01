function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

  
function createEmployeeRecords(twoRows) {
    let result = [];
    twoRows.forEach(row => {
        result.push({
            firstName: row[0],
            familyName: row[1],
            title: row[2],
            payPerHour: row[3],
            timeInEvents: [],
            timeOutEvents: []
        })
 })
 return result;
}

function createTimeInEvent(employeeRecord, dateStamp) {
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    });
 return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    });
 return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(element => element.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(element => element.date === date);

    return (parseInt(timeOut.hour) - parseInt(timeIn.hour)) / 100;
}


function wagesEarnedOnDate(employeeRecord, dateStamp) {
    const totalHours = hoursWorkedOnDate(employeeRecord, dateStamp);
    const payRate = employeeRecord.payPerHour;
    return totalHours * payRate;
}

function allWagesFor(employeeRecord) {
    let totalWages = 0;

    for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
        const date = employeeRecord.timeInEvents[i].date;
        const wages = wagesEarnedOnDate(employeeRecord, date);
        totalWages += wages;
    }

    return totalWages;
}

function calculatePayroll(employeeRecords) {
    let totalPayroll = 0; 

    for (let i = 0; i < employeeRecords.length; i++) {
        const employee = employeeRecords[i]; 
        const employeeWages = allWagesFor(employee);
        totalPayroll += employeeWages;
    }
    return totalPayroll;
}