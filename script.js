const homePage = document.getElementById('home-page');
const quizPage = document.getElementById('quiz-page');
const loadingPage = document.getElementById('loading-page');
const resultPage = document.getElementById('result-page');
const quizForm = document.getElementById('quiz-form');
const resultText = document.getElementById('result-text');
const restartBtn = document.getElementById('restart-btn');

// Sua chave da API da OpenAI
const OPENAI_API_KEY = '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'; // Substitua pela sua chave

// Função para mostrar a página do questionário
document.getElementById('discover-btn').addEventListener('click', () => {
  homePage.classList.remove('active');
  quizPage.classList.add('active');
});

// Função para processar o questionário
quizForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Coletar respostas
  const answers = {
    sexuality: document.querySelector('input[name="sexuality"]:checked').value,
    personality: document.querySelector('input[name="personality"]:checked').value,
    lifestyle: document.querySelector('input[name="lifestyle"]:checked').value,
    value: document.querySelector('input[name="value"]:checked').value,
    date: document.querySelector('input[name="date"]:checked').value,
    communication: document.querySelector('input[name="communication"]:checked').value,
    priority: document.querySelector('input[name="priority"]:checked').value,
    conflict: document.querySelector('input[name="conflict"]:checked').value,
    ambition: document.querySelector('input[name="ambition"]:checked').value,
    appearance: document.querySelector('input[name="appearance"]:checked').value,
  };

  // Mostrar tela de carregamento
  quizPage.classList.remove('active');
  loadingPage.classList.add('active');

  // Gerar prompt para a IA
  const prompt = `Com base nas seguintes respostas, descreva o tipo ideal de homem de forma detalhada e orgânica:
  - Sexualidade: ${answers.sexuality}
  - Personalidade: ${answers.personality}
  - Estilo de vida: ${answers.lifestyle}
  - Valor principal: ${answers.value}
  - Tipo de encontro ideal: ${answers.date}
  - Comunicação: ${answers.communication}
  - Prioridade no relacionamento: ${answers.priority}
  - Como lida com conflitos: ${answers.conflict}
  - Nível de ambição: ${answers.ambition}
  - Estilo de aparência: ${answers.appearance}

  Descreva de forma natural, incluindo características, hobbies, pontos fortes e fracos, e como seria a dinâmica do relacionamento.`;

  // Enviar para a API da OpenAI
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // ou 'gpt-4' se disponível
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300, // Limite de tamanho da resposta
      }),
    });

    const data = await response.json();
    const result = data.choices[0].message.content;

    // Mostrar resultado
    loadingPage.classList.remove('active');
    resultPage.classList.add('active');
    resultText.textContent = result;
  } catch (error) {
    console.error('Erro ao chamar a API da OpenAI:', error);
    resultText.textContent = 'Erro ao gerar o resultado. Tente novamente.';
  }
});

// Função para reiniciar o questionário
restartBtn.addEventListener('click', () => {
  resultPage.classList.remove('active');
  homePage.classList.add('active');
  quizForm.reset();
});