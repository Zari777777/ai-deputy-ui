async function sendQuestion() {
  const question = document.getElementById("question").value;
  const answerDiv = document.getElementById("answer");

  answerDiv.innerHTML = "Загрузка...";

  try {
    const response = await fetch("https://ai-deputy-production.up.railway.app/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    answerDiv.innerHTML = data.answer || "Нет ответа";
  } catch (err) {
    answerDiv.innerHTML = "Ошибка соединения";
  }
}
