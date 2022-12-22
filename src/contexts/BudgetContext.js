import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", [
    { name: "Uncategorized", id: "Uncategorized", max: 0 },
  ]);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [budgetIdSelected, setBudgetIdSelected] = useState("Uncategorized");

  const defaultValue = "Uncategorized";
  // { id: ,
  //   name: ,
  //   max: }

  // { id: ,
  //   budgetId: ,
  //   amount: ,
  //   descripcion: }

  const getBudgetExpenses = (budgetId) => {
    try {
      return expenses.filter((expense) => expense.budgetId === budgetId);
    } catch {
      console.error("error");
    }
  };
  const addExpenses = (description, amount, budgetId) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { description, amount, id: uuidv4(), budgetId }];
    });
  };
  const addBudget = (name, max) => {
    setBudgets((prevBudgets) => {
      return [...prevBudgets, { name, max, id: uuidv4() }];
    });
  };
  const deleteBudget = (budgetId) => {
    setBudgets((prevBudgets) =>
      prevBudgets.filter((budget) => budget.id !== budgetId)
    );
  };
  const deleteExpense = (expenseId) => {
    setExpenses((prevExpenses) => {
      prevExpenses.filter((expense) => {
        return expense.id !== expenseId;
      });
    });
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpenses,
        addBudget,
        deleteBudget,
        deleteExpense,
        budgetIdSelected,
        setBudgetIdSelected,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
