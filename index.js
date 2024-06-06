document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-calculadora');
    const resultados = document.getElementById('resultados');
    const limparBtn = document.querySelector('.limpar');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário

        const nome = document.getElementById('nome').value;
        const matricula = document.getElementById('Matrícula').value;
        const nota1 = parseFloat(document.getElementById('nota_b1').value);
        const nota2 = parseFloat(document.getElementById('nota_b2').value);
        
        // Remover mensagens de erro existentes
        const erroMatricula = document.getElementById('erro-matricula');
        const erroNota = document.getElementById('erro-nota');
        if (erroMatricula) {
            erroMatricula.remove();
        }
        if (erroNota) {
            erroNota.remove();
        }

        // Validar matrícula
        if (!/^\d{9}$/.test(matricula)) {
            const errorMsg = document.createElement('p');
            errorMsg.id = 'erro-matricula';
            errorMsg.style.color = 'red';
            errorMsg.textContent = 'Erro: O número de matrícula deve possuir exatamente 9 dígitos. Exemplo: 123456789';
            form.parentNode.insertBefore(errorMsg, form.nextSibling);
            return;
        }

        // Validar notas
        if (isNaN(nota1) || isNaN(nota2) || nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
            const errorMsg = document.createElement('p');
            errorMsg.id = 'erro-nota';
            errorMsg.style.color = 'red';
            errorMsg.textContent = 'Erro: As notas devem ser números entre 0 e 10.';
            form.parentNode.insertBefore(errorMsg, form.nextSibling);
            return;
        }

        const media = (nota1 + nota2) / 2;
        const resultado = media >= 5 ? 'Aprovado' : 'Reprovado';

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${nome}</td>
            <td>${matricula}</td>
            <td>${nota1.toFixed(2)}</td>
            <td>${nota2.toFixed(2)}</td>
            <td>${media.toFixed(2)}</td>
            <td>${resultado}</td>
        `;
        resultados.appendChild(newRow);

        // Limpa o formulário após a submissão
        form.reset();
    });

    limparBtn.addEventListener('click', function() {
        resultados.innerHTML = '';
    });
});
