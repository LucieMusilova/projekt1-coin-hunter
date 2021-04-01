// definice prvků
let hraciPole = {
  sirka: window.innerWidth,
  vyska: window.innerHeight,
  skore: 0,
  skoreElement: document.getElementById("score"),
  hudba: document.getElementById("hudba"),
  zvukMince: document.getElementById("zvukmince"),
  zvukFanfara: document.getElementById("zvukfanfara")
}


let panacek = {
  element: document.getElementById("panacek"),
  x: window.innerWidth/2 - 32,
  y: window.innerHeight/2 - 35,
  sirka: 64,
  vyska: 70,
  posun: 10
}

let mince = {
  element: document.getElementById("mince"),
  x: Math.floor(Math.random()* (window.innerWidth - 36)),
  y: Math.floor(Math.random()* (window.innerHeight - 36)), 
  sirka: 36,
  vyska: 36,
  hodnota: 1
}


// začátek hry
window.addEventListener("load", startHry);

// vložení prvků
function startHry() {
  umistiObjekt(panacek);
  vyberMinci();
  umistiObjekt(mince);
}

function umistiObjekt(herniObjekt) {
  herniObjekt.element.style.left = herniObjekt.x + "px";
  herniObjekt.element.style.top = herniObjekt.y + "px";
}

// nastavení obrázku mince
function vyberMinci(){
   let nahodna = Math.floor(Math.random() * 10 + 1);

    if (nahodna >= 9){
        mince.element.src = "obrazky/mince.png";
        mince.hodnota = 3;
      } else if (nahodna >= 6) {
        mince.element.src = "obrazky/mince-stribrna.png";
        mince.hodnota = 2;
          } else {
            mince.element.src = "obrazky/mince-bronzova.png";
            mince.hodnota = 1;
          }
    }
  


// pohyb panáčka
function pohyb(key) {
  hraciPole.hudba.play();

  if (key.keyCode == "39") {
      // šipka doprava
      panacek.element.src = "obrazky/panacek-vpravo.png";
      panacek.x = panacek.x + panacek.posun;

      if (panacek.x > hraciPole.sirka - panacek.sirka) {
        panacek.x = hraciPole.sirka - panacek.sirka;
      }
  }

  if (key.keyCode == "37") {
      // šipka doleva
      panacek.element.src = "obrazky/panacek-vlevo.png";
      panacek.x = panacek.x - panacek.posun;

      if (panacek.x < 0) {
        panacek.x = 0;
      }
  }

  if (key.keyCode == "38") {
      // šipka nahoru
      panacek.element.src = "obrazky/panacek-nahoru.png";
      panacek.y = panacek.y - panacek.posun;

      if (panacek.y < 0) {
        panacek.y = 0;
      }
      
  }

  if (key.keyCode == "40") {
      // šipka dolů
      panacek.element.src = "obrazky/panacek.png";
      panacek.y = panacek.y + panacek.posun;

      if (panacek.y > hraciPole.vyska - panacek.vyska) {
        panacek.y = hraciPole.vyska - panacek.vyska;
      }
  }

  umistiObjekt(panacek);
  sebraniMince(panacek, mince);
}

// sebrani mince
function sebraniMince (panacek, mince) {
  if (!( panacek.x + panacek.sirka < mince.x
    || mince.x + mince.sirka < panacek.x
    || panacek.y + panacek.vyska < mince.y
    || mince.y + mince.vyska < panacek.y)) {

     hraciPole.zvukMince.play();
     pripisBody();
     mince.x = Math.floor(Math.random()* (window.innerWidth - 36));
     mince.y = Math.floor(Math.random()* (window.innerHeight - 36));
     vyberMinci();
     umistiObjekt(mince);
    }
} 

// zvýšení skóre
let finalniZvuk = false;

function pripisBody() {
  hraciPole.skore += mince.hodnota;
  hraciPole.skoreElement.innerHTML = hraciPole.skore;
  
  if (hraciPole.skore >= 10 && !finalniZvuk) {
    hraciPole.zvukFanfara.play();
    alert("Jsi vítez! :-)");
    finalniZvuk = true;
  }
}
