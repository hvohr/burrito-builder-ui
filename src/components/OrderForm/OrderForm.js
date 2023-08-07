import { useState, useEffect } from "react";

function OrderForm(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function submitOrder(e) {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      name: name,
      ingredients: ingredients,
    }
    props.submitOrder(newOrder)
    clearInputs();
  }

  useEffect(() => {
    console.log(ingredients)
  }, [ingredients])

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        value={ingredient}
        onClick={(e) => setIngredients([...ingredients, e.target.value])}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) =>setName(e.target.value)}
      />
      {ingredientButtons}
      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>
      <button onClick={(e) => submitOrder(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
