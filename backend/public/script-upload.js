const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(uploadForm);
  const res = await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (data.filePath) {
    alert("✅ Uploaded successfully!");
    uploadForm.reset();
  } else {
    alert("❌ Upload failed.");
  }
});
