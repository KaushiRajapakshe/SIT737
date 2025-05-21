function $(id) {
  return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", function () {
  // Only on home.html
  if ($("logout-btn")) {
    let navButtons = [
      { btn: "nav-reverse", sec: "reverse" },
      { btn: "nav-diff", sec: "diff" },
      { btn: "nav-count", sec: "count" },
      { btn: "nav-convert", sec: "convert" },
      { btn: "nav-history", sec: "history" },
    ];
    navButtons.forEach((n) => {
      $(n.btn).onclick = () => {
        document
          .querySelectorAll(".tool")
          .forEach((s) => (s.style.display = "none"));
        $(n.sec).style.display = "block";
        if (n.sec === "history") fetchHistory();
      };
    });
    $("logout-btn").onclick = async () => {
      await fetch("/auth/logout", { method: "POST" });
      window.location.href = "/";
    // $("logout-btn").onclick = () => {
    //   localStorage.removeItem("token"); // Remove JWT token
    //   window.location.href = "/";     
    // };
  }

  // Login/Register
  const loginView = $("login-view"),
    registerView = $("register-view");
  if ($("show-register"))
    $("show-register").onclick = () => {
      loginView.style.display = "none";
      registerView.style.display = "block";
    };
  if ($("show-login"))
    $("show-login").onclick = () => {
      registerView.style.display = "none";
      loginView.style.display = "block";
    };

  // Login Form
  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      try {
        const res = await fetch("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok) {
          // localStorage.setItem("token", data.token); 
          // Login successful — redirect to home.html
          window.location.href = "home.html";
        } else {
          document.getElementById("login-error").textContent =
            data.message || "Login failed";
        }
      } catch (err) {
        document.getElementById("login-error").textContent =
          "Error connecting to server";
      }
    });

  // Register Form
  if ($("register-form"))
    $("register-form").onsubmit = async (e) => {
      e.preventDefault();
      let u = $("register-username").value.trim(),
        p = $("register-password").value.trim();
      if (u.length < 3 || p.length < 6)
        return ($("register-error").innerText =
          "Username or password too short.");
      let r = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password: p }),
      });
      let d = await r.json();
      if (d.success) window.location.href = "/";
      else $("register-error").innerText = d.error || "Registration failed";
    };
});

// Toolkit functions
window.processReverse = async function () {
  let text = $("reverseInput").value;
  let res = await fetch("/api/reverse", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  let data = await res.json();
  $("reverseResult").textContent = data.result;
};

window.processDiff = async function () {
  let text1 = $("diff1").value,
    text2 = $("diff2").value;
  let res = await fetch("/api/diff", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text1, text2 }),
  });
  let data = await res.json();
  $("diffResult").textContent = data.result;
};

window.processCount = async function () {
  let text = $("countInput").value;
  let res = await fetch("/api/count", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  let data = await res.json();
  $("countResult").textContent =
    "Characters: " + data.characterCount + "\nWords: " + data.wordCount;
};

window.processConvert = async function () {
  let text = $("convertInput").value,
    type = $("caseType").value;
  let res = await fetch("/api/convert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, type }),
  });
  let data = await res.json();
  $("convertResult").textContent = data.result;
};

window.uploadFile = async function (input) {
  if (!input.files || !input.files[0]) return;
  let form = new FormData();
  form.append("file", input.files[0]);
  let res = await fetch("/api/upload", { method: "POST", body: form });
  let data = await res.json();
  alert("File content loaded:\n" + (data.content || ""));
};

window.fetchHistory = async function () {
  let res = await fetch("/api/history");
  let h = await res.json();
  let html = "<ul>";
  h.forEach((item) => {
    html += <li>[${new Date(item.createdAt).toLocaleString()}] <b>${item.action
      }</b>: <br/>Input: ${JSON.stringify(
        item.input
      )}<br/>Result: ${JSON.stringify(item.result)}</li>;
  });
  html += "</ul>";
  $("historyResult").innerHTML = html;
};