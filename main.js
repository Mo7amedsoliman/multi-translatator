const fromText = document.getElementById("from-text");
const toText = document.getElementById("to-text");
const fromLang = document.getElementById("from-lang");
const toLang = document.getElementById("to-lang");
const translateBtn = document.getElementById("translate-btn");

Object.entries(countries).forEach(([code, name]) => {
  const option1 = document.createElement("option");
  option1.value = code;
  option1.textContent = name;
  if (code === "en-GB") option1.selected = true;
  fromLang.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = code;
  option2.textContent = name;
  if (code === "ar-SA") option2.selected = true;
  toLang.appendChild(option2);
});

translateBtn.addEventListener("click", () => {
  const text = fromText.value.trim();

  if (!text) {
    toText.value = "NO QUERY SPECIFIED EXAMPLE REQUEST";
    return;
  }

  toText.value = "Translating...";

  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang.value}|${toLang.value}`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
    })
    .catch(() => {
      toText.value = "Error occurred while translating.";
    });
});
