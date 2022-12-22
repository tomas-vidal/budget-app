import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  useBudgets,
  budgetIdSelected,
  setBudgetIdSelected,
} from "../contexts/BudgetContext";
import { v4 as uuidv4 } from "uuid";

function ModalAddExpenses({ show, setShow, onShowExpensesModal }) {
  const budgets = useBudgets();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (description, amount, budgetId) => {
    if (description === "" || amount === "") {
      return;
    }
    budgets.addExpenses(description, amount, budgetId);
    setDescription("");
    setAmount("");
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expenses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter name"
                min={0}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Form.Label>Category</Form.Label>
              <Form.Select
                defaultValue={budgets.budgetIdSelected}
                onChange={(e) => budgets.setBudgetIdSelected(e.target.value)}
              >
                {budgets.budgets.map((budget) => {
                  return <option value={budget.id}>{budget.name}</option>;
                })}
              </Form.Select>
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
            onClick={() =>
              handleSubmit(description, amount, budgets.budgetIdSelected)
            }
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddExpenses;
