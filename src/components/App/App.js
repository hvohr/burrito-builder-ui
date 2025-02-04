import { useEffect, useState } from "react";
import "./App.css";
import { getOrders, postOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
const [orders, setOrders] = useState([])
const [newOrder, setNewOrder] = useState('')


function getAllOrders() {
  getOrders().then(
    data => setOrders(data.orders)
  ).catch((err) => console.error("Error fetching:", err));
}
  useEffect(() => {
    getAllOrders()
  }, [newOrder]);

const submitOrder = (newOrder) => {
  setNewOrder(newOrder)
  const newOrderList= {name: newOrder.name, ingredients: newOrder.ingredients}
  postOrders(newOrder).then(data => {
    setOrders([...orders, newOrderList])
  })
}  

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm submitOrder={submitOrder} />
      </header>
      <Orders orders={orders} />
    </main>
  );
}

export default App;
