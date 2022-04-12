import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { updateItem, deleteItem } from "../api/items";

const Modal = ({ selectedItem, setSelectedItem, getItems }) => {

  const [newName, setNewName] = useState(selectedItem.name);
  const [newQty, setNewQty] = useState(selectedItem.qty);
  const [newDescription, setNewDescription] = useState(selectedItem.description);

  // closing the modal
  const handleHideClick = (e) => {
    setSelectedItem(null);
    getItems();
  };

  // deleting the item of the catalog

  const deleteFromCatalog = async (e)=> {
    e.preventDefault();
      const id = e.target.value;
      try {
        const res = await deleteItem({
          id: id       
        });
        if (res.error) toast.error(res.error);
      } catch (err) {
        toast.error(err);
      }
      handleHideClick();
  };

  // update catalog
  const updateToCatalog = async (e)=> {
    e.preventDefault();
      const id = e.target.value;
      try {
        const res = await updateItem({        
          name: newName,
          qty: newQty,
          description: newDescription,
          id: id       
        });
        if (res.error) toast.error(res.error);
        else {
          toast.success("Item updated!");
        }
      } catch (err) {
        toast.error(err);
      }
  };


  return (
    <>
      <div className="basemodal">
        <div className="modalwrapper">
          <div className="main-content">
            <div className="mod-topbar bg-paleblue">
              <CloseIcon onClick={handleHideClick} className="close-it" />
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <img
                  className="modal-img"
                  src={selectedItem.img}
                  alt="Sushi time!"
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="card-body">
                  <h4>
                    <b>Item name</b>
                  </h4>
                  <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control pb-3"
                  placeholder={selectedItem.name}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <h4>
                    <b>Item Quantity</b>
                  </h4>
                  <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control pb-3"
                  placeholder={selectedItem.qty}
                  value={newQty}
                  onChange={(e) => setNewQty(e.target.value)}
                />
                <h4>
                    <b>Item description</b>
                  </h4>
                  <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control pb-3"
                  placeholder={selectedItem.description}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />

                {/* // save button below */}
                <Button
                  style={{ height: "28px", width: "100%", marginTop: "25px" }}
                  variant="contained"
                  color="success"
                  onClick={updateToCatalog}
                  value={selectedItem._id}
                >
                  Save changes
                </Button>

                {/* // delete button below */}
                <Button
                  style={{ height: "28px", width: "100%", marginTop: "25px" }}
                  variant="contained"
                  color="error"
                  onClick={deleteFromCatalog}
                  value={selectedItem._id}
                >
                  Delete the item
                </Button>


                </div>
              </div>
            </div>
          </div>
          <div className="closer" onClick={handleHideClick}></div>
        </div>
      </div>
    </>
  );
};

export default Modal;
