// Укажи ровно свой домен Railway, без завершающего слэша!
const API_URL = "https://ai-deputy-production.up.railway.app";

const qInput = document.getElementById("question");
const askBtn = document.getElementById("askBtn");
const ansDiv = document.getElementById("answer");

// На всякий случай отключим поведение формы (если вдруг обернёшь в <form>)
document.addEventListener("submit", (e) => e.preventDefault());

// Клик по кнопке запускает POST-запрос
askBtn.addEventListener("click", sendQuestion);

async function sendQuestion() {
  const question = (qInput.value || "").trim();
  if (!question) {
    ansDiv.textContent = "Введите вопрос.";
    return;
  }

  ansDiv.textContent = "Загрузка…";
  askBtn.disabled = true;

  try {
    const res = await fetch(${`API_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    if (!res.ok) {
      // Покажем реальный текст ошибки, если есть
      const text = await res.text().catch(() => "");
      ansDiv.textContent = `Ошибка сервера (${res.status}). ${text || "Попробуйте позже."}`;
      return;
    }

    const data = await res.json();
    ansDiv.textContent = data.answer || "Нет ответа";
  } catch (err) {
    ansDiv.textContent = "Ошибка соединения.";
  } finally {
    askBtn.disabled = false;
  }
}
