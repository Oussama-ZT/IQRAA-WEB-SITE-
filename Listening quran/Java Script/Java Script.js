/*-------------------Listening Quran--------------------------------*/

let audio = document.querySelector('.quranPlayer'),
    surahsContainer = document.querySelector('.surah'),
    ayah = document.querySelector('.ayah'),
    next = document.querySelector('.next'),
    prev = document.querySelector('.prev'),
    play = document.querySelector('.play');

getsurahs();
function getsurahs()
{
    //fetch section 

    fetch('https://quran-endpoint.vercel.app/quran')
    .then(response => response.json())
    .then(async data =>{
       for (let surah in data.data) {
        
          surahsContainer.innerHTML+= 
          `
           <div>
             <p>${data.data[surah].asma.ar.long}</p>
             <p>${data.data[surah].asma.en.long}</p>
           </div>
          `
       }


       // select surah

       let allSurahs =document.querySelectorAll('.surah div'),
       AyahsAudios , 
       AyahsText  ;
       allSurahs.forEach((surah,index) => {
             surah.addEventListener('click',()=>{
               fetch(`http://api.alquran.cloud/v1/surah/${index + 1}/ar.alafasy`)
               .then(response => response.json())
               .then(data =>{
                
                  let ayahs = data.data.ayahs;
                   AyahsAudios = [];
                   AyahsText = [];
                 
                    ayahs.forEach(ayahs => {
                      AyahsAudios.push(ayahs.audio)
                      AyahsText.push(ayahs.text)
                      
                    });
                    
                    let AyahIndex = 0 ; 
                    changeAyah(AyahIndex)
                    audio.addEventListener('ended',()=>{
                      AyahIndex ++;
                      if(AyahIndex < AyahsAudios.length)
                      {
                        changeAyah(AyahIndex)
                      }
                      else
                      {
                        AyahIndex=0;
                        changeAyah(AyahIndex);
                        audio.pause();


                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "surah has been ended",
                          showConfirmButton: false,
                          timer: 1500
                        });
                        isPlaying = true ;
                        togglePlay()
                      }
                    })

                    next.addEventListener('click', () =>{
                      AyahIndex < AyahsAudios.length - 1 ? AyahIndex ++ : AyahIndex=0;
                      changeAyah(AyahIndex)
                    })

                    prev.addEventListener('click', () =>{
                      AyahIndex == 0 ? AyahIndex = AyahsAudios.length - 1 :
                      AyahIndex -- ;
                      changeAyah(AyahIndex)
                    })
                    //play and pause audio

                    let isPlaying = false ;
                    togglePlay()
                    function togglePlay()
                    {
                      if(isPlaying)
                      {
                        audio.pause();
                        play.innerHTML = `<i class ="fas fa-play"></i>`;
                        isPlaying = false ;
                      }
                      else
                      {
                        audio.play();
                        play.innerHTML = `<i class ="fas fa-pause"></i>`;
                        isPlaying = true ;
                      }
                    }
                    play.addEventListener('click',togglePlay)



                    function changeAyah(index)
                    {
                      audio.src = AyahsAudios[index];
                      ayah.innerHTML = AyahsText[index];

                    }
                  })
             })
       })

    })


    
}

let quranVerses = [];
fetch(
  "https://api.quran.com/api/v4/quran/verses/uthmani_tajweed"
)
  .then((res) => res.json())
  .then((data) =>
    data["verses"].forEach((verse) => {
      if (verse["verse_key"].startsWith("114")) {
        quranVerses.push(verse["text_uthmani_tajweed"]);
        quranVerses.push("<br/>");
      }
    })
  );
document.getElementById("app").innerHTML = quranVerses;
