const expenses = [];

document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    addExpense(description, amount, date);
    displayExpenses();
    document.getElementById('totalExpenses').innerText = calculateTotalExpenses();
});

document.getElementById('filterBtn').addEventListener('click', () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    try {
        if (!Date.parse(startDate) || !Date.parse(endDate)) {
            throw new Error('Invalid date range');
        }

        const filteredExpenses = filterByDateRange(new Date(startDate), new Date(endDate));
        displayFilteredExpenses(filteredExpenses);
    } catch (error) {
        console.error(error.message);
    }
});

document.getElementById('fetchReportBtn').addEventListener('click', async () => {
    try {
        const report = await fetchExpenseReport();
        document.getElementById('report').innerText = JSON.stringify(report, null, 2);
    } catch (error) {
        console.error(error);
        document.getElementById('report').innerText = error;
    }
});

function addExpense(description, amount, date) {
    try {
        if (!description) throw new Error("Description is required");
        if (isNaN(amount) || amount <= 0) throw new Error("Invalid amount");
        if (!Date.parse(date)) throw new Error("Invalid date");

        expenses.push({ description, amount, date: new Date(date) });
    } catch (error) {
        console.error(error.message);
    }
}

function displayExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.description}: $${expense.amount} on ${expense.date.toDateString()}`;
        expenseList.appendChild(listItem);
    });
}

function displayFilteredExpenses(filteredExpenses) {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    filteredExpenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.description}: $${expense.amount} on ${expense.date.toDateString()}`;
        expenseList.appendChild(listItem);
    });
}

function calculateTotalExpenses() {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

function filterByDateRange(startDate, endDate) {
    return expenses.filter(expense => expense.date >= startDate && expense.date <= endDate);
}

function fetchExpenseReport() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (expenses.length > 0) {
                resolve(expenses);
            } else {
                reject('No expenses found');
            }
        }, 1000);
    });
}