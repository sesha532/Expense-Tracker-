document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const descriptionInput = document.getElementById('description');
    const categoryInput = document.getElementById('category');
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const expenseTableBody = document.getElementById('expenseTableBody');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let editIndex = -1;

    const renderExpenses = () => {
        expenseTableBody.innerHTML = '';
        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.amount}</td>
                <td>${expense.description}</td>
                <td>${expense.category}</td>
                <td>
                    <button class="edit" onclick="editExpense(${index})">Edit Expense</button>
                    <button class="delete" onclick="deleteExpense(${index})">Delete Expense</button>
                </td>
            `;
            expenseTableBody.appendChild(row);
        });
    };

    const saveExpenses = () => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    const addExpense = () => {
        const expense = {
            amount: amountInput.value,
            description: descriptionInput.value,
            category: categoryInput.value,
        };
        if (editIndex >= 0) {
            expenses[editIndex] = expense;
            editIndex = -1;
            addExpenseBtn.textContent = 'Add Expense';
        } else {
            expenses.push(expense);
        }
        saveExpenses();
        renderExpenses();
        amountInput.value = '';
        descriptionInput.value = '';
        categoryInput.value = 'Food';
    };

    addExpenseBtn.addEventListener('click', (event) => {
        event.preventDefault();
        addExpense();
    });

    window.editExpense = (index) => {
        const expense = expenses[index];
        amountInput.value = expense.amount;
        descriptionInput.value = expense.description;
        categoryInput.value = expense.category;
        editIndex = index;
        addExpenseBtn.textContent = 'Update Expense';
    };

    window.deleteExpense = (index) => {
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
    };

    renderExpenses();
});
