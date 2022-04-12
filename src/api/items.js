import { toast } from "react-toastify";

// register item
export const registerItem = async ({ img, name, qty, description } = {}) => {
    const item = { img, name, qty, description };
  
    try {
      const res = await fetch(`/items`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
  
      return await res.json();
    } catch (err) {
      throw new Error("Cannot add at this time.");
    }
  };

  // update item

  export const updateItem = async ({ name, qty, description, id } = {}) => {
    const item = { name, qty, description };
    const itemUpdate = id;
  
    try {
      const res = await fetch(`/items/${itemUpdate}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
  
      return await res.json();
    } catch (err) {
      throw new Error("Cannot add at this time.");
    }
  };

  // delete item

  export const deleteItem = async ({ id } = {}) => {
    const itemDelete = id;
    if (window.confirm("Permanently delete the item?")) {
    try {
      const res = await fetch(`/items/${itemDelete}`, {
        method: "DELETE"        
        }
      )
      .then(toast.success("Item deleted!"));
  
      return await res.json();
    } catch (err) {
      throw new Error("Cannot delete at this time.");
    }
  }
  };