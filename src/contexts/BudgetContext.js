import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const BudgetContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // { id: ,
  //   name: ,
  //   max: }

  // { id: ,
  //   budgetId: ,
  //   amount: ,
  //   descripcion: }

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };
  const addExpenses = (amount, description, budgetId) => {
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
    setBudgets((prevBudgets) => {
      prevBudgets.filter((budget) => {
        return budget.id !== budgetId;
      });
    });
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
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
