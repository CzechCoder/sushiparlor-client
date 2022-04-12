import Button from "@mui/material/Button";
import React, { useState } from "react";
import { FormHelperText, TextField, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { registerItem } from "../api/items";

const InputOutput = ({getItems}) => {
  // useState values
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = ()=> {
    setName("");
    setQty("");
    setDescription("");
  }

  // add to catalog
  const addToCatalog = async (e)=> {
      e.preventDefault();      
        let img = "http://tomasburian.com/dev/img/sushi/sushi_" + Math.floor(Math.random() * 10 + 1) + ".jpg";
      try {
        const res = await registerItem({
          img,
          name,
          qty,
          description
        });
        if (res.error) toast.error(res.error);
        else {
          toast.success("Item added!");
          getItems();
        }
      } catch (err) {
        toast.error(err);
      }
      resetForm();
    };

  return (
    <div>
      <div className="card border-0 mb-4 shadow">
        <div className="card-body text-center">
          <h3 className="pink">Create a new shop item</h3>

          <form onSubmit={addToCatalog}>

          <TextField
            sx={{ my: 2 }}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            sx={{ my: 2 }}
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            fullWidth
          />

          <TextField
            sx={{ my: 2 }}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />

          <p className="text-muted">Pictures are added randomly</p>

          <FormHelperText className="ml-1 mt-1 text-center">
                  {!name || !qty || !description ? (
                    <span className="pink">Please fill in all the fields.</span>
                  ) : (
                    <span></span>
                  )}
                </FormHelperText>

          <Tooltip title="Add the item to the catalog">
            <Button
            sx={{ m: 2 }}
            variant="contained"
            color="info"
            type="submit"
            onClick={addToCatalog}
            disabled={!name || !qty || !description}
            >
              Send to catalog
            </Button>
          </Tooltip>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputOutput;
