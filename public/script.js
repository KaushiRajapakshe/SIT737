function showSection(id) {
  document
    .querySelectorAll(".tool")
    .forEach((sec) => (sec.style.display = "none"));
  document.getElementById(id).style.display = "block";
}

async function postData(endpoint, data) {
  const res = await fetch(`/api/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

function processReverse() {
  const text = document.getElementById("reverseInput").value;
  postData("reverse", { text }).then((res) => {
    document.getElementById("reverseResult").textContent = res.result;
  });
}

function processDiff() {
  const text1 = document.getElementById("diff1").value;
  const text2 = document.getElementById("diff2").value;
  postData("diff", { text1, text2 }).then((res) => {
    document.getElementById("diffResult").textContent = res.result;
  });
}

function processCount() {
  const text = document.getElementById("countInput").value;
  postData("count", { text }).then((res) => {
    document.getElementById(
      "countResult"
    ).textContent = `Words: ${res.wordCount}, Characters: ${res.characterCount}`;
  });
}

function processConvert() {
  const text = document.getElementById("convertInput").value;
  const type = document.getElementById("caseType").value;
  postData("convert", { text, type }).then((res) => {
    document.getElementById("convertResult").textContent = res.result;
  });
}

async function uploadFile(input) {
  const file = input.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const data = await res.json();

  // Auto-fill based on current visible tool
  const visibleTool = [...document.querySelectorAll(".tool")].find(
    (el) => el.style.display === "block"
  );
  const textarea = visibleTool.querySelector("textarea");
  if (textarea) textarea.value = data.content;
}
