// Obtener referencias a los elementos HTML
const addBuildingForm = document.getElementById('addBuildingForm');
const buildingNameInput = document.getElementById('buildingName');
const buildingList = document.getElementById('buildingList');

const addApartmentForm = document.getElementById('addApartmentForm');
const buildingSelect = document.getElementById('buildingSelect');
const apartmentNameInput = document.getElementById('apartmentName');
const apartmentCostInput = document.getElementById('apartmentCost');
const apartmentList = document.getElementById('apartmentList');

// Cargar edificios existentes al cargar la página
window.addEventListener('load', () => {
  loadBuildings();
});

// Agregar evento de envío para el formulario de agregar edificio
addBuildingForm.addEventListener('submit', event => {
  event.preventDefault();

  const buildingName = buildingNameInput.value;
  addBuilding(buildingName);
});

// Agregar evento de envío para el formulario de agregar departamento
addApartmentForm.addEventListener('submit', event => {
  event.preventDefault();

  const buildingId = buildingSelect.value;
  const apartmentName = apartmentNameInput.value;
  const apartmentCost = parseFloat(apartmentCostInput.value);

  addApartment(buildingId, apartmentName, apartmentCost);
});

// Cargar edificios existentes
function loadBuildings() {
  fetch('get_buildings.php')
    .then(response => response.json())
    .then(data => {
      buildingSelect.innerHTML = '<option value="">Seleccionar un edificio</option>';
      buildingList.innerHTML = '';
      data.forEach(building => {
        const option = document.createElement('option');
        option.value = building.ID;
        option.textContent = building.Name;
        buildingSelect.appendChild(option);

        const listItem = document.createElement('li');
        listItem.textContent = building.Name;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
          deleteBuilding(building.ID);
        });

        listItem.appendChild(deleteButton);
        buildingList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error al cargar los edificios:', error);
    });
}

// Eliminar un edificio
function deleteBuilding(buildingId) {
  const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este edificio?');

  if (!confirmDelete) {
    return;
  }

  const url = `delete_building.php?building_id=${buildingId}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        loadBuildings();
      } else {
        console.error('Error al eliminar el edificio:', data.error);
      }
    })
    .catch(error => {
      console.error('Error al eliminar el edificio:', error);
    });
}

// Agregar un nuevo edificio
function addBuilding(buildingName) {
  const formData = new FormData();
  formData.append('buildingName', buildingName);

  fetch('add_building.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        loadBuildings();
        buildingNameInput.value = '';
      } else {
        console.error('Error al agregar el edificio:', data.error);
      }
    })
    .catch(error => {
      console.error('Error al agregar el edificio:', error);
    });
}

// Agregar un nuevo departamento
function addApartment(buildingId, apartmentName, apartmentCost) {
  const formData = new FormData();
  formData.append('buildingId', buildingId);
  formData.append('apartmentName', apartmentName);
  formData.append('apartmentCost', apartmentCost);

  fetch('add_apartment.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        loadApartments();
        apartmentNameInput.value = '';
        apartmentCostInput.value = '';
      } else {
        console.error('Error al agregar el departamento:', data.error);
      }
    })
    .catch(error => {
      console.error('Error al agregar el departamento:', error);
    });
}

// Cargar los departamentos existentes
function loadApartments() {
  const buildingId = buildingSelect.value;

  if (!buildingId) {
    apartmentList.innerHTML = '';
    return;
  }

  const url = `get_apartments.php?building_id=${buildingId}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      apartmentList.innerHTML = '';
      data.forEach(apartment => {
        const listItem = document.createElement('li');
        listItem.textContent = `${apartment.Name} - Costo: $${apartment.Cost}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
          deleteApartment(apartment.ID);
        });

        listItem.appendChild(deleteButton);
        apartmentList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error al cargar los departamentos:', error);
    });
}

// Eliminar un departamento
function deleteApartment(apartmentId) {
  const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este departamento?');

  if (!confirmDelete) {
    return;
  }

  const url = `delete_apartment.php?apartment_id=${apartmentId}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        loadApartments();
      } else {
        console.error('Error al eliminar el departamento:', data.error);
      }
    })
    .catch(error => {
      console.error('Error al eliminar el departamento:', error);
    });
}

// Actualizar las opciones de selección de edificios en el formulario de agregar departamento
function updateBuildingSelectOptions(buildings) {
  buildingSelect.innerHTML = '<option value="">Selecciona un edificio</option>';
  buildings.forEach(building => {
    const option = document.createElement('option');
    option.value = building.ID;
    option.textContent = building.Name;
    buildingSelect.appendChild(option);
  });
}

// Agregar evento de cambio para el selector de edificio
buildingSelect.addEventListener('change', loadApartments);
