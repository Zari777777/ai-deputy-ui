// УКАЖИ свой домен Railway (без завершающего /)
const API_URL = "https://ai-deputy-production.up.railway.app";

const qInput = document.getElementById("question");
const askBtn = document.getElementById("askBtn");
const ansDiv = document.getElementById("answer");

async function sendQuestion() {
  const question = (qInput.value || "").trim();
  if (!question) {
    ansDiv.textContent = "Введите вопрос.";
    return;
  }

  ansDiv.textContent = "Загрузка…";
  askBtn.disabled = true;

  try {
    const res = await fetch('${API_URL}/ask', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    // Если сервер вернул ошибку — покажем её текст
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      ansDiv.textContent = `Ошибка сервера (${res.status}). ${text || "Попробуйте позже."}`;
      return;
    }

    const data = await res.json();
    ansDiv.textContent = data.answer || "Нет ответа.";
  } catch (e) {
    // Чаще всего тут бывает CORS/сеть/не тот URL
    ansDiv.textContent = 'Ошибка соединения. Проверьте URL API и CORS.';
  } finally {
    askBtn.disabled = false;
  }
}

// Отправка по Enter
qInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendQuestion();
});
