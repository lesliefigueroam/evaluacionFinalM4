// =========================================================
// CLASE que administra la data del web service
// =========================================================
class AdministradorUsuarios {
  // El constructor pide la data mediante XMLHttpRequest
  // y la guarda dentro de la clase (en this.usuarios).
  constructor(url) {
    this.url = url;
    this.usuarios = []; // aquí se almacena la data para uso posterior

    const xhr = new XMLHttpRequest();
    // El tercer parámetro "false" hace la petición SÍNCRONA:
    // así la data queda lista apenas se crea el objeto.
    xhr.open("GET", this.url, false);
    xhr.send();

    if (xhr.status === 200) {
      this.usuarios = JSON.parse(xhr.responseText);
      console.log("Data cargada en la clase:", this.usuarios);
    } else {
      console.error("Error al cargar la data. Estado:", xhr.status);
    }
  }

  // Método auxiliar: busca un usuario por nombre (pedido por prompt)
  buscarPorNombre() {
    const nombre = prompt("Ingresa el nombre del usuario:");
    if (nombre === null) return null;

    // Comparamos en minúsculas para no depender de mayúsculas
    const usuario = this.usuarios.find(
      u => u.name.toLowerCase() === nombre.trim().toLowerCase()
    );

    if (!usuario) {
      console.warn("No se encontró un usuario con ese nombre.");
    }
    return usuario;
  }

  // a) Listar los nombres de todos los usuarios
  listarNombres() {
    const nombres = this.usuarios.map(u => u.name);
    console.log("Nombres de usuarios:", nombres);
    return nombres;
  }

  // b) Info básica (username y correo) por nombre
  infoBasica() {
    const u = this.buscarPorNombre();
    if (!u) return null;

    console.log(`Usuario: ${u.name}`);
    console.log(`Username: ${u.username}`);
    console.log(`Email: ${u.email}`);
    return u;
  }

  // c) Dirección completa (todos los campos) por nombre
  listarDireccion() {
    const u = this.buscarPorNombre();
    if (!u) return null;

    const d = u.address;
    console.log(`Dirección de ${u.name}:`);
    console.log(`  Calle (street): ${d.street}`);
    console.log(`  Depto (suite): ${d.suite}`);
    console.log(`  Ciudad (city): ${d.city}`);
    console.log(`  Código postal (zipcode): ${d.zipcode}`);
    console.log(`  Geo - lat: ${d.geo.lat}, lng: ${d.geo.lng}`);
    return d;
  }

  // d) Info avanzada (teléfono, sitio web y compañía completa) por nombre
  infoAvanzada() {
    const u = this.buscarPorNombre();
    if (!u) return null;

    console.log(`Información avanzada de ${u.name}:`);
    console.log(`  Teléfono: ${u.phone}`);
    console.log(`  Sitio web: ${u.website}`);
    console.log(`  Compañía - nombre: ${u.company.name}`);
    console.log(`  Compañía - catchPhrase: ${u.company.catchPhrase}`);
    console.log(`  Compañía - bs: ${u.company.bs}`);
    return u;
  }

  // e) Listar todas las compañías junto a su catchphrase
  listarCompanias() {
    const lista = this.usuarios.map(u => ({
      compania: u.company.name,
      frase: u.company.catchPhrase
    }));
    console.log("Compañías y sus frases:");
    lista.forEach(item => console.log(`  ${item.compania} → "${item.frase}"`));
    return lista;
  }

  // f) Listar los nombres ordenados alfabéticamente
  listarNombresOrdenados() {
    // slice() crea una copia para no alterar el array original al ordenar
    const ordenados = this.usuarios.map(u => u.name).slice().sort();
    console.log("Nombres ordenados alfabéticamente:", ordenados);
    return ordenados;
  }
}

// =========================================================
// Creamos UNA instancia: el constructor descarga la data
// =========================================================
const admin = new AdministradorUsuarios("https://jsonplaceholder.typicode.com/users");

// Helpers de pantalla
function setEstado(t) { document.getElementById("estado").textContent = t; }
function setResultado(html) { document.getElementById("resultado").innerHTML = html; }

// =========================================================
// Conexión de cada método con su botón
// =========================================================

document.getElementById("btnNombres").addEventListener("click", () => {
  const nombres = admin.listarNombres();
  setEstado("✅ Nombres listados (ver consola).");
  setResultado("<ul>" + nombres.map(n => `<li>${n}</li>`).join("") + "</ul>");
});

document.getElementById("btnBasica").addEventListener("click", () => {
  const u = admin.infoBasica();
  setEstado("✅ Info básica (ver consola).");
  if (u) {
    setResultado(`
      <p class="destacado">${u.name}</p>
      <p>Username: ${u.username}</p>
      <p>Email: ${u.email}</p>
    `);
  } else {
    setResultado("Usuario no encontrado.");
  }
});

document.getElementById("btnDireccion").addEventListener("click", () => {
  const d = admin.listarDireccion();
  setEstado("✅ Dirección (ver consola).");
  if (d) {
    setResultado(`
      <p class="destacado">Dirección</p>
      <p>Calle: ${d.street}</p>
      <p>Depto: ${d.suite}</p>
      <p>Ciudad: ${d.city}</p>
      <p>Código postal: ${d.zipcode}</p>
      <p>Geo: lat ${d.geo.lat}, lng ${d.geo.lng}</p>
    `);
  } else {
    setResultado("Usuario no encontrado.");
  }
});

document.getElementById("btnAvanzada").addEventListener("click", () => {
  const u = admin.infoAvanzada();
  setEstado("✅ Info avanzada (ver consola).");
  if (u) {
    setResultado(`
      <p class="destacado">${u.name} — Info avanzada</p>
      <p>Teléfono: ${u.phone}</p>
      <p>Sitio web: ${u.website}</p>
      <p>Compañía: ${u.company.name}</p>
      <p>Frase: "${u.company.catchPhrase}"</p>
      <p>BS: ${u.company.bs}</p>
    `);
  } else {
    setResultado("Usuario no encontrado.");
  }
});

document.getElementById("btnCompanias").addEventListener("click", () => {
  const lista = admin.listarCompanias();
  setEstado("✅ Compañías listadas (ver consola).");
  setResultado("<ul>" + lista.map(item =>
    `<li><span class="destacado">${item.compania}</span><br>"${item.frase}"</li>`
  ).join("") + "</ul>");
});

document.getElementById("btnOrdenados").addEventListener("click", () => {
  const ordenados = admin.listarNombresOrdenados();
  setEstado("✅ Nombres ordenados (ver consola).");
  setResultado("<ul>" + ordenados.map(n => `<li>${n}</li>`).join("") + "</ul>");
});