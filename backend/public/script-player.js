const songList = document.getElementById("songList");
const audioPlayer = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");
const playerControls = document.getElementById("playerControls");
const myPlaylist = document.getElementById("myPlaylist");

let playlist = JSON.parse(localStorage.getItem("playlist")) || [];

function savePlaylist() {
  localStorage.setItem("playlist", JSON.stringify(playlist));
  renderPlaylist();
}

function renderPlaylist() {
  myPlaylist.innerHTML = "";

  if (playlist.length === 0) {
    myPlaylist.innerHTML = "<p>No songs in playlist.</p>";
    return;
  }

  playlist.forEach((song, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button class="song-button" style="margin-right:10px;" onclick="playFromPlaylist('${song.url}', '${song.name}')">
        ▶️ ${song.name}
      </button>
      <button class="glow-btn" style="background:#ff4b4b; padding:8px 14px;" onclick="removeFromPlaylist(${index})">❌</button>
    `;
    myPlaylist.appendChild(div);
  });
}

function playFromPlaylist(url, name) {
  audioPlayer.src = `http://localhost:3000${url}`;
  audioPlayer.play();
  nowPlaying.innerText = `Now Playing: ${name}`;
  playerControls.style.display = "block";
}

function removeFromPlaylist(index) {
  playlist.splice(index, 1);
  savePlaylist();
}

async function fetchSongs() {
  try {
    const res = await fetch("http://localhost:3000/songs");
    const songs = await res.json();

    if (songs.length === 0) {
      songList.innerHTML = "<p>No songs found. Please upload one.</p>";
      return;
    }

    songList.innerHTML = "";
    songs.forEach((song) => {
      const wrapper = document.createElement("div");
      wrapper.style.margin = "10px";

      const playBtn = document.createElement("button");
      playBtn.innerText = song.name;
      playBtn.classList.add("song-button");
      playBtn.onclick = () => {
        audioPlayer.src = `http://localhost:3000${song.url}`;
        audioPlayer.play();
        nowPlaying.innerText = `Now Playing: ${song.name}`;
        playerControls.style.display = "block";
      };

      const addBtn = document.createElement("button");
      addBtn.innerText = "➕";
      addBtn.classList.add("glow-btn");
      addBtn.style.marginLeft = "10px";
      addBtn.style.padding = "8px 14px";
      addBtn.onclick = () => {
        if (!playlist.find((p) => p.url === song.url)) {
          playlist.push(song);
          savePlaylist();
        }
      };

      wrapper.appendChild(playBtn);
      wrapper.appendChild(addBtn);
      songList.appendChild(wrapper);
    });

    renderPlaylist();
  } catch (error) {
    songList.innerHTML = "<p>🚫 Error loading songs.</p>";
    console.error("Error fetching songs:", error);
  }
}

fetchSongs();
