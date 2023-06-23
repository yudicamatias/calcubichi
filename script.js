// PARTE 1: Configuración y Variables Iniciales
const INITIAL_PAYMENT_RATIO = 0.35;
const MONTHLY_INSTALLMENTS = [12, 24, 36, 48];
const CURRENCY_SYMBOL = 'USD';

const buildingSelect = document.getElementById('buildingSelect');
const apartmentSelect = document.getElementById('apartmentSelect');
const amountInput = document.getElementById('amountInput');
const calculateButton = document.getElementById('calculateButton');
const resultDiv = document.getElementById('result');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');

let apartmentsData = [];

// Obtener y actualizar el valor del campo "Dolar blue" desde la API
fetch('https://api.bluelytics.com.ar/v2/latest')
  .then(response => response.json())
  .then(data => {
    const dolarBlueValue = data.blue.value_sell;
    dolarBlueInput.value = dolarBlueValue;
  })
  .catch(error => {
    console.error('Error al obtener el valor del Dolar blue:', error);
  });

// Desactivar el campo de entrada "Dolar blue"
dolarBlueInput.disabled = true;

function formatNumber(number) {
    try {
        // Intentar formatear el número
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } catch (e) {
        // Si hay un error, devolver una cadena de error
        return 'Error al formatear el número';
    }
}


function showError(message) {
    window.alert(message);
}

function startLoading() {
    loadingDiv.classList.remove('d-none');
    errorDiv.classList.add('d-none');
}

function stopLoading() {
    loadingDiv.classList.add('d-none');
}

// PARTE 2: Funciones para Fetch
async function fetchBuildings() {
    const response = await fetch('get_buildings.php');
    const data = await response.json();

    if (data.error) {
        throw new Error(data.error);
    }

    return data;
}

async function fetchApartments(buildingId) {
    const response = await fetch(`get_apartments.php?building_id=${buildingId}`);
    const data = await response.json();

    if (data.error) {
        throw new Error(data.error);
    }

    return data;
}

// PARTE 3: Carga Inicial de Edificios
startLoading();
fetchBuildings()
    .then(data => {
        for (let building of data) {
            let opt = document.createElement('option');
            opt.value = building.ID;
            opt.textContent = building.Name;
            buildingSelect.appendChild(opt);
        }
        stopLoading();
    })
    .catch(error => {
        stopLoading();
        showError('Error al cargar los edificios: ' + error.message);
    });


// PARTE 4: Evento de cambio de edificio
buildingSelect.addEventListener('change', async function() {
    let selectedBuildingId = this.value;
    if (!selectedBuildingId) {
        apartmentSelect.classList.add('d-none');
        amountInput.classList.add('d-none');
        calculateButton.classList.add('d-none');
        resultDiv.classList.add('d-none');
        return;
    }
    startLoading();
    try {
        const data = await fetchApartments(selectedBuildingId);
        apartmentSelect.innerHTML = '<option value="">Selecciona un departamento</option>';
        for (let apartment of data) {
            let opt = document.createElement('option');
            opt.value = apartment.ID;
            let cost = parseFloat(apartment.Cost);
            if (!isNaN(cost)) {
                opt.textContent = `${apartment.Name} - ${CURRENCY_SYMBOL} ${formatNumber(cost)}`;
            } else {
                opt.textContent = `${apartment.Name}`;
            }
            apartmentSelect.appendChild(opt);
        }
        apartmentsData = data;
        apartmentSelect.classList.remove('d-none');
    } catch (error) {
        showError('Error al cargar los departamentos: ' + error.message);
    }
    stopLoading();
    amountInput.classList.add('d-none');
    calculateButton.classList.add('d-none');
    resultDiv.classList.add('d-none');
});

// PARTE 5: Evento de cambio de apartamento
apartmentSelect.addEventListener('change', function() {
    let selectedApartmentId = this.value;
    if (!selectedApartmentId) {
        amountInput.classList.add('d-none');
        calculateButton.classList.add('d-none');
        resultDiv.classList.add('d-none');
        return;
    }
    let selectedApartment = apartmentsData.find(apartment => apartment.ID === selectedApartmentId);
    amountInput.value = (selectedApartment.Cost * INITIAL_PAYMENT_RATIO).toFixed(0);
    amountInput.classList.remove('d-none');
    calculateButton.classList.remove('d-none');
    resultDiv.classList.add('d-none');
});

// PARTE 6: Evento del botón de calcular y manejo de tecla Enter
calculateButton.addEventListener('click', function() {
    let amount = Number(amountInput.value);
    let selectedApartmentId = apartmentSelect.value;
    let selectedApartment = apartmentsData.find(apartment => apartment.ID === selectedApartmentId);
    let total = selectedApartment.Cost;
    let remaining = total - amount;

    if (amount > total) {
        showError('El monto ingresado es mayor al costo del departamento seleccionado');
        return;
    }

    let results = MONTHLY_INSTALLMENTS.map(months => {
        return {
            months,
            monthlyPayment: formatNumber(Math.floor(remaining / months))
        };
    });
    let resultStr = 'Te resta pagar:<br>';
    results.forEach(result => {
        resultStr += `${result.months} cuotas: ${CURRENCY_SYMBOL} ${result.monthlyPayment} por mes<br>`;
    });
    resultDiv.innerHTML = resultStr;
    resultDiv.classList.remove('d-none');
});

// Trigger calculate button on Enter key press
amountInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        calculateButton.click();
    }
});
