/** @type {HTMLCanvasElement} */
/** @type {HTMLImageElement} */

const canvas = document.getElementById('canvas1');
const canvasZdrowie = document.getElementById('canvasPasekZdrowia');
const context = canvasZdrowie.getContext('2d');

const ctx = canvas.getContext('2d');
const postac = canvas.getContext('2d');

const postacObraz = new Image()
postacObraz.src = 'heros.png';
const wrogObraz = new Image()
wrogObraz.src = 'wrog.png';
const mapaObraz = new Image()
mapaObraz.src = 'mapa.jpg';
const poofObraz = new Image()
poofObraz.src = 'poof.png';
const apteczkaObraz = new Image()
apteczkaObraz.src = 'apteczka.png';

CANVAS_WIDTH = canvas.width = 1000;
CANVAS_HEIGHT = canvas.height = 1000;
var iloscWrogow = 15;
var ileWrogowZespawnowac = 0;
const wrogArray = [];
const img = new Image();
let klatka = 0;
var Losowa = 0;
var CzyNastapilaKolizja = false;
var KtoraFalaGlobalna = 0;


class kontrolerFali{
    constructor() {
        this.ktora_fala = 0;
        this.czyWlaczona = false;
        this.kontronowanieSpawnu = 0;
    }

    WlaczFale() {
        this.ktora_fala++;
    }
}
var kontrolerF = new kontrolerFali();

kontroler={
    gora: false,
    dol: false,
    prawo: false,
    lewo: false,
    strzal: false,
    sprawdzLewo: false,
    sprawdzPrawo:false,
    sprawdzGore: false,
    sprawdzDol: false,
    sprawdzstrzal: false
}

class PasekZdrowia {
    constructor() {
        this.x=0;
        this.y=0;
        this.width=-20;
        this.height=400;
        this.MaxZdrowia = 400;
        this.MaxWidth = 400;
        this.Zdrowie = 400;
        this.Kolor;
    }

    Wyswietl() {
        
        context.lineWith = 0;
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.width + postac1.HP, this.height)
        

    }


}

class Apteczka {
    constructor() {
        this.x = 2000;
        this.y = 2000;
        this.width = 100;
        this.height = 100;
        this.czyJestApteczka;
        this.sprawdzApteczke;
    }

    rysujApteczke() {
      
        ctx.drawImage(apteczkaObraz, this.x, this.y, this.width, this.height)
    }
}


class Postac {
    constructor() {
        this.x = 450.0;
        this.y = 450.0;
        this.width = 125;
        this.height =125;
        this.vx = 0;
        this.vy = 0;
        this.wysokoscSprajta=250;
        this.szerokoscSprajta = 250;
        this.fps = 0;

        this.HP = 400;

    }

   
    rysuj() {
        if (kontroler.sprawdzDol == true) {
            ctx.drawImage(postacObraz, this.fps * this.szerokoscSprajta, 0, this.szerokoscSprajta, this.wysokoscSprajta, this.x, this.y, this.width, this.height);
           }
        if (kontroler.sprawdzGore == true) {
            ctx.drawImage(postacObraz, this.fps * this.szerokoscSprajta, 500, this.szerokoscSprajta, this.wysokoscSprajta, this.x, this.y, this.width, this.height);
           }
        if (kontroler.sprawdzPrawo == true) {
            
            ctx.drawImage(postacObraz, this.fps * this.szerokoscSprajta, 0, this.szerokoscSprajta, this.wysokoscSprajta, this.x, this.y, this.width, this.height);
          }
        if (kontroler.sprawdzLewo == true) {
            ctx.drawImage(postacObraz, this.fps * this.szerokoscSprajta, 250, this.szerokoscSprajta, this.wysokoscSprajta, this.x, this.y, this.width, this.height);    
        }

    
       
    }
    aktualizuj() {
        
        if (klatka % 5 == 0) {
            this.fps > 2 ? this.fps = 0 : this.fps++;
        }
       
    }
    Oberwij() {
        this.HP -= 1;
    }
    
}

class Chmurka {
    constructor() {
        this.x=0;
        this.y=0;
        this.width = 250;
        this.height = 250;
        this.wysokoscSprajta = 250;
        this.szerokoscSprajta = 250;
        this.fps = 1;
    }
    rysujChmurke() {
        if (klatka % 2 == 5) {
            this.fps > 1 ? this.fps = 0 : this.fps++;
        }
       
            ctx.drawImage(poofObraz, this.fps * this.szerokoscSprajta, 1, this.szerokoscSprajta, this.wysokoscSprajta, this.x, this.y, this.width, this.height);
        
    }
}
var chmurka1 = new Chmurka();

class Wrog {
    constructor() {
        this.losujZktorejStronyPrzyjdzieWrog();
        this.x = -800 + Math.random() * 500;
        this.y = -800 + Math.random() * 500;
        this.width=125;
        this.height = 125;
        this.speed = 1.3;
        this.fps = 1;
        this.wysokoscSprajta = 250;
        this.szerokoscSprajta = 250;
        this.LosujWejscie = 0;
        this.losujZktorejStronyPrzyjdzieWrog();
    }
    aktualizuj() {
        if (this.x <= postac1.x) this.x += this.speed;
        if (this.x >= postac1.x) this.x -= this.speed;
        if (this.y <= postac1.y) this.y += this.speed;
        if (this.y >= postac1.y) this.y -= this.speed;
        
        }
        
    
    rysuj() {
        //console.log( postac1.y);
        //  ctx.fillStyle = 'black';
        if (klatka % 5 == 0) {
            this.fps > 2 ? this.fps = 0 : this.fps++;
        }
        
            ctx.drawImage(wrogObraz, this.fps * this.szerokoscSprajta, 0, this.szerokoscSprajta, this.wysokoscSprajta, this.x, this.y, this.width, this.height);
        
        
    }

    losujZktorejStronyPrzyjdzieWrog() {
        
       
        Losowa = Math.floor(Math.random() * 2);
        if (Losowa == 1 && kontrolerF.ktora_fala == 1) { this.x = -800 + Math.random() * 500; this.y = -800 + Math.random() * 500; }
        if (Losowa == 0 ) { this.x = 1000 + Math.random() * 500; this.y = 1000 + Math.random() * 500; }
        

    }
    

 
}

class Pocisk {
    constructor() {
        this.x=0;
        this.y=0;
        this.width = 400;
        this.height = 0;
       
    }

    rysujPocisk() {
        if (kontroler.sprawdzLewo) {
            this.x = postac1.x + 80;
            this.y = postac1.y + 90;
            this.width = 400;
            this.height = 4;
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.width, this.height)
            
        }
        else if (kontroler.sprawdzDol) {
            this.x = postac1.x + 40;
            this.y = postac1.y + 100;
            this.width = 4;
            this.height = 400;
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.width, this.height)
            
        }
       else if (kontroler.sprawdzPrawo) {
            this.x = postac1.x - 360;
            this.y = postac1.y + 90;
            this.width = 400;
            this.height = 4;
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.width, this.height)
           
        }
        else if (kontroler.sprawdzGore) {
            this.x = postac1.x + 40;
            this.y = postac1.y - 400;
            this.width = 4;
            this.height = 400;
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.width, this.height)
            
        }
    }
}

var pocisk1 = new Pocisk();
const pasekzdrowia1 = new PasekZdrowia();
var WROG = new Wrog();
var apteczka1 = new Apteczka();





function animacja() {
    if (ileWrogowZespawnowac == 0) {
        apteczka1.sprawdzApteczke = true;
        apteczka1.czyWlaczona = true;
        for (let i = 1; i <= iloscWrogow; i++) {

            wrogArray.push(new Wrog());
            ileWrogowZespawnowac++;
            
            //alert("tworze");
        }
    }
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.drawImage(mapaObraz, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    kontrolerF.WlaczFale();

    if (kontrolerF.ktora_fala >= 1) {
        if (kontrolerF.czyWlaczona = true && kontrolerF.kontronowanieSpawnu == 0) { WROG.losujZktorejStronyPrzyjdzieWrog(); kontrolerF.kontronowanieSpawnu = 1; }
        wrogArray.forEach(wrog => {

            wrog.aktualizuj();
            wrog.rysuj();
        })
    }

    wrogArray.forEach(wrog => {
        if (pocisk1.x < wrog.x + wrog.width &&
            pocisk1.x + pocisk1.width > wrog.x &&
            pocisk1.y < wrog.y + wrog.height &&
            pocisk1.y + pocisk1.height > wrog.y) {

            CzyNastapilaKolizja = true;

            chmurka1.x = wrog.x - 80;
            chmurka1.y = wrog.y - 60;

            delete wrog.x;
            delete wrog.y;
            delete wrog.width;
            delete wrog.height;
            delete pocisk1.x;
            delete pocisk1.y;
            delete pocisk1.width;
            delete pocisk1.height;
            chmurka1.rysujChmurke();
            ileWrogowZespawnowac--;
            if (ileWrogowZespawnowac == 0) { iloscWrogow += 5; KtoraFalaGlobalna++; }
        }

        if (postac1.x + 80 < apteczka1.x + apteczka1.width &&
            postac1.x - 50 + postac1.width > apteczka1.x &&
            postac1.y + 50 < apteczka1.y + apteczka1.height &&
            postac1.y - 50 + postac1.height > apteczka1.y) {


            apteczka1.x=2000;
            apteczka1.y=2000;
            postac1.HP += 100;
            apteczka1.czyJestApteczka = true;

        }



        if (postac1.x + 80 < wrog.x + wrog.width &&
            postac1.x - 50 + postac1.width > wrog.x &&
            postac1.y + 50 < wrog.y + wrog.height &&
            postac1.y - 50 + postac1.height > wrog.y) {
            postac1.Oberwij();

        }


    })

    animacja2();


    postac1.x += postac1.vx;
    postac1.y += postac1.vy;
    postac1.vx *= 0.9;
    postac1.vy *= 0.9;

    if (kontroler.strzal) {

        pocisk1.rysujPocisk();
        kontroler.strzal = false;
    }
    context.clearRect(0, 0, 400, 400);
    pasekzdrowia1.Wyswietl();
    if (apteczka1.czyJestApteczka == false && apteczka1.sprawdzApteczke == true && KtoraFalaGlobalna == 3 || KtoraFalaGlobalna == 6 ||
        KtoraFalaGlobalna == 9 || KtoraFalaGlobalna == 14 || KtoraFalaGlobalna == 17 || KtoraFalaGlobalna == 20) {
       
        apteczka1.rysujApteczke();
        if (apteczka1.sprawdzApteczke == true) {
            apteczka1.x = 400;
            apteczka1.y = 400;
        }
        apteczka1.sprawdzApteczke = false;
            
       
       

    }
       
    requestAnimationFrame(animacja);
    
}


var postac1 = new Postac();

function animacja2(e) {

    
    postac1.rysuj();
    postac1.aktualizuj();
    if (window.event) {
        key = e.keyCode;

        switch (key) {
            case 40: postac1.y += postac1.vy; kontroler.dol = true; kontroler.sprawdzDol = true; kontroler.sprawdzGore = false; kontroler.sprawdzLewo = false; kontroler.sprawdzPrawo = false; break;
            case 38: postac1.y -= postac1.vy; kontroler.gora = true; kontroler.sprawdzDol = false; kontroler.sprawdzGore = true; kontroler.sprawdzLewo = false; kontroler.sprawdzPrawo = false; break;
            case 39: postac1.x += postac1.vx; kontroler.prawo = true; kontroler.sprawdzDol = false; kontroler.sprawdzGore = false; kontroler.sprawdzLewo = true; kontroler.sprawdzPrawo = false;;break; 
            case 37: postac1.x -= postac1.vx; kontroler.lewo = true; kontroler.sprawdzDol = false; kontroler.sprawdzGore = false; kontroler.sprawdzLewo = false; kontroler.sprawdzPrawo = true;; break;
            case 32: kontroler.strzal = true; kontroler.sprawdzstrzal=true; break;
        }
    }
 

    if (kontroler.lewo) {
        
            postac1.vx -= 2
            kontroler.lewo = false;
        }

        if (kontroler.prawo) {

            postac1.vx += 2;
            kontroler.prawo = false;

        }

        if (kontroler.gora) {

            postac1.vy -= 2;
            kontroler.gora = false;
        }

        if (kontroler.dol) {

            postac1.vy += 2;
            kontroler.dol = false;

        }

        if (postac1.x <= 0) {

            postac1.x = 0;

        } else if (postac1.x >= 930) {

            postac1.x = 930;

        }
        if (postac1.y <= 10) {

            postac1.y = 10;

        } else if (postac1.y >= 900) {

            postac1.y = 900;

    }
    WyswietlFale();
    klatka++;
    if (postac1.HP <= 0) { alert("Przegrales!    " + "Przetrwales:   " + KtoraFalaGlobalna + "    Fal"); }
    Hardmode();
}


animacja();

document.addEventListener("keydown", animacja2);



function WyswietlFale() {
    document.getElementById("fala").innerHTML = KtoraFalaGlobalna;
}

function Hardmode() {
    if (KtoraFalaGlobalna > 20) {
        document.getElementById("HARDMODE").innerHTML = "HARDMODE!";
        document.body.style.backgroundColor = "grey";
    }
        
}


