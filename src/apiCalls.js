const getOrders = async () => {
  const response = await fetch("http://localhost:3001/api/v1/orders");
  return await response.json();
};

const postOrders = async (newOrder) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/orders", {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": 'application/json'
      }
    });
    return await response.json();
  } catch (error) {
    throw new Error(`There appears to be an error ${error.statusText}`);
  }
}

export { getOrders, postOrders }
