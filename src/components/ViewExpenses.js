import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useBudgets } from "../contexts/BudgetContext";

export default function ViewExpenses({ show, setShow }) {
  const expenses = useBudgets();

  const deleteCurrentBudget = (currentId) => {
    setShow(false);
    if (currentId === "Uncategorized") {
      return;
    }
    expenses.deleteBudget(currentId);
  };

  console.log(expenses.budgetIdSelected);
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Total Expenses</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {expenses
            .getBudgetExpenses(expenses.budgetIdSelected)
            .map((expense) => {
              return (
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="fw-bold">{expense.description}</span>
                  <span className="ms-auto">${expense.amount}</span>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => deleteCurrentBudget(expenses.budgetIdSelected)}
        >
          Delete Budget
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
