const jsonUrl = 'https://raw.githubusercontent.com/iamtatha/To-Store/refs/heads/master/chat.json';

let allMessages = [];

function displayMessages(messages) {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";

  if (messages.length === 0) {
    chatBox.innerHTML = "<p>No messages found.</p>";
    return;
  }

  messages.forEach(msg => {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");

    if (msg.speaker === "Tathagata") {
      msgDiv.classList.add("from-tathagata");
    } else if (msg.speaker == "System"){
        msgDiv.classList.add("from-system");
    } else {
      msgDiv.classList.add("from-mishti");
    }

    msgDiv.innerHTML = `
      <div>${msg.text}</div>
      <div class="meta">${msg.speaker} • ${msg.date} • ${msg.time}</div>
    `;

    chatBox.appendChild(msgDiv);
  });
}

function isValidDate(str) {
  return /^\d{2}\/\d{2}\/\d{2}$/.test(str);
}

function parseDate(str) {
  const [day, month, year] = str.split("/").map(Number);
  return new Date(2000 + year, month - 1, day); // '24' => 2024
}

function filterMessages(query) {
    query = query.trim().toLowerCase();
  
    if (!query) {
      displayMessages(allMessages);
      return;
    }
  
    if (isValidDate(query)) {
      const targetDate = parseDate(query);
      const filtered = allMessages.filter(msg => parseDate(msg.date) >= targetDate);
      displayMessages(filtered);
    } else {
      const matchIndex = allMessages.findIndex(msg => msg.text.toLowerCase().includes(query));
      if (matchIndex !== -1) {
        const filtered = allMessages.slice(matchIndex);
        displayMessages(filtered);
      } else {
        displayMessages([]); // No match found
      }
    }
  }

fetch(jsonUrl)
  .then(res => res.json())
  .then(data => {
    allMessages = data;
    displayMessages(allMessages);
  })
  .catch(err => {
    document.getElementById("chatBox").innerHTML = "Failed to load chat.";
    console.error(err);
  });

document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  filterMessages(query);
});

document.getElementById("goTopBtn").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  
  document.getElementById("goBottomBtn").addEventListener("click", () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });
  