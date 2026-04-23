
// Substituímos a chave fixa pelo comando que lê a variável da Vercel
const API_KEY = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GEMINI_API_KEY : "";

document.getElementById('dominarBtn').addEventListener('click', async function() {
    const input = document.getElementById('userInput').value;
    if (!input) return alert("Por favor, descreva suas tarefas ou o que está na sua mente.");

    const btn = this;
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    
    btn.disabled = true;
    loading.classList.remove('hidden');
    result.classList.add('hidden');

    try {
        // Se a chave não vier da Vercel, o código tenta usar a lógica de fallback
        const finalKey = API_KEY || "COLE_AQUI_A_SUA_CHAVE_NOVA_SE_QUISER_TESTAR_LOCAL";

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${finalKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Você é o DOMA, um assistente de produtividade para empreendedores. Analise o seguinte texto e organize em: 1. Prioridades Identificadas (em tópicos), 2. Sugestão de Agenda (Manhã/Tarde) e 3. Um insight motivacional curto. Seja direto e prático. Texto: ${input}` }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
             throw new Error(data.error.message);
        }

        const fullResponse = data.candidates[0].content.parts[0].text;

        document.getElementById('prioridades').innerText = "Análise concluída com sucesso!";
        document.getElementById('agenda').innerText = fullResponse;
        document.getElementById('insight').innerHTML = "💡 Inteligência Gemini Ativa.";

    } catch (error) {
        console.error(error);
        alert("Erro na IA: " + error.message);
    } finally {
        btn.disabled = false;
        loading.classList.add('hidden');
        result.classList.remove('hidden');
    }
});
