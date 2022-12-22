import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./App.css";
import BudgetCard from "./components/BudgetCard";

function App() {
  return (
    <Container className="mt-4">
      <Stack direction="horizontal" gap={2}>
        <h3 className="me-auto">Budget App</h3>
        <Button variant="primary">Add Budget</Button>
        <Button variant="outline-primary">Add Expense</Button>
      </Stack>
      <Row xs={1} md={2} className="g-4">
        <Col>
          <BudgetCard amount={16} max={100} name="Casa"></BudgetCard>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
