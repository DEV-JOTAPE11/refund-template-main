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


form.onsubmit = (event) => {
    event.preventDefault()
}