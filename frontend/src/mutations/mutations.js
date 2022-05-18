export const createCustomer = `
mutation createCustomer($customer: CustomerReq) {
  createCustomer(customer: $customer) {
    userid
    url
    name
    email
    about
    gender
    dob
    city
    state
    country
    contact_no
    address
  }
}`
