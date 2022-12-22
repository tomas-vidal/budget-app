import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import "./App.css";
import BudgetCard from "./components/BudgetCard";
import ModalAddBudget from "./components/ModalAddBudget";
import ModalAddExpenses from "./components/ModalAddExpenses";
import { useBudgets } from "./contexts/BudgetContext";
import { v4 as uuidv4 } from "uuid";
import ViewExpenses from "./components/ViewExpenses";

function App() {
  const [showBudget, setShowBudget] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [showModalTotalExpenses, setShowModalTotalExpenses] = useState(false);

  const context = useBudgets();

  const { setBudgetIdSelected, budgetIdSelected } = useBudgets();
  const onShowExpensesModal = (budgetName) => {
    setBudgetIdSelected(budgetName);
    setShowExpenses(true);
  };

  const onShowAllExpenses = (id) => {
    setBudgetIdSelected(id);
    setShowModalTotalExpenses(true);
  };

  return (
    <Container className="mt-4">
      <Stack direction="horizontal" gap={2}>
        <h3 className="me-auto">Budget App</h3>
        <Button variant="primary" onClick={() => setShowBudget(true)}>
          Add Budget
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => onShowExpensesModal("Uncategorized")}
        >
          Add Expense
        </Button>
      </Stack>
      <Row xs={1} md={2} className="g-4 mt-2">
        {context.budgets.map((budget, i) => {
          return (
            <Col>
              <BudgetCard
                key={i}
                max={budget.max}
                name={budget.name}
                id={budget.id}
                show={showExpenses}
                onShowExpensesModal={onShowExpensesModal}
                onShowAllExpenses={onShowAllExpenses}
              ></BudgetCard>
            </Col>
          );
        })}
      </Row>
      <ModalAddBudget
        show={showBudget}
        setShow={setShowBudget}
      ></ModalAddBudget>
      <ModalAddExpenses
        show={showExpenses}
        setShow={setShowExpenses}
        onShowExpensesModal={onShowExpensesModal}
      ></ModalAddExpenses>
      <ViewExpenses
        show={showModalTotalExpenses}
        setShow={setShowModalTotalExpenses}
      />
    </Container>
  );
}

export default App;
