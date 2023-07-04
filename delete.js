// Eliminar departamento
function deleteApartment(apartmentId) {
  const confirmation = confirm('¿Estás seguro de que deseas eliminar este departamento?');
  if (!confirmation) {
    return;
  }

  const url = `delete_apartment.php?apartment_id=${apartmentId}`;

  fetch(url, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        loadApartments(); // Volver a cargar los departamentos después de eliminar uno
      } else {
        console.error('Error al eliminar el departamento:', data.error);
      }
    })
    .catch(error => {
      console.error('Error al eliminar el departamento:', error);
    });
}

// Eliminar edificio
function deleteBuilding(buildingId) {
  const confirmation = confirm('¿Estás seguro de que deseas eliminar este edificio y todos sus departamentos?');
  if (!confirmation) {
    return;
  }

  const url = `delete_building.php?building_id=${buildingId}`;

  fetch(url, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        loadBuildings(); // Volver a cargar los edificios después de eliminar uno
        apartmentList.innerHTML = ''; // Limpiar la lista de departamentos
      } else {
        console.error('Error al eliminar el edificio:', data.error);
      }
    })
    .catch(error => {
      console.error('Error al eliminar el edificio:', error);
    });
}

// Cargar la lista de edificios
function loadBuildings() {
  const url = 'get_buildings.php';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      buildingList.innerHTML = '';
      data.forEach(building => {
        const listItem = document.createElement('li');
        listItem.textContent = `${building.Name} `;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteBuilding(building.ID));
        listItem.appendChild(deleteButton);
        buildingList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error al cargar los edificios:', error);
    });
}

// Cargar la lista de departamentos
function loadApartments() {
  const buildingId = buildingSelect.value;

  if (!buildingId) {
    apartmentContainer.style.display = 'none';
    return;
  }

  const url = `get_apartments.php?building_id=${buildingId}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      apartmentList.innerHTML = '';
      data.forEach(apartment => {
        const listItem = document.createElement('li');
        listItem.textContent = `${apartment.Name} - Costo: ${apartment.Cost}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteApartment(apartment.ID));
        listItem.appendChild(deleteButton);
        apartmentList.appendChild(listItem);
      });
      apartmentContainer.style.display = 'block'; // Mostrar el contenedor de departamentos
    })
    .catch(error => {
      console.error('Error al cargar los departamentos:', error);
    });
}



// Cargar la lista de edificios al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  loadBuildings();
});

// Volver a cargar los departamentos cuando se selecciona un edificio diferente
buildingSelect.addEventListener('change', () => {
  loadApartments();
});
