const $ = id => document.getElementById(id)

const base = [
["fa-ethernet","Cable","#ffcc00","Capa Física","Transmite señales","Transporta datos entre dispositivos"],
["fa-plug","Coaxial","#ff7b00","Capa Física","Transmitir datos","Cable protegido contra interferencias"],
["fa-lightbulb","Fibra","#00e5ff","Capa Física","Transmitir info","Usa luz para enviar datos"],
["fa-tower-broadcast","Antena","#00ff9d","Capa Física","Señales inalámbricas","Comunicación sin cables"],
["fa-plug-circle-bolt","RJ45","#ff3b3b","Capa Física","Conectar cables","Conector Ethernet"],
["fa-link","LC","#00b7ff","Capa Física","Fibra óptica","Conector de fibra"],
["fa-network-wired","Switch","#8cff00","Capa Enlace","Conectar dispositivos","Red local"],
["fa-code-branch","Puente","#ff00cc","Capa Enlace","Unir redes","Segmentos de red"],
["fa-microchip","NIC","#00ffd5","Capa Enlace","Conectar PC","Tarjeta de red"],
["fa-wifi","Módem","#ffe600","Capa Red","Internet","Convierte señales"],
["fa-shield-halved","Firewall","#ff4444","Capas Sup","Seguridad","Filtra tráfico"],
["fa-signal","WAP","#00ffcc","Capa Enlace","WiFi","Acceso inalámbrico"]
]

let cartas = [], sel = [], mov = 0, pares = 0, time = 0, timer, bloq = false

nuevo()

function nuevo(){

  clearInterval(timer)

  mov = pares = time = 0
  sel = []
  bloq = false

  $("mov").textContent = 0
  $("par").textContent = 0
  $("time").textContent = 0
  $("mensaje").style.display = "none"

  timer = setInterval(() => $("time").textContent = ++time, 1000)

  cartas = [...base, ...base].sort(() => Math.random() - 0.5)

  $("tablero").innerHTML = cartas.map((c,i)=>`
    <div class="tarjeta" id="t${i}" onclick="girar(${i})">
      <div class="cara superior">
        <i class="fa-solid fa-question"></i>
      </div>
      <div class="cara trasera">
        <i class="fa-solid ${c[0]}" style="color:${c[2]}"></i>
        <div>${c[1]}</div>
      </div>
    </div>
  `).join("")
}

function girar(i){

  if(bloq || sel.length === 2) return

  let t = $("t"+i)

  if(t.classList.contains("volteada")) return

  t.classList.add("volteada")
  sel.push(i)

  if(sel.length === 2){

    $("mov").textContent = ++mov
    bloq = true

    setTimeout(()=>{

      let [a,b] = sel

      if(cartas[a][1] === cartas[b][1]){

        const audio = $("ok")
        audio.currentTime = 0
        audio.play()

        $("par").textContent = ++pares

        mostrarInfo(cartas[a])

        if(pares === 12){
          clearInterval(timer)
          $("mensaje").style.display = "block"
        }

      }else{
        $("t"+a).classList.remove("volteada")
        $("t"+b).classList.remove("volteada")
      }

      sel = []
      bloq = false

    },700)
  }
}

function mostrarInfo(carta){
  $("nombre").textContent = carta[1]
  $("capa").textContent = carta[3]
  $("funcion").textContent = carta[4]
  $("descripcion").textContent = carta[5]
  $("info").style.display = "block"
}

function cerrarInfo(){
  $("info").style.display = "none"
}