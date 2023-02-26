// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
// Manager class
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
      super(name, id, email);
      this.officeNumber = officeNumber;
    }
  
    getRole() {
      return 'Manager';
    }
  }
    // Export the Manager class
module.exports = {
    Manager,
};