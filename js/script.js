console.log("let's write javascript");

async function getSongs() {
    try {
        const response = await fetch("http://localhost:3000/songs");
        const songs = await response.json();
        console.log("Songs:", songs);
        return songs;
    } catch (error) {
        console.error("Failed to load songs:", error);
        return [];
    }
}



async function main(){
    let songs = await getSongs();
    console.log(songs)

    let songUL =  document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" width="34" src="img/music.svg" alt="">
                            <div class="info">
                                <div> ${song.replaceAll("%20", " ")}</div>
                                <div>Harry</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div> </li>`;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })
}

main()


