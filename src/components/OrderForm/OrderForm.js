import { useState } from "react";
import './OrderForm.css'

function OrderForm(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [alert, setAlert] = useState(false)

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

  function handleError() {
    setAlert(true)
  }

  function handleNonError() {
    setAlert(false)
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  function checkFormCompletion() {
    if (ingredients.length === 0 || name === '') {
      return false
    } else {
      return true
    }
  }

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
        onClick={(e) => {
          if (e.target.value !== '') {
            e.preventDefault();
            setIngredients([...ingredients, e.target.value])
          }
        }}
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
        onChange={(e) => {
          if (e.target.value !== '') {
            setName(e.target.value)
          }
        }}
      />
      {ingredientButtons}
      {ingredients.length === 0 && <p>Nothing Selected</p>}
      {ingredients.length !== 0 && <p>Order: {ingredients.join(', ')}</p>}
      <button onClick={(e) => {
        e.preventDefault();
        if (checkFormCompletion()) {
          handleNonError()
          submitOrder(e)
        } else {
          handleError()
        }
      }}>Submit Order</button>
      {alert && <h1 className='user-form-warning'>Please write your name and preferred ingredient(s) above! The form will not submit unless this is complete</h1>}
    </form>
  );
}

export default OrderForm;
