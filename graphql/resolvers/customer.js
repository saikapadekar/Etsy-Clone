const { default: axios } = require('axios');
const { GraphQLError } = require('graphql');

const createCustomer = async (args, req) => {
    console.log(`Received arguments`,args)

    try {
        const customerData = args.customer;
       
        console.log(customerData);
        const created = await axios.post(`${window.BACKEND_API_URL}/customers/createcustomer`, customerData);//to change api
        console.log(created);
        return created.data;
      }
      catch (err) {
        console.log(err);
        if (err.isAxiosError) {
          return new GraphQLError(err.response?.message);
        }
        return new GraphQLError(err);
      }
  };


  module.exports = {
  
    createCustomer,
  };
  