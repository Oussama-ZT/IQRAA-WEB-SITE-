//------Explors button

let exploreBtn = document.querySelector('.title .btn'),
    HadithSection = document.querySelector('.hadith');
exploreBtn.addEventListener('click',() =>{

    HadithSection.scrollIntoView({
        behavior : "smooth"
    })

})

let fixedNav = document.querySelector('.header'),
    scrollBtn = document.querySelector('.scrollBtn');
    window.addEventListener("scroll",() =>
      {
          window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
          window.scrollY > 500 ? scrollBtn.classList.add('active') : scrollBtn.classList.remove('active');
    })
scrollBtn.addEventListener('click',()=>{
    window.scrollTo({
        top :0 , 
        behavior : "smooth"
    })
})

// hadith changer 

let hadithContainer = document.querySelector('.hadithContainer'),
    next  = document.querySelector('.buttons .next'),
    prev  = document.querySelector('.buttons .prev'),
    number  = document.querySelector('.buttons .number');

    let hadithIndex = 0;
HadithChanger();
function HadithChanger()
{
    fetch("https://api.hadith.gading.dev/books/muslim?range=1-150")
    .then(response => response.json())
    .then(data =>{
        
        let Hadiths = data.data.hadiths;
        changeHadith();
        next.addEventListener('click', ()=>{
            hadithIndex == 149 ? hadithIndex = 0 : hadithIndex ++ ;
            changeHadith()
        })
        prev.addEventListener('click', ()=>{
            hadithIndex == 0 ? hadithIndex = 149 : hadithIndex -- ;
            changeHadith()
        })
        function changeHadith()
        {
            hadithContainer.innerText = Hadiths[hadithIndex].arab;
            number.innerText = `150 - ${hadithIndex + 1}`
        }
    })
}

//link Sections 
let sections = document.querySelectorAll("section"),
    links = document.querySelectorAll('.header ul li');

links.forEach(link => {
    link.addEventListener('click', () =>{
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target = link.dataset.filter;
        sections.forEach(section=>{
            if(section.classList.contains(target))
            {
                section.scrollIntoView({
                    behavior : "smooth"
                })
            }
        })
    } )
    
 });

 //surah api

  let surahsContainer = document.querySelector('.surahsContainer');

getsurah()
 function getsurah()
{
    //fetch surahs meta data {name of surahs}

    fetch('https://quran-endpoint.vercel.app/quran')
    .then(response => response.json())
    .then(data =>{
       for (let surah in data.data) {
        
          surahsContainer.innerHTML+= 
          `
            <div class= surahs>
                 <p>${data.data[surah].asma.ar.long}
                    <br>
                    ${data.data[surah].asma.en.long}
                </p>
            </div> 
          `
       }
    
        let SurahsTitels = document.querySelectorAll('.surahs');
        let popup = document.querySelector('.surah-popup'),
            AyatContainer = document.querySelector('.ayat');


        SurahsTitels.forEach((title,index) =>{
            title.addEventListener('click',() =>
                {
                    fetch(`\http://api.alquran.cloud/v1/surah/${index + 1}`)
                    .then(response => response.json())
                    .then(data =>{
                        
                        AyatContainer.innerHTML="";
                        let Ayat = data.data.ayahs;
                        Ayat.forEach(aya => {
                            popup.classList.add('active');
                            AyatContainer.innerHTML += 
                            `
                            <p>(${aya.numberInSurah}) - ${aya.text}</p>
                            `
                        })
                    })
                });
            })

        let closepopup = document.querySelector('.close-popup');
        closepopup.addEventListener('click',() => 
        {
            popup.classList.remove('active');
        })


    });    
}

//Active side bars
let bars = document.querySelector('.bars'),
    Sidebar = document.querySelector('.header ul');
bars.addEventListener('click',() =>{
    Sidebar.classList.toggle("active");
})
