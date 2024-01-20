// Bilal love streaming worksspace//
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "You Alone",
    artist: "Ewyse",
    duration: "2:50",
    src: "https://cdn.six9ja.com/wp-content/uploads/2023/08/Just_Ewyse_-_You_Alone.mp3",
  },
  {
    id: 1,
    title: "Ololufe",
    artist: "Flavour ft Chidinma",
    duration: "3:14",
    src: "https://cdn.xclusivepop.com/wp-content/uploads/2022/01/Flavour_ChidinmA_-_Ololufe.mp3",
  },
  {
    id: 2,
    title: "You Are The Reason",
    artist: "Calum Scott",
    duration: "3:24",
    src: "https://justnaijabase.com/upload/2023/10/Calum_Scott_-_You_Are_The_Reason.mp3",
  },
  {
    id: 3,
    title: "Falling",
    artist: "Trevor Daniel",
    duration: "2:39",
    src: "https://files.gospeljingle.com/uploads/music/2023/01/Trevor_Daniel_-_Falling.mp3",
  },
  {
    id: 4,
    title: "Iyawo Mi",
    artist: "Flavour ft Chidinma",
    duration: "3:25",
    src: "https://cdn2.justnaija.me/uploads/music/2019/11/Flavour-Iyawo-Mi-feat-Chidinma-(JustNaija.com).mp3"
  },
];

const audio = new Audio();
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");
  highlightCurrentSong();
  setPlayerDisplay();
  audio.play();
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  
  playButton.classList.remove("playing");
  audio.pause();
};

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};

const playPreviousSong = () => {
   if (userData?.currentSong === null) return;
   else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
   }
};
const setPlayerDisplay = () => {
    const playingSong = document.getElementById("player-song-title");
    const songArtist = document.getElementById("player-song-artist");
    const currentTitle = userData?.currentSong?.title;
const currentArtist = userData?.currentSong?.artist;
playingSong.textContent = currentTitle ? currentTitle : "";
songArtist.textContent = currentArtist ? currentArtist : "";
  };

  const shuffle = () => {
  
    userData?.songs.sort(() => Math.random() - 0.5);
    userData.currentSong = null;
    userData.songCurrentTime = 0;
     renderSongs(userData?.songs);
 pauseSong();
 setPlayerDisplay();
 setPlayButtonAccessibleText();
  };

 
const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });



};

const renderSongs = (array) => {
  const songsHTML = array
    .map((song)=> {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
          <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">

        </button>
      </li>
      `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;
};

const setPlayButtonAccessibleText = () => {
    const song = userData?.currentSong || userData?.songs[0];
    playButton.setAttribute(
        "aria-label",
        song?.title ? `Play ${song.title}` : "Play"
      );
}



const getCurrentSongIndex = () => userData?.songs.indexOf(userData.currentSong);

playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

pauseButton.addEventListener("click",  pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

shuffleButton.addEventListener("click", shuffle);

audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;
  if(nextSongExists) {
   playNextSong();
  }
  userData.currentSong = null;
  userData.songCurrentTime = 0; 
})

renderSongs(userData?.songs);