const songs = document.querySelectorAll('.song');
const audio = document.querySelector('.audio');
const searchInput = document.querySelector('#search');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    songs.forEach(song => {
        const songTitle = song.querySelector('h2').textContent.toLowerCase();
        if (songTitle.includes(searchTerm)) {
            song.style.display = 'flex';
        } else {
            song.style.display = 'none';
        }
    });
});

songs.forEach(song => {
    song.addEventListener('click', () => {
        const src = song.dataset.src;
        audio.src = src;
        audio.play();
    });
});