import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useBudgets } from "../contexts/BudgetContext";

function ModalAddBudget({ show, setShow }) {
  const budgets = useBudgets();
  const [name, setName] = useState("");
  const [max, setMax] = useState("");

  const handleSubmit = (name, max) => {
    if (name === "" || max === "") {
      return;
    }
    budgets.addBudget(name, max);
    setName("");
    setMax("");
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Label>Max</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter name"
                min={0}
                onChange={(e) => setMax(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => handleSubmit(name, max)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddBudget;
