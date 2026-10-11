console.log("App iniciada correctamente");

const listaForm = document.getElementById("listaForm");
const nombreLista = document.getElementById("nombreLista");
const descripcionLista = document.getElementById("descripcionLista");
const listasContainer = document.getElementById("listasContainer");

function mostrarListas() {
  listasContainer.innerHTML = "<h2>Mis listas</h2>";

  const listas = JSON.parse(localStorage.getItem("listas")) || [];

  listas.forEach((lista, index) => {
    const nuevaLista = document.createElement("div");
    nuevaLista.classList.add("lista");

    nuevaLista.innerHTML = `
      <h3>${lista.nombre}</h3>
      <p>${lista.descripcion}</p>
      <ul id="items-${index}">
        ${lista.items.map((item, i) => `
          <li>
            <input type="checkbox" ${item.completado ? "checked" : ""} 
              onchange="toggleItem(${index}, ${i})">
            ${item.texto}
          </li>
        `).join("")}
      </ul>
      <input type="text" id="nuevoItem-${index}" placeholder="Nuevo ítem">
      <button onclick="agregarItem(${index})">➕ Agregar ítem</button>
      <button onclick="eliminarLista(${index})">🗑 Eliminar lista</button>
    `;

    listasContainer.appendChild(nuevaLista);
  });
}

listaForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const nombre = nombreLista.value;
  const descripcion = descripcionLista.value;

  const listas = JSON.parse(localStorage.getItem("listas")) || [];

  listas.push({ nombre, descripcion, items: [] });

  localStorage.setItem("listas", JSON.stringify(listas));
  mostrarListas();
  listaForm.reset();
});

function agregarItem(index) {
  const listas = JSON.parse(localStorage.getItem("listas")) || [];
  const nuevoItemInput = document.getElementById(`nuevoItem-${index}`);
  const texto = nuevoItemInput.value;

  if (texto.trim() !== "") {
    listas[index].items.push({ texto, completado: false });
    localStorage.setItem("listas", JSON.stringify(listas));
    mostrarListas();
  }
}

function toggleItem(listaIndex, itemIndex) {
  const listas = JSON.parse(localStorage.getItem("listas")) || [];
  listas[listaIndex].items[itemIndex].completado = !listas[listaIndex].items[itemIndex].completado;
  localStorage.setItem("listas", JSON.stringify(listas));
  mostrarListas();
}

function eliminarLista(index) {
  const listas = JSON.parse(localStorage.getItem("listas")) || [];
  listas.splice(index, 1);
  localStorage.setItem("listas", JSON.stringify(listas));
  mostrarListas();
}

mostrarListas();
