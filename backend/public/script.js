const uploadForm = document.getElementById("uploadForm");
const playerSection = document.getElementById("playerSection");
const audioPlayer = document.getElementById("audioPlayer");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(uploadForm);

  const res = await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (data.filePath) {
    audioPlayer.src = `http://localhost:3000${data.filePath}`;
    playerSection.style.display = "block";
  } else {
    alert("Upload failed!");
  }
});
