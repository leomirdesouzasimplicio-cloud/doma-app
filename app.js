const API_KEY = "AIzaSyCmkfo7stZ8n3-Hnw45mKErIUD8l4gzS2Q";

document.getElementById('dominarBtn').addEventListener('click', async function() {
    const input = document.getElementById('userInput').value;
    if (!input) return alert("Por favor, descreva suas tarefas ou o que está na sua mente.");

    const btn = this;
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    
    // Interface de carregamento
    btn.disabled = true;
    loading.classList.remove('hidden');
    result.classList.add('hidden');

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Você é o DOMA, um assistente de produtividade para empreendedores. Analise o seguinte texto e organize em: 1. Prioridades Identificadas (em tópicos), 2. Sugestão de Agenda (Manhã/Tarde) e 3. Um insight motivacional curto. Seja direto e prático. Texto: ${input}` }]
                }]
            })
        });

        const data = await response.json();
        const fullResponse = data.candidates[0].content.parts[0].text;

        // Separando a resposta para exibir nos campos certos
        document.getElementById('prioridades').innerText = "Análise concluída com sucesso!";
        document.getElementById('agenda').innerText = fullResponse;
        document.getElementById('insight').innerHTML = "💡 Inteligência Gemini Ativa.";

    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com a IA. Verifique se sua chave de API está correta.");
    } finally {
        btn.disabled = false;
        loading.classList.add('hidden');
        result.classList.remove('hidden');
    }
});
