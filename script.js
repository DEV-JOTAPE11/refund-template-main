// Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos ds lista.
const expenseList = document.querySelector("ul");
const expensQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");

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

// Adiciona um novo item na lista de despesas.
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
    // Atualiza os totais.
    updateTotals();
  } catch (error) {
    alert("Erro ao atualizar a lista de despesas.");
    console.error("Erro ao adicionar despesa:", error);
  }
}

// Atualiza totais.
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista de despesas (ul).
    const items = expenseList.children;

    // Atualiza a quantidade de itens da lista.
    expensQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;


    // Variavel para incrementar o total.
    let total = 0;

    // Pecorre cada item(li) da lista (ul).
    for (let item = 0; item < items.length; item++) {
        const itemAmount = items[item].querySelector(".expense-amount");

        // Remove os caracteres não numéricos e substitui a vírgula pelo ponto.
        let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");

        // Converte o valor para float.
        value = parseFloat(value);

        // Verifica se o valor é um número válido antes de adicionar ao total.
        if (isNaN(value)) {
          return alert("Não foi possível calcular o total. Valor inválido encontrado.");
        }

        // Incrementar o valor total.
        total += Number(value);
    }

    // Cria a span para adicionar o R$ formatado.
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    // Formata o valor e remove o R$ que será exibido pela small com um estilo customizado.
    total = formatCurrency(total).toUpperCase().replace("R$", "");

    // Limpa o conteúdo do elemento
    expensesTotal.innerHTML = "";

    // Adiciona o símbolo e o total formatado ao elemento.
    expensesTotal.append(symbolBRL, total);




  } catch (error) {
    console.log(error);
    alert("Erro ao atualizar os totais.");
  }
}


// Evento que captura o clique no ícone de remoção.
expenseList.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-icon")) {
        // Obtém o elemento pai (li) do ícone clicado.
        const item = event.target.closest(".expense");

        // Remove o item da lista.
        item.remove();
    }

    // Atualiza os totais após a remoção.
    updateTotals();
});
