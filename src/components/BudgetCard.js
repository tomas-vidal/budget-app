import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import { type } from "@testing-library/user-event/dist/type";

export default function BudgetCard({ amount, max, name }) {
  const getPorcentage = (amount, max) => {
    if ((amount * 100) / max > 75) {
      return "danger";
    } else if ((amount * 100) / max > 50) {
      return "warning";
    } else {
      return "";
    }
  };

  const getBackgroundModified = (amount, max) => {
    if (amount > max) {
      return "bg-danger bg-opacity-10";
    } else {
      return "bg-light";
    }
  };

  return (
    <Card
      className={getBackgroundModified(amount, max)}
      border={amount > max ? "danger" : ""}
    >
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <div>{name}</div>
          <div>
            ${amount}
            <span className="text-muted fs-6 fw-light"> / ${max}</span>
          </div>
        </Card.Title>
        <ProgressBar
          now={amount}
          min={0}
          max={max}
          variant={getPorcentage(amount, max)}
          className="my-3"
        />
        <div className="d-flex justify-content-end gap-2">
          <Button variant="outline-primary">Add Expense</Button>
          <Button variant="outline-secondary">View Expense</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
