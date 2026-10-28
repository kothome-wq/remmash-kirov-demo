const G = [
  {no:"01", name:"Противопожарные металлические двери", short:"Противопожарные металлические двери", models:"ДМП-01, ДМП-02",
   lead:"Однопольные и двупольные, глухие или с пожаростойким остеклением.",
   v:[{label:"ДМП-01 однопольная", img:"dmp-01", w:"600–1150", h:"1400–2500"},
      {label:"ДМП-02 двупольная", img:"dmp-02", w:"1200–2150", h:"1400–2500"}],
   specs:[["Предел огнестойкости","EI 60"],["Остекление","многослойное пожаростойкое стекло, 300×400 или 400×600"],["Ручки","чёрная, хром, антипаника"]]},
  {no:"02", name:"Противопожарные алюминиевые двери", short:"Противопожарные алюминиевые двери", models:"Однопольные и двупольные",
   lead:"Большая площадь остекления, стойкость к коррозии.",
   v:[{label:"Однопольная", img:"alu-fire"}],
   specs:[["Предел огнестойкости","15, 30 или 60 минут"],["Петли","три усиленные на створку"],["Фурнитура","рассчитана до 200 000 циклов открывания"]]},
  {no:"03", name:"Противопожарные алюминиевые окна", short:"Противопожарные окна", models:"Глухие, под размер проёма",
   lead:"Для проёмов в противопожарных стенах и перегородках.",
   v:[{label:"Вариант 1", img:"okno-1"},{label:"Вариант 2", img:"okno-2"}],
   specs:[["Предел огнестойкости","E 15, E 30, E 60"],["Размер","под проём"],["Стеклопакет","однокамерный или двухкамерный огнестойкий"],["Покраска","любой цвет RAL, анодирование, под дерево"]]},
  {no:"04", name:"Противопожарные люки", short:"Противопожарные люки", models:"ЛМП-01, ЛМП-02",
   lead:"Однопольные и двупольные люки.",
   v:[{label:"ЛМП-01 однопольный", img:"lmp-01", w:"600–1150", h:"700–1300"},
      {label:"ЛМП-02 двупольный", img:"lmp-02", w:"1200–2150", h:"700–1300"}],
   specs:[["Предел огнестойкости","EI 60"]]},
  {no:"05", name:"Технические металлические двери", short:"Технические двери", models:"Под задачу помещения",
   lead:"Одно- и двупольные, с фрамугой, решёткой, окошком выдачи, стеклопакетом, подъездные под домофон.",
   v:[{label:"С вентрешёткой", img:"teh-vent"},{label:"С кодовым замком", img:"teh-kod"},{label:"Подъездная", img:"teh-podezd"}],
   specs:[["Толщина металла","1,2–1,8 мм"],["Полотно / коробка","60 мм / 75 мм"],["Уплотнение","два контура"],["Утепление","минераловатная плита высокой плотности"],["Покраска","порошковая, RAL 8017, 9016, 7035, 7040 или другой"]]},
  {no:"06", name:"Входные металлические двери", short:"Входные двери", models:"Лайт, Авангард, Лотос, Союз, Фаворит, Климат",
   lead:"Шесть серий входных дверей.",
   v:[{label:"Лайт", img:"vh-layt"},{label:"Авангард", img:"vh-avangard"},{label:"Лотос", img:"vh-lotos"},
      {label:"Союз", img:"vh-soyuz"},{label:"Фаворит", img:"vh-favorit"},{label:"Климат", img:"vh-klimat"}],
   specs:[["Серии","6"],["Характеристики","по каждой серии – в описании модели {{из документов заказчика}}"]]},
  {no:"07", name:"Алюминиевые двери", short:"Алюминиевые двери", models:"Тёплые и холодные",
   lead:"Для входных групп, тамбуров, витрин, офисов и магазинов.",
   v:[{label:"Однопольная", img:"alu-door"}],
   specs:[["Профиль","тёплый W62 или холодный C43, C48"],["Заполнение","стекло, стеклопакет или панель 4–36 мм"],["Цвет","белый или любой RAL"]]},
  {no:"08", name:"Металлические ворота", short:"Металлические ворота", models:"ВМ-02",
   lead:"Распашные ворота с калиткой.",
   v:[{label:"ВМ-02 с калиткой", img:"vorota"}],
   specs:[["Модель","ВМ-02"]]}
];
const $ = s => document.querySelector(s);
const line = $("#line");
line.innerHTML = G.map((g,i)=>`
  <button class="exhibit" type="button" data-g="${i}">
    <figure><img src="assets/${g.v[0].img}.webp" alt="${g.name}" loading="lazy"></figure>
    <span class="cap"><span class="no">${g.no} / 08</span><h3>${g.short}</h3><span class="models">${g.models}</span><span class="more">Подробнее</span></span>
  </button>`).join("");

/* листание: стрелки, мышь, клавиши */
document.querySelectorAll("[data-line]").forEach(b=>b.addEventListener("click",()=>{
  const step = line.querySelector(".exhibit").offsetWidth + 20;
  line.scrollBy({left: step * +b.dataset.line, behavior:"smooth"});
}));
let down=false, sx=0, sl=0, moved=false;
line.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse")return;down=true;moved=false;sx=e.clientX;sl=line.scrollLeft;});
window.addEventListener("pointermove",e=>{if(!down)return;const d=e.clientX-sx;if(Math.abs(d)>5){moved=true;line.classList.add("drag");}line.scrollLeft=sl-d;});
window.addEventListener("pointerup",()=>{if(!down)return;down=false;line.classList.remove("drag");});
line.addEventListener("click",e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);

/* карточка изделия */
const card=$("#card"), call=$("#call");
let cur=null;
function showVariant(g,k){
  const v=g.v[k];
  $("#card-img").src=`assets/${v.img}.webp`; $("#card-img").alt=`${g.name}: ${v.label}`;
  $("#dim-w").textContent=v.w?`ширина ${v.w} мм`:""; $("#dim-w").hidden=!v.w;
  $("#dim-h").textContent=v.h?`высота ${v.h} мм`:""; $("#dim-h").hidden=!v.h;
  $("#frame").classList.toggle("nodim",!v.w);
  $("#card-thumbs").querySelectorAll("button").forEach((b,j)=>b.setAttribute("aria-pressed",j===k));
  cur={g,v};
}
line.addEventListener("click",e=>{
  const b=e.target.closest(".exhibit"); if(!b)return;
  const g=G[+b.dataset.g];
  $("#card-no").textContent=`${g.no} / 08`; $("#card-title").textContent=g.name; $("#card-lead").textContent=g.lead;
  $("#card-specs").innerHTML=g.specs.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join("");
  $("#card-thumbs").innerHTML=g.v.length>1?g.v.map((v,k)=>`<button type="button" data-k="${k}">${v.label}</button>`).join(""):"";
  showVariant(g,0); card.showModal();
});
$("#card-thumbs").addEventListener("click",e=>{const b=e.target.closest("button");if(b)showVariant(cur.g,+b.dataset.k);});

/* обратный звонок */
function openCall(model){
  $("#call-form").hidden=false; $("#call-ok").hidden=true; $("#call-err").textContent="";
  $("#call-model-field").value=model||""; $("#call-model").textContent=model||""; $("#call-chip").hidden=!model;
  if(card.open)card.close(); call.showModal(); $("#phone").focus();
}
document.querySelectorAll("[data-call]").forEach(b=>b.addEventListener("click",()=>openCall("")));
$("#card-call").addEventListener("click",()=>openCall(cur.g.v.length>1?`${cur.g.name}, ${cur.v.label}`:cur.g.name));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>b.closest("dialog").close()));
document.querySelectorAll("dialog").forEach(d=>d.addEventListener("click",e=>{if(e.target===d)d.close();}));

const phone=$("#phone");
phone.addEventListener("input",()=>{
  let d=phone.value.replace(/\D/g,""); if(d.startsWith("8"))d="7"+d.slice(1); if(!d.startsWith("7"))d="7"+d; d=d.slice(0,11);
  const p=[d.slice(1,4),d.slice(4,7),d.slice(7,9),d.slice(9,11)];
  phone.value="+7"+(p[0]?" "+p[0]:"")+(p[1]?" "+p[1]:"")+(p[2]?"-"+p[2]:"")+(p[3]?"-"+p[3]:"");
});
$("#call-form").addEventListener("submit",e=>{
  e.preventDefault();
  const f=e.target;
  if(f.company.value)return; // антиспам: поле-ловушка
  if(phone.value.replace(/\D/g,"").length<11){$("#call-err").textContent="Введите номер полностью: +7 и 10 цифр.";phone.focus();return;}
  if(!$("#agree").checked){$("#call-err").textContent="Отметьте согласие на обработку данных – без него заявку не отправить.";return;}
  const m=$("#call-model-field").value;
  $("#ok-text").textContent=`Перезвоним на ${phone.value}${m?` по изделию «${m}»`:""}.`;
  f.hidden=true; $("#call-ok").hidden=false;
});
