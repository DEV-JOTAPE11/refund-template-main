// Seleciona os elementos do formulário 
const form = document.querySelector("form")
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')



// Captura o evento de input para formatar o valor
amount.oninput = () => {
    // Obtém o valor atual e remove todos os caracteres não numéricos
    let value = amount.value.replace(/\D/g, '')

    // Converte o valor para número e divide por 100 para considerar os centavos
    value = Number(value) / 100

    // Atualiza o valor do input.
    amount.value = formatCurrency(value)
}

function formatCurrency(value) {
    //formata o valor para moeda brasileira
    value = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return value

} 

//Captura o evento de submit do formulário
form.onsubmit = (event) => {
    // Impede o comportamento padrão de recarregamento da página
    event.preventDefault()

    // Cria um novo objeto de despesa com os valores do formulário
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    // Chama a função para adicionar o item na lista.
    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
        throw new Error("Função não implementada")
    } catch (error) {
        alert("Erro ao atualizar a lista de despesas.")
        console.error("Erro ao adicionar despesa:", error)
    }
}