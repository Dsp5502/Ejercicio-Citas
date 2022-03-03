// 1- paso
let formulario = document.querySelector('#formulario');
let btnLimpiar = document.getElementById('btnlimpiar');
let citas = [];

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  capturaDatos();
  formulario.reset();
});

const capturaDatos = () => {
  let nombre = document.getElementById('nombre').value;
  let fecha = document.getElementById('fecha').value;
  let hora = document.getElementById('hora').value;
  let sintomas = document.getElementById('sintomas').value;
  if (nombre === '' || fecha === '' || hora === '' || sintomas === '') {
    alert('Datos invalidos');
  } else {
    let registrarCita = {
      id: Math.round(Math.random() * (100 - 1) + 1),
      nombre,
      fecha,
      hora,
      sintomas,
    };
    console.log(registrarCita);

    const key = JSON.parse(localStorage.getItem('Citas'));

    if (key !== null) {
      key.unshift(registrarCita);
      localStorage.setItem('Citas', JSON.stringify(key));
    } else {
      citas.unshift(registrarCita);
      localStorage.setItem('Citas', JSON.stringify(citas));
    }
    getLocalStorage();
  }
};

//*2

let listarCitas = document.getElementById('listarCita');

const getLocalStorage = () => {
  listarCitas.innerHTML = '';
  let traerCitasLocalStorage = JSON.parse(localStorage.getItem('Citas'));

  traerCitasLocalStorage.map((cita) => {
    const { id, nombre, fecha, hora, sintomas } = cita;
    listarCitas.innerHTML += `
    <td>${nombre}</td>
    <td>${fecha}</td>
    <td>${hora}</td>
    <td>${sintomas}</td>
    <td><button id=${id} class='btn btn-danger'>Eliminar</button></td>
    `;
  });
};

//3 cargar el dom
document.addEventListener('DOMContentLoaded', getLocalStorage);

//* al boton borrar
listarCitas.addEventListener('click', (e) => {
  console.log(e);
  const btndelete = e.target.classList.contains('btn-danger');
  const id = e.target.id;
  const local = JSON.parse(localStorage.getItem('Citas'));
  const buscar = local.find((data) => data.id === Number(id));
  console.log({ buscar });

  if (btndelete) {
    local.forEach((element, index) => {
      if (element.id === buscar.id) {
        local.splice(index, 1); //! eliminar la posicion del arreglo
        //*sobreescribe
        localStorage.setItem('Citas', JSON.stringify(local));
        getLocalStorage();
      }
    });
  }
});

//busqueda por nombre

let btnBuscar = document.getElementById('btnBuscar');

let buscarNombre = document.getElementById('busqueda');

btnBuscar.addEventListener('click', (e) => {
  e.preventDefault();

  let input = document.getElementById('inputBuscar').value;
  let data = JSON.parse(localStorage.getItem('Citas'));

  let filtro = data.filter((datos) =>
    datos.nombre.toLowerCase().includes(input.toLowerCase())
  );
  console.log(filtro);

  buscarNombre.innerHTML = '';
  filtro.length === 0
    ? (buscarNombre.innerHTML += `
  <div>El nombre ${input} No existe</div>`)
    : filtro.map((cita) => {
        const { nombre, fecha, hora, sintomas } = cita;
        buscarNombre.innerHTML += `
    <div>
    <div>
    <h1>${nombre}</h1>
    </div>
    <div>
    <h3>${fecha}</h3>
    <h3>${hora}</h3>
    </div>
    <h3>${sintomas}</h3>
    </div>`;
      });
});

//limpiar

btnLimpiar.addEventListener('click', () => {
  formulario.reset();
});
