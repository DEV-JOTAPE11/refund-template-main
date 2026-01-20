// Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos ds lista.
const expenseList = document.querySelector("ul");

// Captura o evento de input para formatar o valor
amount.oninput = () => {
  // Obtém o valor atual e remove todos os caracteres não numéricos
  let value = amount.value.replace(/\D/g, "");

  // Converte o valor para número e divide por 100 para considerar os centavos
  value = Number(value) / 100;

  // Atualiza o valor do input.
  amount.value = formatCurrency(value);
};

function formatCurrency(value) {
  //formata o valor para moeda brasileira
  value = value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return value;
}

//Captura o evento de submit do formulário
form.onsubmit = (event) => {
  // Impede o comportamento padrão de recarregamento da página
  event.preventDefault();

  // Cria um novo objeto de despesa com os valores do formulário
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  // Chama a função para adicionar o item na lista.
  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar o item (li) na lista (ul).
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Cria o Ícone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Cria a info da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // Cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // Adiciona o nome e a categoria na div info da despesa
    expenseInfo.append(expenseName, expenseCategory);

    // Cria o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

    // Cria o icone de exclusão.
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "Remover despesa");


    // Adiciona as informações do item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    //Adiciona o item na lista
    expenseList.append(expenseItem);
  } catch (error) {
    alert("Erro ao atualizar a lista de despesas.");
    console.error("Erro ao adicionar despesa:", error);
  }
}
