export const customer = `
query customer($id: String!) {
  customer(_id: $id) {
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
}
`

export const favourites = `
query {
  favourites {
    restaurantId
    restaurant {
      _id
      name
      description
      address
      city
      state
      country
      contact_no
      food_type
      restaurant_type
      time_open
      time_close
      media {
        url
        alt_text
      }
      dishes {
        _id
        name
        description
        price
        food_type
        category
        restaurantId
        media {
          url
          alt_text
        }
      }
    }
  }
}
`

export const addresses = `
query {
  addresses {
    _id
    firstLine
    secondLine
    zipcode
    city
    state
    country
    customerId
  }
}
`

export const address = `
query address($id: String!) {
  address(_id: $id) {
    _id
    firstLine
    secondLine
    zipcode
    city
    state
    country
    customerId
  }
}
`
export const product = `
query  {
      name 
    url 
    category 
    description 
    price 
    qty_available 
    shopId 
    sold
}
`
export const favorite = `
query  {
      userid 
    shopId 
    productId 
    name 
    url 
    category 
    description 
    price 
    qty_available 
}
`
export const Cart = `
query  {
      userid 
    url 
    shopId 
    productId 
    name 
    shopname 
    price 
    qty 
    isGift 
    note 
}
`
export const OrderItem = `
query  {
      url 
    shopId 
    productId   
    name 
    shopname 
    price 
    qty 
    isGift 
    note 
}
`
export const Order = `
query  {
    userid 
    date
    orderitems
    amount
}
`