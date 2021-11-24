export default class customerService{

    checkCustomerValidityForErrors(user) {
        let requiredFields = "id firstName lastName age city".split(" ")
        let hasErrors = false
        for (const field of requiredFields) {
            if (!user[field]) {
                hasErrors = true
                this.errors.push(
                    new DataError(`Validation problem. ${field} is required`, user))
            }
        }

        if (Number.isNaN(Number.parseInt(+user.age))) {
            hasErrors = true
            this.errors.push(new DataError(`Validation problem. ${user.age} is not a number`, user))
        }

        return hasErrors
    }


    listCustomers() {
        return this.customers
    }

    getCustomerById(id) {
        return this.customers.find(u=>u.id ===id)
    }

    getCustomersSorted(){
        return this.customers.sort((customer1,customer2)=>{
            if(customer1.firstName>customer2.firstName){
                return 1;
            }else if(customer1.firstName===customer2.firstName){
                return 0;
            }else{
                return -1
            }
        })
    }

    addCustomer(customer) {
        switch (customer) {
            case "customer":
                if (!this.checkCustomerValidityForErrors(customer)) {
                    this.customers.push(customer)
                }
                break;
            default:
                this.errors.push(
                    new DataError("This customer can not be added", customer))
                break;
        }
        this.loggerService.log(customer)
    }
}