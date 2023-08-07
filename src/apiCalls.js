const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders").then((response) => response.json());
};

const postOrders = (newOrder) => {
  return fetch("http://localhost:3001/api/v1/orders", {
    method: "POST",
    body: JSON.stringify(newOrder),
    headers: {
      "Content-Type": 'application/json'
    }
  })
  .then(response => response.json())
   .catch(error => {
    console.log(error)
    throw new Error(`There appears to be an error ${error.statusText}`)
   })
}

export { getOrders, postOrders }
