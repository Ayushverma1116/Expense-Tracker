let expenses = [];

function addExpense() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (description && !isNaN(amount) && amount > 0) {
        const expense = {
            description,
            amount,
            category,
            date: new Date().toLocaleDateString()
        };
        expenses.push(expense);
        updateTable();
        updateSummary();
        clearInputs();
    } else {
        alert('Please enter valid description and amount');
    }
}

function updateTable() {
    const tableBody = document.getElementById('expenseTable');
    tableBody.innerHTML = '';
    expenses.forEach((expense, index) => {
        const row = `
            <tr>
                <td>${expense.description}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function updateSummary() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('totalAmount').textContent = total.toFixed(2);

    const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Other'];
    const categorySummary = document.getElementById('categorySummary');
    categorySummary.innerHTML = '';
    categories.forEach(category => {
        const categoryTotal = expenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);
        categorySummary.innerHTML += `
            <li class="list-group-item">${category}: $${categoryTotal.toFixed(2)}</li>
        `;
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateTable();
    updateSummary();
}

function clearInputs() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}