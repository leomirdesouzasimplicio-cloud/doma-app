document.getElementById('dominarBtn').addEventListener('click', function() {
    const input = document.getElementById('userInput').value;
    if (!input) return alert("Por favor, descreva suas tarefas.");

    const btn = this;
    btn.disabled = true;
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');

    // Simulação de processamento inteligente
    setTimeout(() => {
        btn.disabled = false;
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
        
        document.getElementById('prioridades').innerHTML = "• Processar pedidos pendentes<br>• Organizar arquivos de sublimação<br>• Revisar agenda de amanhã";
        document.getElementById('agenda').innerHTML = "<strong>Manhã:</strong> Foco em produção<br><strong>Tarde:</strong> Atendimento e Design";
        document.getElementById('insight').innerHTML = "💡 Focar em uma coisa de cada vez reduz a ansiedade.";
    }, 2000);
});