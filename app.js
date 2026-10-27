const products = {
 "daily-red":{name:"The Daily Tee",price:899,desc:"An everyday essential with a considered fit and a soft, substantial feel.",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",colours:["Red","Off-white","Black"]},
 "boxy-brown":{name:"The Boxy Tee",price:1099,desc:"A little more room, a clean shoulder line, and a shape that holds up all day.",image:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",colours:["Brown","Red","Black"]},
 "off-duty":{name:"Off Duty Tee",price:999,desc:"Quiet, versatile, and ready to become the first thing you reach for.",image:"https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=85",colours:["Off-white","Black"]},
 "after-hours":{name:"After Hours Tee",price:1199,desc:"A heavier everyday tee with an easy silhouette and understated attitude.",image:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85",colours:["Black","Brown"]}
};
const colourHex={"Red":"#b3262e","Off-white":"#e9e4d9","Black":"#252525","Brown":"#75503e"};
let bag=[],activeProduct="daily-red",selectedSize="",selectedColour="Red";
const $=s=>document.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)],money=n=>"₹"+Number(n).toLocaleString("en-IN");
function openCart(){$("#cartDrawer").classList.add("open");$("#overlay").classList.add("open");document.body.style.overflow="hidden"}
function closeCart(){$("#cartDrawer").classList.remove("open");if(!$("#quickModal").classList.contains("open"))$("#overlay").classList.remove("open");document.body.style.overflow=""}
function renderBag(){let count=bag.reduce((s,i)=>s+i.qty,0),total=bag.reduce((s,i)=>s+i.qty*i.price,0);$("#bagCount").textContent=count;$("#drawerCount").textContent="("+count+")";$("#subtotal").textContent=money(total);let wrap=$("#cartItems");if(!bag.length){wrap.innerHTML='<div class="empty-bag"><span>R/</span><p>Your bag is taking a breather.</p><button id="continueShopping">KEEP EXPLORING ↗</button></div>';$("#continueShopping").onclick=closeCart;return}wrap.innerHTML=bag.map((item,i)=>'<div class="cart-row"><div class="cart-thumb" style="background:'+colourHex[item.colour]+'">R/</div><div><h3>'+item.name+'</h3><p>'+item.colour+' · Size '+item.size+'<br>'+money(item.price)+'</p><div class="quantity"><button data-qty="'+i+'" data-delta="-1">−</button><span>'+item.qty+'</span><button data-qty="'+i+'" data-delta="1">+</button></div></div><button class="remove" data-remove="'+i+'">Remove</button></div>').join("");$$("[data-qty]",wrap).forEach(b=>b.onclick=()=>{let i=+b.dataset.qty;bag[i].qty+=+b.dataset.delta;if(bag[i].qty<1)bag.splice(i,1);renderBag()});$$("[data-remove]",wrap).forEach(b=>b.onclick=()=>{bag.splice(+b.dataset.remove,1);renderBag()})}
function openQuick(id){activeProduct=id;let p=products[id];selectedSize="";selectedColour=p.colours[0];$("#modalName").textContent=p.name;$("#modalPrice").textContent=money(p.price);$("#modalDesc").textContent=p.desc;$("#modalPhoto").innerHTML='<img src="'+p.image+'" alt="'+p.name+'">';$("#modalColours").innerHTML=p.colours.map((c,i)=>'<button class="colour-choice '+(!i?'active':'')+'" data-colour="'+c+'" aria-label="'+c+'" title="'+c+'" style="--swatch:'+colourHex[c]+'"></button>').join("");$("#chosenColour").textContent=selectedColour;$$(".sizes button").forEach(b=>b.classList.remove("selected"));$("#addToBag").innerHTML='ADD TO BAG — '+money(p.price)+' <span>↗</span>';$("#quickModal").classList.add("open");$("#overlay").classList.add("open");document.body.style.overflow="hidden";$$("[data-colour]",$("#modalColours")).forEach(b=>b.onclick=()=>{$$("[data-colour]",$("#modalColours")).forEach(x=>x.classList.remove("active"));b.classList.add("active");selectedColour=b.dataset.colour;$("#chosenColour").textContent=selectedColour})}
function closeQuick(){$("#quickModal").classList.remove("open");if(!$("#cartDrawer").classList.contains("open"))$("#overlay").classList.remove("open");document.body.style.overflow=""}
function toast(msg){let t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2100)}
$$("[data-quick]").forEach(b=>b.addEventListener("click",()=>openQuick(b.dataset.quick)));
$$(".sizes button").forEach(b=>b.onclick=()=>{selectedSize=b.textContent;$$(".sizes button").forEach(x=>x.classList.toggle("selected",x===b))});
$("#addToBag").onclick=()=>{if(!selectedSize){toast("Choose a size first");return}let p=products[activeProduct],found=bag.find(i=>i.id===activeProduct&&i.size===selectedSize&&i.colour===selectedColour);if(found)found.qty++;else bag.push({id:activeProduct,name:p.name,price:p.price,size:selectedSize,colour:selectedColour,qty:1});renderBag();closeQuick();toast("Added to your bag ✓")};
$("#cartToggle").onclick=openCart;$("#closeCart").onclick=closeCart;$("#closeModal").onclick=closeQuick;$("#overlay").onclick=()=>{closeCart();closeQuick()};$("#checkoutButton").onclick=()=>toast("Checkout needs a payment integration.");
$("#filters").onclick=e=>{let b=e.target.closest("[data-filter]");if(!b)return;$$(".filter").forEach(x=>x.classList.toggle("active",x===b));$$(".product-card").forEach(c=>c.hidden=b.dataset.filter!=="all"&&c.dataset.category!==b.dataset.filter)};
$("#sortSelect").onchange=()=>{let g=$("#productGrid"),cards=$$(".product-card",g);cards.sort((a,b)=>$("#sortSelect").value==="low"?+a.dataset.price-+b.dataset.price:$("#sortSelect").value==="high"?+b.dataset.price-+a.dataset.price:0).forEach(c=>g.appendChild(c))};
$("#searchToggle").onclick=()=>{$("#searchPanel").classList.toggle("open");if($("#searchPanel").classList.contains("open"))$("#searchInput").focus()};$("#closeSearch").onclick=()=>$("#searchPanel").classList.remove("open");$("#searchInput").oninput=()=>{let q=$("#searchInput").value.toLowerCase();$$(".product-card").forEach(c=>c.hidden=!c.innerText.toLowerCase().includes(q)&&!c.dataset.id.includes(q))};
$("#menuToggle").onclick=()=>$("#mobileMenu").classList.add("open");$("#closeMenu").onclick=()=>$("#mobileMenu").classList.remove("open");$$(".mobile-menu a").forEach(a=>a.onclick=()=>$("#mobileMenu").classList.remove("open"));
$("#newsletterForm").onsubmit=e=>{e.preventDefault();$("#newsletterMessage").textContent="Thanks for your interest. Connect an email service to activate signups.";$("#emailInput").value=""};
renderBag();

// Auto-animated product rack: floating garments slide across a rail like the supplied reference.
(() => {
  const rackData = [
    {title:"THE DAILY TEE",shade:"RED",color:"#b3262e",kind:"tee",product:"daily-red",variant:"Red",dark:false,detail:"Relaxed fit · everyday weight · clean print"},
    {title:"THE BOXy TEE",shade:"CHOCOLATE",color:"#76513f",kind:"tee",product:"boxy-brown",variant:"Brown",dark:false,detail:"Oversized fit · heavyweight feel"},
    {title:"OFF DUTY",shade:"OFF-WHITE",color:"#e7e2d7",kind:"long",product:"off-duty",variant:"Off-white",dark:true,detail:"Relaxed fit · soft neutral · easy everyday"},
    {title:"AFTER HOURS",shade:"BLACK",color:"#222222",kind:"tank",product:"after-hours",variant:"Black",dark:false,detail:"Sleeveless cut · bold minimal essential"},
    {title:"THE BOXy TEE",shade:"RED",color:"#a8242c",kind:"tee",product:"boxy-brown",variant:"Red",dark:false,detail:"Roomier silhouette · signature red"},
    {title:"AFTER HOURS",shade:"BROWN",color:"#75503e",kind:"tank",product:"after-hours",variant:"Brown",dark:false,detail:"Deep brown · understated statement"}
  ];
  const track = document.getElementById("rackTrack");
  const stage = document.getElementById("garmentShowroom");
  if (!track || !stage) return;
  let active = 0, timer = null, paused = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) paused = true;

  function garmentSvg(item, n) {
    const ink = item.dark ? "#252420" : "#f9f5ed";
    const gradA = item.dark ? "#ffffff" : "#ffffff";
    const gradB = item.color;
    const paths = {
      tee: "M61 43 L42 29 L25 40 L8 66 L27 81 L41 68 L40 207 L140 207 L139 68 L153 81 L172 66 L155 40 L138 29 L119 43 Q110 57 90 57 Q70 57 61 43 Z",
      long: "M59 42 L40 29 L24 42 L2 98 L22 107 L43 67 L42 207 L138 207 L137 67 L158 107 L178 98 L156 42 L140 29 L121 42 Q111 55 90 55 Q69 55 59 42 Z",
      tank: "M62 42 L48 23 L36 25 L29 66 L44 73 L44 207 L136 207 L136 73 L151 66 L144 25 L132 23 L118 42 Q110 57 90 57 Q70 57 62 42 Z"
    };
    const shape = paths[item.kind] || paths.tee;
    const neck = item.kind === "tank"
      ? '<path d="M63 42 Q70 63 90 63 Q110 63 117 42" fill="none" stroke="' + (item.dark ? "#b8b4aa" : "#ffffff") + '" stroke-opacity=".55" stroke-width="2"/>'
      : '<path d="M65 43 Q70 59 90 59 Q110 59 115 43" fill="none" stroke="' + (item.dark ? "#b8b4aa" : "#ffffff") + '" stroke-opacity=".56" stroke-width="2"/>';
    const detailLines = item.kind === "long"
      ? '<path d="M20 96 L38 102 M160 102 L178 96" stroke="' + ink + '" stroke-opacity=".12" stroke-width="1.5"/>'
      : '';
    return '<svg class="garment-svg" viewBox="0 0 180 250" role="img" aria-label="' + item.shade + ' RAYR ' + item.kind + '">' +
      '<defs><linearGradient id="cloth-' + n + '" x1="0" y1="0" x2="1" y2=".15"><stop offset="0" stop-color="' + gradB + '"/><stop offset=".28" stop-color="' + gradB + '"/><stop offset=".54" stop-color="' + gradA + '" stop-opacity=".13"/><stop offset=".74" stop-color="' + gradB + '"/><stop offset="1" stop-color="' + gradB + '"/></linearGradient><linearGradient id="shade-' + n + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".02"/><stop offset="1" stop-color="#000" stop-opacity=".13"/></linearGradient></defs>' +
      '<g class="hanger-stem"><path d="M90 38 L90 25 Q90 16 98 14 Q104 13 104 19 Q104 23 99 24"/><path d="M90 37 L53 50 L42 56 M90 37 L127 50 L138 56"/></g>' +
      '<path d="' + shape + '" fill="url(#cloth-' + n + ')" stroke="#000000" stroke-opacity=".1" stroke-width="1.2"/>' +
      '<path d="' + shape + '" fill="url(#shade-' + n + ')"/>' +
      '<path d="M46 68 L46 197 M134 68 L134 197" stroke="' + ink + '" stroke-opacity=".07" stroke-width="1.2"/>' +
      neck + detailLines +
      '<text x="90" y="119" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" font-size="17" letter-spacing="-1.1" fill="' + ink + '">RAYర్</text>' +
      '<path d="M64 126 L116 126" stroke="' + ink + '" stroke-opacity=".48" stroke-width=".7"/>' +
      '<text x="90" y="137" text-anchor="middle" font-family="Arial,sans-serif" font-size="4.7" letter-spacing="1.7" fill="' + ink + '" opacity=".8">EVERYDAY / 001</text>' +
      '<path d="M53 195 Q90 201 127 195" fill="none" stroke="' + ink + '" stroke-opacity=".2" stroke-width="1"/>' +
      '</svg>';
  }

  rackData.forEach((item, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "rack-item";
    button.setAttribute("aria-label", "View " + item.title + " in " + item.shade);
    button.innerHTML = garmentSvg(item, i) + '<span class="item-index">' + String(i + 1).padStart(2,"0") + ' / DROP 001</span>';
    button.addEventListener("click", () => {
      if (active !== i) setActive(i);
      else openSelectedProduct();
    });
    track.appendChild(button);
  });

  function positionRack() {
    const items = [...track.querySelectorAll(".rack-item")];
    const step = window.innerWidth < 420 ? 126 : window.innerWidth < 600 ? 142 : window.innerWidth < 900 ? 164 : 190;
    items.forEach((el, i) => {
      let relative = i - active;
      const total = rackData.length;
      if (relative > total / 2) relative -= total;
      if (relative < -total / 2) relative += total;
      const abs = Math.abs(relative);
      const angle = relative === 0 ? 0 : relative < 0 ? 15 : -15;
      const scale = relative === 0 ? 1.04 : abs === 1 ? .82 : .67;
      el.style.left = 'calc(50% + ' + (relative * step) + 'px)';
      el.style.transform = 'translateX(-50%) rotateY(' + angle + 'deg) scale(' + scale + ')';
      el.style.opacity = abs > 2 ? "0" : abs === 2 ? ".25" : abs === 1 ? ".68" : "1";
      el.style.filter = abs === 0 ? "saturate(1)" : "saturate(.58)";
      el.style.pointerEvents = abs > 2 ? "none" : "auto";
      el.style.zIndex = String(10 - abs);
      el.classList.toggle("active", relative === 0);
      el.setAttribute("aria-current", relative === 0 ? "true" : "false");
    });
  }

  function updateCaption() {
    const item = rackData[active];
    document.getElementById("rackCount").textContent = String(active + 1).padStart(2,"0") + " / " + String(rackData.length).padStart(2,"0") + " — DROP 001";
    document.getElementById("rackName").innerHTML = item.title + ' <span>— ' + item.shade + '</span>';
    document.getElementById("rackDesc").textContent = item.detail;
  }
  function setActive(index) {
    active = (index + rackData.length) % rackData.length;
    positionRack();
    updateCaption();
  }
  function openSelectedProduct() {
    const item = rackData[active];
    openQuick(item.product);
    const p = products[item.product];
    if (p.colours.includes(item.variant)) {
      selectedColour = item.variant;
      document.getElementById("chosenColour").textContent = item.variant;
      const buttons = [...document.querySelectorAll("#modalColours [data-colour]")];
      buttons.forEach(b => b.classList.toggle("active", b.dataset.colour === item.variant));
    }
  }
  function startTimer() {
    clearInterval(timer);
    if (!paused) timer = setInterval(() => setActive(active + 1), 2800);
  }

  document.getElementById("rackPrev").addEventListener("click", () => {setActive(active - 1); startTimer();});
  document.getElementById("rackNext").addEventListener("click", () => {setActive(active + 1); startTimer();});
  document.getElementById("rackCta").addEventListener("click", openSelectedProduct);
  const pause = document.getElementById("rackPause");
  function updatePauseLabel() { pause.innerHTML = paused ? '▶ <span>PLAY MOTION</span>' : 'Ⅱ <span>PAUSE MOTION</span>'; pause.setAttribute("aria-label", paused ? "Play product animation" : "Pause product animation"); }
  pause.addEventListener("click", () => {paused = !paused; updatePauseLabel(); startTimer();});
  stage.addEventListener("mouseenter", () => { if (!paused) clearInterval(timer); });
  stage.addEventListener("mouseleave", startTimer);
  window.addEventListener("resize", positionRack, {passive:true});
  positionRack(); updateCaption(); updatePauseLabel(); startTimer();
})();
