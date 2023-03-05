

li = 0
n = 6 // liczba wszystkich funduszy
dl = 400

function linia(x1,x2,y1,y2,x){
    d = x2 - x1
    return ((x - x1) * y2 + (x2 - x) * y1) / d
}

dlugosci = []
for(i = 0; i < 10;i++){
    dlugosci.push(0)
}
for(i = 0; i < dl;i++){
    rnd = Math.floor(Math.random() * 10 - 0.0001)
    dlugosci[rnd]++
}
sumy = [0]
suma = 0
for(i = 0; i < 10;i++){
    suma = suma + dlugosci[i]
    sumy.push(suma)
}
gosp = []
for(i = 0; i < 10;i++){
    for(j = 0; j < dlugosci[i];j++){
        aktl = sumy[i] + j
        w = linia(sumy[i], sumy[i+1],i,i+1,aktl)
        gosp.push(Math.sin(3.14*w) / 100)
    }}

function dziel(str){
    str = str + ""
    wyn = ""
    for(al = str.length - 1;al >=0;al--){
        wyn = str[al] + wyn
        if((str.length - al) % 3 == 0){
            wyn = " " + wyn
        }
    }
    return wyn
}
function rys(el,tab,k){
    el2 = document.getElementById(el)
    while(el2.children.length > 0){
        el2.removeChild(el2.children[0]);
    }
    mn = 1000000
    mx = -100
    for(i = k; i < 100 + k;i++){
        if(tab[i] < mn){
            mn = tab[i]
        }
        if(tab[i] > mx){
            mx = tab[i]
        }
    }
    r = mx - mn
    for(i = 0; i < 100;i++){
        nw = document.createElement("div")
        nw.classList.value = "dot h"
        if(i + k > 0){
            if(tab[i + k] < tab[i + k - 1]){
                nw.classList.value = "dot b"
            }
        }
        nw.style.left = i + "%"
        nw.style.bottom = ((tab[i+k] - mn) / r) * 99 + "%"
        el2 = document.getElementById(el)
        el2.appendChild(nw)
    }
    for(i = 0; i < 99;i++){
        nw = document.createElement("div")
        nw.classList.value = "dot h"
        if(i + k > 0){
            if(tab[i + k + 1] < tab[i + k]){
                nw.classList.value = "dot b"
            }
        }
        nw.style.left = (i + 0.5) + "%"
        nw.style.bottom = (((tab[i+k] + tab[i+k+1]) / 2 - mn) / r) * 99 + "%"
        el2 = document.getElementById(el)
        el2.appendChild(nw)
    }
}

function zero(li){
    if(li < 10){
        return "0" + li
    }else{
        return "" + li
    }
}

function gen(dlug, start,ogol,wach,odg){
    console.log(ogol ** 12)
    wyj = [start]
    odc = []
    for(i = 0; i < dlug-1;i++){
        w = Math.log((1/(Math.random() * 7/8 + 1/16))-1) * wach
        if(w > 0){
            odc.push(w*w)
        }else{
            odc.push(-w*w)
        }
    }
    zm = []
    for(i = 0; i < dlug-1;i++){
        if(i >=2){
            zm.push(odc[i] + odc[i-1] + odc[i-2])
        }
        if(i == 0){
            zm.push(odc[0])
        }
        if(i == 1){
            zm.push(odc[0] + odc[1])
        }
        if(i == 2){
            zm.push(odc[0]+odc[1] + odc[2])
        }
        if(zm[i] < -(99 / 100 * start)){
            zm[i] = -99
        }
    }
    if(odg > 1.6 && krach > 100 && krach < 199){
        zm[krach] = -30
    }
    if(odg > 2 && krach > 100 && krach < 199){
        zm[krach] = -60
    }
    for(i = 0; i < dlug - 1;i++){
        wyj.push(wyj[i] * ((zm[i])/ 100 + ogol + gosp[i] * odg + 1))
    }
    return wyj
}
krach = Math.floor(Math.random() * 200)
do_konca = [
    gen(dl,280,Math.pow(1 + (8 / 100), 1/12) - 1,0.4,-0.1),
    gen(dl,1000,Math.pow(1 + (4 / 100), 1/12) - 1,0.2,0.7),
    gen(dl,1000,Math.pow(1 + (2 / 100), 1/12) - 1,0.3,1),
    gen(dl,1000,Math.pow(1 + (7 / 100), 1/12) - 1,0.4,1.5),
    gen(dl,1000,Math.pow(1 + (9 / 100), 1/12) - 1,0.5,1.7),
    gen(dl,1000,Math.pow(1 + (10 / 100), 1/12) - 1,0.6,3)]
bank = 100000000 //konto w banku w groszach, tu 1 000 000 zl
posiadane = [0,0,0,0,0,0]
kursy = [28000,20000]
nazwy = ["złoto", "Fundusz obligacji","Fundusz rynku pienieznego","Fundusz stabilnego wzrostu","Fundusz zrównoważony","Fundusz akcyjny"]
koncowki = [" g", "", "", "", "", ""]
dzielniki = [" / gram", "", "", "", "", ""]

akt_indeks = 0



//wszystkie kwoty w groszach
function kup(){
    indeks = akt_indeks
    liczba = ilosc.value * 1
    if(kursy[indeks] * liczba > bank){
        alert("Nie posiadasz wystarczających środków na koncie.")
    }else{
        kurs = kursy[indeks]
        posiadane[indeks] = posiadane[indeks] + liczba
        bank = bank - (kurs * liczba)
        document.getElementsByClassName("duza")[indeks].innerText = posiadane[indeks] + koncowki[indeks]
        sch()
    }
}

function zmf(){
    if(ilosc.value > 1){
        ilosc.value--
    }
}

function sprzedaj(){
    indeks = akt_indeks
    liczba = ilosc.value * 1
    if(liczba > posiadane[indeks]){
        alert("Nie posiadasz tyle")
    }else{
        kurs = kursy[indeks]
        posiadane[indeks] = posiadane[indeks] - liczba
        bank = bank + (kurs * liczba)
        document.getElementsByClassName("duza")[indeks].innerText = posiadane[indeks] + koncowki[indeks]
        sch()
    }
}

function elkw(wej){
    return dziel(Math.floor(wej / 100)) + "." + zero(wej % 100) + " zł" 
}

function akt(){
    for(id = 0; id < n;id++){
        if(li % 1 == 0){
        kursy[id] = Math.floor(do_konca[id][li + 99] * 100)
        rys("wyk" + id,do_konca[id],li)
        document.getElementsByClassName("cena")[id].innerText = elkw(kursy[id])+ dzielniki[id]
        roznica = do_konca[id][li + 99] - do_konca[id][li + 99 - 12]
        proc = 100 * roznica / do_konca[id][li + 99 - 12]
        proc = proc * 100
        proc = Math.round(proc) / 100
        if(proc >= 0){
            document.getElementsByName("roznica")[id].innerText = proc + "%";
            document.getElementsByName("roznica")[id].classList = "wzrost"
        }else{
            document.getElementsByName("roznica")[id].innerText = -proc + "%";
            document.getElementsByName("roznica")[id].classList = "spadek"
        }
    }
        document.getElementsByClassName("duza2")[id].innerText = elkw(kursy[id] * posiadane[id])
    }
    stan_konta.innerText = elkw(bank)
    if(li < dl - 101){
        setTimeout(akt,500);
        li = li + 0.125;
    }else{
        for(i = 0; i < n;i++){
            bank = bank + kursy[i] * posiadane[i]
            posiadane[i] = 0
            document.getElementsByClassName("duza2")[i].innerText = elkw(kursy[i] * posiadane[i])
        }
        stan_konta.innerText = elkw(bank)
        zas.style.display = "unset"
        stan_konta.classList = "kon"
        setTimeout(kon2,100);
    }
}

function wys(indeks, kupno){
    if(kupno){
        tyt.innerText = nazwy[indeks] + " - kupno"
        document.getElementsByClassName("dalej")[0].innerText = "kup"
        document.getElementsByClassName("dalej")[0].onclick = kup
    }else{
        tyt.innerText = nazwy[indeks] + " - sprzedaż"
        document.getElementsByClassName("dalej")[0].innerText = "sprzedaj"
        document.getElementsByClassName("dalej")[0].onclick = sprzedaj
    }
    akt_indeks = indeks
    zas.style.display = "unset"
    setTimeout(wys2,10);
}

function kon2(){
    zas.style.opacity = 0.7
}

function wys2(){
    kupno.style.bottom = "0vh"
    zas.style.opacity = 0.7
}

function sch(){
    kupno.style.bottom = "-100vh"
    zas.style.opacity = 0
    setTimeout(sch2,500)
}

function sch2(){
    zas.style.display = "none";
}
