const playlistSongs = document.getElementById("playlistSongs");
const audioPlayer = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");
const playerControls = document.getElementById("playerControls");

let playlist = JSON.parse(localStorage.getItem("playlist")) || [];

function renderPlaylist() {
  playlistSongs.innerHTML = "";

  if (playlist.length === 0) {
    playlistSongs.innerHTML = "<p>No songs in playlist.</p>";
    return;
  }

  playlist.forEach((song, index) => {
    const div = document.createElement("div");
    div.classList.add("playlist-entry");

    const playBtn = document.createElement("button");
    playBtn.innerText = song.name;
    playBtn.classList.add("song-button");
    playBtn.onclick = () => {
      audioPlayer.src = `http://localhost:3000${song.url}`;
      audioPlayer.play();
      nowPlaying.innerText = `Now Playing: ${song.name}`;
      playerControls.style.display = "block";
    };

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "❌";
    removeBtn.classList.add("glow-btn");
    removeBtn.style.background = "#ff4b4b";
    removeBtn.style.padding = "8px 14px";
    removeBtn.onclick = () => {
      playlist.splice(index, 1);
      localStorage.setItem("playlist", JSON.stringify(playlist));
      renderPlaylist();
    };

    div.appendChild(playBtn);
    div.appendChild(removeBtn);
    playlistSongs.appendChild(div);
  });
}

renderPlaylist();
