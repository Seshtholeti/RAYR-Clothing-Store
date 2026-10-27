const products = {
 "daily-red":{name:"The Daily Tee",price:899,desc:"A clean everyday tee in the signature RAYർ red, designed for repeat wear.",spritePosition:40,colours:["Red","Off-white","Black"]},
 "boxy-brown":{name:"The Boxy Tee",price:1099,desc:"A roomier silhouette with a premium-feel shape and a calm chocolate-brown tone.",spritePosition:60,colours:["Brown","Red","Black"]},
 "off-duty":{name:"Off Duty Tee",price:999,desc:"An easy neutral essential for everyday rotation.",spritePosition:0,colours:["Off-white","Black","Beige"]},
 "after-hours":{name:"After Hours Tee",price:1199,desc:"A deeper, heavier-looking essential with a clean silhouette.",spritePosition:20,colours:["Black","Brown","Charcoal"]}
};
const colourHex={"Red":"#a5242d","Off-white":"#e9e4d9","Black":"#252525","Brown":"#75503e","Charcoal":"#4c4b49","Beige":"#d9cbb2"};
let bag=[],activeProduct="daily-red",selectedSize="",selectedColour="Red";
const $=s=>document.querySelector(s), $=(s,root=document)=>[...root.querySelectorAll(s)],money=n=>"₹"+Number(n).toLocaleString("en-IN");
const spritePositions={"Off-white":0,"Ivory":0,"Black":20,"Red":40,"Brown":60,"Charcoal":80,"Beige":100};
function paintModalPhoto(product, colour){
  const modalPhoto=$("#modalPhoto");
  const modalPositions={"Off-white":0,"Ivory":0,"Black":21,"Red":42,"Brown":63,"Charcoal":84,"Beige":100};
  const pos=modalPositions[colour] ?? product.spritePosition ?? 42;
  modalPhoto.style.setProperty("--sprite-position",pos+"%");
  modalPhoto.style.setProperty("--print-color",(["Off-white","Ivory","Beige"].includes(colour)?"#a5242d":"#f6efe4"));
  modalPhoto.innerHTML='<span class="modal-print">RAYర్</span>';
}
function openCart(){$("#cartDrawer").classList.add("open");$("#overlay").classList.add("open");document.body.style.overflow="hidden"}
function closeCart(){$("#cartDrawer").classList.remove("open");if(!$("#quickModal").classList.contains("open"))$("#overlay").classList.remove("open");document.body.style.overflow=""}
function renderBag(){let count=bag.reduce((s,i)=>s+i.qty,0),total=bag.reduce((s,i)=>s+i.qty*i.price,0);$("#bagCount").textContent=count;$("#drawerCount").textContent="("+count+")";$("#subtotal").textContent=money(total);let wrap=$("#cartItems");if(!bag.length){wrap.innerHTML='<div class="empty-bag"><span>R/</span><p>Your bag is taking a breather.</p><button id="continueShopping">KEEP EXPLORING ↗</button></div>';$("#continueShopping").onclick=closeCart;return}wrap.innerHTML=bag.map((item,i)=>'<div class="cart-row"><div class="cart-thumb" style="background:'+colourHex[item.colour]+'">R/</div><div><h3>'+item.name+'</h3><p>'+item.colour+' · Size '+item.size+'<br>'+money(item.price)+'</p><div class="quantity"><button data-qty="'+i+'" data-delta="-1">−</button><span>'+item.qty+'</span><button data-qty="'+i+'" data-delta="1">+</button></div></div><button class="remove" data-remove="'+i+'">Remove</button></div>').join("");$$("[data-qty]",wrap).forEach(b=>b.onclick=()=>{let i=+b.dataset.qty;bag[i].qty+=+b.dataset.delta;if(bag[i].qty<1)bag.splice(i,1);renderBag()});$$("[data-remove]",wrap).forEach(b=>b.onclick=()=>{bag.splice(+b.dataset.remove,1);renderBag()})}
function openQuick(id){activeProduct=id;let p=products[id];selectedSize="";selectedColour=p.colours[0];$("#modalName").textContent=p.name;$("#modalPrice").textContent=money(p.price);$("#modalDesc").textContent=p.desc;paintModalPhoto(p,selectedColour);$("#modalColours").innerHTML=p.colours.map((c,i)=>'<button class="colour-choice '+(!i?'active':'')+'" data-colour="'+c+'" aria-label="'+c+'" title="'+c+'" style="--swatch:'+colourHex[c]+'"></button>').join("");$("#chosenColour").textContent=selectedColour;$$(".sizes button").forEach(b=>b.classList.remove("selected"));$("#addToBag").innerHTML='ADD TO BAG — '+money(p.price)+' <span>↗</span>';$("#quickModal").classList.add("open");$("#overlay").classList.add("open");document.body.style.overflow="hidden";$$("[data-colour]",$("#modalColours")).forEach(b=>b.onclick=()=>{$$("[data-colour]",$("#modalColours")).forEach(x=>x.classList.remove("active"));b.classList.add("active");selectedColour=b.dataset.colour;$("#chosenColour").textContent=selectedColour;paintModalPhoto(products[activeProduct],selectedColour)})}
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
    {title:"THE DAILY TEE",shade:"IVORY",product:"off-duty",variant:"Off-white",spritePosition:0,printColor:"#a5242d",detail:"Relaxed fit · soft neutral · everyday essential"},
    {title:"AFTER HOURS",shade:"BLACK",product:"after-hours",variant:"Black",spritePosition:20,printColor:"#f6efe4",detail:"Clean silhouette · understated black"},
    {title:"THE DAILY TEE",shade:"RED",product:"daily-red",variant:"Red",spritePosition:40,printColor:"#fff4ea",detail:"Signature red · easy everyday fit"},
    {title:"THE BOXY TEE",shade:"CHOCOLATE",product:"boxy-brown",variant:"Brown",spritePosition:60,printColor:"#f6efe4",detail:"Roomier shape · rich chocolate brown"},
    {title:"AFTER HOURS",shade:"CHARCOAL",product:"after-hours",variant:"Charcoal",spritePosition:80,printColor:"#f6efe4",detail:"Smoky charcoal · minimal rotation"},
    {title:"OFF DUTY",shade:"SAND",product:"off-duty",variant:"Beige",spritePosition:100,printColor:"#a5242d",detail:"Warm sand · quiet neutral"}
  ];
  const track = document.getElementById("rackTrack");
  const stage = document.getElementById("garmentShowroom");
  if (!track || !stage) return;
  let active = 0, timer = null, paused = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) paused = true;

  rackData.forEach((item, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "rack-item";
    button.setAttribute("aria-label", "View " + item.title + " in " + item.shade);
    button.style.setProperty("--sprite-position",item.spritePosition+"%"); button.style.setProperty("--print-color",item.printColor); button.innerHTML = '<span class="garment-photo" aria-hidden="true"></span><span class="tee-print">RAYർ</span><span class="item-index">' + String(i + 1).padStart(2,"0") + ' / DROP 001</span>';
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
      paintModalPhoto(p,selectedColour);
      const buttons = [...document.querySelectorAll("#modalColours [data-colour]")];
      buttons.forEach(b => b.classList.toggle("active", b.dataset.colour === item.variant));
    }
  }
  function startTimer() {
    clearInterval(timer);
    if (!paused) timer = setInterval(() => setActive(active + 1), 3600);
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
