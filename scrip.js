const contenedor = document.querySelector('.container');
const formulario = document.querySelector('.formulario');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const segndoElem = document.querySelector('#segundoElemento');
const formulario2 = document.createElement('FORM');
const usuarioP = document.createElement('DIV');

const url = "https://script.google.com/macros/s/AKfycbzHLLqZm_xrCHclXL0PygUdCbph1zMaTNZMV6XfWJRDShNbl4_KUJKrFgw8-KfSTMVrPg/exec";

const arrayControl = {
    fecha: '',
    usuario: '',
    reporte: '',
    latitude: '',
    longitude: ''
}
    

    formulario.addEventListener('submit', validarFormulario);
    

    function validarFormulario(e) {
        e.preventDefault();
        const user = {email:inputEmail.value, clave:Number(inputPassword.value), validarCase:'option01'};
        
        mostrarSpinner();
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(user)
        })
        .then(respuesta => respuesta.json())
        .then(function(data) {

            if(data.mensaje === 3011) {
                arrayControl.usuario = data.usuario;
                formulario.reset();
                contenedor.removeChild(formulario);
                usuarioP.classList.add('row');
                usuarioP.innerHTML = `
                <div class="col-12 col-lg-6 mb-3">
                <h2>Usuario: ${data.usuario}</h2>
                </div>
                <div class="d-flex flex-column mb-3">
                <button type="button" id="btngps" class="btn btn-secondary">Activar GPS</button>
                </div>
                `;
                contenedor.appendChild(usuarioP);
                //console.log(data);
                const botonGPS = document.getElementById('btngps');
                botonGPS.onclick = function () {
                    botonGPS.disabled = true;
                    getLocationConstant();
                }
            }
            if(data.mensaje === 2015) {
                formulario.removeChild(formulario.lastChild);
                console.log(data)
                activarToast(3);
            }
        });
    }

    

function getLocationConstant() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
    }
}

function onGeoSuccess(event) {
    /* let botonEnviar = document.getElementById('btn-enviar');
    botonEnviar.disabled = false; 
    Swal.fire({title:'SUCCESS', text:'Location detected.', icon:'success', timer:2000, showConfirmButton:false}); */
    activarToast(1);
    arrayControl.latitude = event.coords.latitude;
    arrayControl.longitude = event.coords.longitude;
    
    const ubicacionDiv = document.createElement('DIV');
    formulario2.classList.add('row');
    ubicacionDiv.classList.add('col-12');
    ubicacionDiv.innerHTML = `
        <div class="col-12 mb-3">
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch-fill" viewBox="0 0 16 16">
                        <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.013-.012.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354-.012.012A6.97 6.97 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0"></path>
                    </svg>
                </span>            
                <select class="form-select" id="entrad-salida" required>
                    <option selected disabled value="">Seleccionar ENTRADA / SALIDA</option>
                    <option value="entrada">Entrada</option>
                    <option value="salida">Salida</option>
                </select>
            </div>
        </div>
        <div class="d-flex flex-column mb-3">
            <input type="submit" id="btnEnviarRep" class="btn btn-secondary" value="ENVIAR Reporte">
        </div>
    `;                      
    formulario2.appendChild(ubicacionDiv);
    usuarioP.appendChild(formulario2);
    formulario2.addEventListener('submit',enviarReporte);
   
}

function enviarReporte(e) {
    e.preventDefault();
    arrayControl.reporte = document.querySelector('#entrad-salida').value;
    envioSegundoFetch();
}

function envioSegundoFetch(){
    
    const reporteGPS = {validarCase:'option02', latitude:arrayControl.latitude, longitude:arrayControl.longitude, reporte:arrayControl.reporte, usuario:arrayControl.usuario};
    mostrarSpinner2();
    fetch(url, {
        method: 'POST',
        //mode: 'no-cors',
        body: JSON.stringify(reporteGPS)
    })
    .then(respuesta => respuesta.json())
    .then(resultado => {
        contenedor.removeChild(contenedor.lastChild);
        ultimoMensaje(resultado);
    });
}

function onGeoError(event) {
    activarToast(2);
}

function activarToast(tipoAlerta) {
    if(tipoAlerta === 1) {
        const toastLiveExample = document.getElementById('liveToast');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
    }
    if(tipoAlerta === 2) {
        const toastLiveExample2 = document.getElementById('liveToast2');
        const toastBootstrap2 = bootstrap.Toast.getOrCreateInstance(toastLiveExample2);
        toastBootstrap2.show();
    }   
    if(tipoAlerta === 3) {
        const toastLiveExample3 = document.getElementById('liveToast3');
        const toastBootstrap3 = bootstrap.Toast.getOrCreateInstance(toastLiveExample3);
        toastBootstrap3.show();
    }
}

function mostrarSpinner() {
    const spinner = document.createElement('DIV');
    spinner.classList.add('sk-circle');
    spinner.innerHTML = `        
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;
    formulario.appendChild(spinner);
}
function mostrarSpinner2() {
    const spinner = document.createElement('DIV');
    spinner.classList.add('col-12','sk-circle');
    spinner.innerHTML = `        
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;
    formulario2.appendChild(spinner);
}

function ultimoMensaje(resultado) {
    const {hora, fecha, direccion} = resultado;
    const mensajeFin = document.createElement('DIV');
    mensajeFin.classList.add('col-12')
    mensajeFin.innerHTML = `
        <h2>Se reporto su ${arrayControl.reporte}</h2>
        <p>Usuario: ${arrayControl.usuario}</p>
        <p>Fecha: ${fecha}</p>
        <p>Hora: ${hora}</p>
        <p>Direccion: ${direccion}</p>
    `;
    contenedor.appendChild(mensajeFin);
}