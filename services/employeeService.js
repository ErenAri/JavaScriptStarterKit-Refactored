export default class employeeService{

    checkEmployeeValidityForErrors(user) {
        let requiredFields = "id firstName lastName age city salary".split(" ")
        let hasErrors = false
        for (const field of requiredFields) {
            if (!user[field]) {
                hasErrors = true
                this.errors.push(
                    new DataError(`Validation problem. ${field} is required`, user))
            }
        }

        if (Number.isNaN(Number.parseInt(user.age))) {
            hasErrors = true
            this.errors.push(new DataError(`Validation problem. ${user.age} is not a number`, user))
        }
        return hasErrors
    }

    listEmployee(){
        return this.employee
    }

    getEmployeeById(id){
        return this.find.employee(e=>e.id=== id)
    }

    getEmployeeSorted(){
        return this.employee.sort((employee1,employee2)=>{
            if(employee1.firstName>employee2.firstName){
                return 1;
            }else if(employee1.firstName===employee2.firstName){
                return 0;
            }else{
                return -1
            }
        })
    }

    addEmployee(employee) {
        switch (employee) {
            case "employee":
                if (!this.checkEmployeeValidityForErrors(employee)) {
                    this.employee.push(employee)
                }
                break;
            default:
                this.errors.push(
                    new DataError("This employee can not be added", employee))
                break;
        }
        this.loggerService.log(employee)
    }
}