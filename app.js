const express = require('express');

const port = 3000;
const app = express();

const expense = [{
  id: 1,
  name: 'notebook',
  cost: 3500,
  createdAt: '09-05-2023'
}];

app.use(express.json())

app.get('/api/expense', (req, res) => {
  res.json({succsess: true, data: expense})
});

app.get('/api/expense/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundExpense = expense.find(item => item.id === id);
  if (foundExpense) {
    const expenseHtml = `
      <html>
        <body>
          <p>ID: ${foundExpense.id}</p>
          <p>Name: ${foundExpense.name}</p>
          <p>Cost: $${foundExpense.cost}</p>
          <p>Created At: ${foundExpense.createdAt}</p>
        </body>
      </html>
    `;
    res.send(expenseHtml);
  } else {
    res.status(404).send('<html><body><h1>Expense not found</h1></body></html>');
  }
});

app.post('/api/expense', (req, res) => {
  const expenses = req.body;
  const lastId = expense[expense.length -1]?.id;
  expenses.id = lastId ? lastId + 1 : 1;
  expense.push(expenses);
  res.send({data: expenses});
});


app.put('/api/expense/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = expense.findIndex(item => item.id === id);
  if (index !== -1) {
    const updatedExpense = { ...expense[index], ...req.body };
    expense[index] = updatedExpense;
    res.send({ message: `Expense with ID ${id} updated successfully`,
    updatedExpense: updatedExpense
  });
    
  } else {
    res.status(404).send({ message: `Expense with the ID ${id} was not found!` });
  }
});

app.delete('/api/expense/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = expense.findIndex(item => item.id === id);
  if (index !== -1) {
    expense.splice(index, 1); 
    res.send({ message: `Expense with ID ${id} deleted successfully` });
  } else {
    res.send({ message: `Expense with the ID ${id} was not found!` });
  }
});

app.listen(port, () => {
  console.log(`app started at localhost${port}`)

})