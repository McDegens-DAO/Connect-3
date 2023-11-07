let provider; let connect_3 = false;
(function(){let connect_3_form = '<div id="connect_3_cover"><div id="connect_3_message"></div></div><div id="connect_3_chooser"><button class="connect_3_choice" id="connect_3_phantom"><img src="connect_3_phantom.png" /><span>Phantom</span></button><button class="connect_3_choice" id="connect_3_solflare"><img src="connect_3_solflare.png" /><span>Solflare</span></button><button class="connect_3_choice" id="connect_3_backpack"><img src="connect_3_backpack.png" /><span>Backpack</span></button><button class="connect_3_choice" id="connect_3_cancel"><img src="connect_3_cancel.svg" /><span>Cancel</span></button></div>';
document.getElementById("connect_3").innerHTML = connect_3_form;})();
function connect_3_cover_fadeIn(el, time) {
  el.style.opacity = 0;
  var last = +new Date();
  var tik = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();
    if (+el.style.opacity < 0.5) {
      (window.requestAnimationFrame && requestAnimationFrame(tik)) || setTimeout(tik, 16);
    }
  };
  tik();
}
function connect_3_fadeIn(el, time) {
  el.style.opacity = 0;
  var last = +new Date();
  var tik = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tik)) || setTimeout(tik, 16);
    }
  };
  tik();
}
document.querySelectorAll('.connect_3_button').forEach(function(el){
  el.addEventListener('click', function() {
    let connect_3_cover = document.getElementById("connect_3_cover");
    let connect_3_chooser = document.getElementById("connect_3_chooser");  
    connect_3_cover.style.display = "block";
    connect_3_chooser.style.display = "block";
    connect_3_cover_fadeIn(connect_3_cover, 400);
    connect_3_fadeIn(connect_3_chooser, 400);
  });
});
const wallet_provider = () => {
  const isBackpackInstalled = window.backpack && window.backpack.isBackpack;
  const isSolflareInstalled = window.solflare && window.solflare.isSolflare;
  const isPhantomInstalled = window.solana && window.solana.isPhantom;
  if (isBackpackInstalled && connect_3 == "backpack") {
    return window.backpack;
  }
  else if (isSolflareInstalled && connect_3 == "solflare") {
    return window.solflare;
  } 
  else if (isPhantomInstalled && connect_3 == "phantom") {
    return window.solana;
  }
}
document.querySelectorAll('.connect_3_choice').forEach(function(el){
  el.addEventListener('click', function() {
  if(this.id == "connect_3_cancel"){
    let connect_3_cover = document.getElementById("connect_3_cover");
    let connect_3_chooser = document.getElementById("connect_3_chooser");  
    connect_3_cover.style.display = "none";
    connect_3_chooser.style.display = "none";
    connect_3_cover.style.opacity = 0;
    connect_3_chooser.style.opacity = 0;
  }
  else{
    connect_3_connect(this.id.replace("connect_3_",""));
  } 
  });
});
async function connect_3_connect(provider_name){
    connect_3 = provider_name;
    provider = await wallet_provider();
    let connect_3_cover = document.getElementById("connect_3_cover");
    let connect_3_chooser = document.getElementById("connect_3_chooser");
    if (typeof provider == "undefined") {
      var app_link;
      if(connect_3=="solflare"){
        app_link = "https://solflare.com/ul/v1/browse/"+encodeURIComponent("https://"+window.location.hostname+window.location.pathname+"#connect_3-solflare")+"?ref="+encodeURIComponent("https://"+window.location.hostname);
      }
      else if(connect_3=="phantom"){
        app_link = "https://phantom.app/ul/browse/"+encodeURIComponent("https://"+window.location.hostname+window.location.pathname+"#connect_3-phantom")+"?ref="+encodeURIComponent("https://"+window.location.hostname);
      }
      if(connect_3=="solflare" || connect_3=="phantom"){
        let a = document.createElement('a');
        a.id = "connect_3_deep";
        a.href = app_link;
        document.body.appendChild(a);
        a.click(); a.remove();
        connect_3_cover.style.display = "none";
        connect_3_cover.style.opacity = 0;
        connect_3_chooser.style.display = "none";
        connect_3_chooser.style.opacity = 0;
        document.getElementById("connect_3_message").innerHTML = "";
      }
    }
    else {
      if (provider.isConnected === false) {
        connect_3_chooser.style.display = "none";
        connect_3_chooser.style.opacity = 0;
        document.getElementById("connect_3_message").innerHTML = "Requesting Connection...";
        await provider.connect()
        .catch(function(err) {
          connect_3_cover.style.display = "none";
          connect_3_cover.style.opacity = 0;
          document.getElementById("connect_3_message").innerHTML = "";
        });
      }
      if (provider.isConnected === true) {
        document.querySelectorAll(".connect_3_button").forEach(function(el){
          el.style.display = "none";
        });
        document.querySelectorAll(".disconnect_3_button").forEach(function(el){
          el.style.display = "block";
        });
        connect_3_cover.style.display = "none";
        connect_3_cover.style.opacity = 0;
        connect_3_chooser.style.display = "none";
        connect_3_chooser.style.opacity = 0;
        document.getElementById("connect_3_message").innerHTML = "";
      }
    }
}
document.querySelectorAll('.disconnect_3_button').forEach(function(el){
  el.addEventListener('click', function() {
    provider.disconnect();
    document.querySelectorAll(".disconnect_3_button").forEach(function(el){
      el.style.display = "none";
    });
    document.querySelectorAll(".connect_3_button").forEach(function(el){
      el.style.display = "block";
    });
  });
});
const connect_3_init = async () => {
  let connect_3_hash = window.location.hash;
  if(connect_3_hash.includes("#connect_3-")){
    history.replaceState(null, null, ' ');
    history.pushState("", "", "");
//     document.querySelector(".connect_3_button").click();
    setTimeout(() => {
      let connect_3_provider = connect_3_hash.replace("#connect_3-","");
      document.getElementById("connect_3_"+connect_3_provider).click();
    },400);
  }
}
connect_3_init();