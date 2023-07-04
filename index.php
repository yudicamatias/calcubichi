<!DOCTYPE html>
<html>
<head>
    <title>Calculadora de Cuotas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <link href="styles.css?v=1.0" rel="stylesheet">
</head>
<body>
    <div class="container">
        <!-- Modal HTML -->
<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="loginModalLabel">Login</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="loginForm">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password">
          </div>
          <p id="loginError" class="d-none"></p>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>
<div class="d-flex justify-content-end mt-2">
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
    Login
  </button>
</div>

        <img src="https://i.postimg.cc/BbcFMDCw/Constru-LOGO-2-4x.png" alt="Logo de Construfac" class="logo"> <!-- Añadido atributo alt -->
        <div class="dolar-blue-container">
             <span class="pesos-symbol">$</span>
            <input type="number" id="dolarBlueInput" class="dolar-blue-input" disabled>
        <label for="buildingSelect"></label> <!-- Añadido label -->
        <select id="buildingSelect" class="form-control" required>
            <option value="">Selecciona un edificio</option>
        </select>
        <label for="apartmentSelect" class="d-none">Selecciona un departamento</label> <!-- Añadido label -->
        <select id="apartmentSelect" class="form-control d-none" required>
            <option value="">Selecciona un departamento</option>
        </select>
        <label for="amountInput" class="d-none">Monto a entregar</label> <!-- Añadido label -->
        <input type="number" id="amountInput" class="form-control d-none" placeholder="Monto a entregar" required>
        <button id="calculateButton" class="btn btn-primary d-none"><i class="fas fa-calculator"></i> Calcular cuotas</button>
        <div id="result" class="result d-none"></div>
        <div id="loading" class="text-center d-none"><i class="fas fa-spinner fa-spin"></i> Cargando...</div>
        <div id="error" class="error text-center d-none"></div>
        <footer>&copy; Construfac 2023</footer>
    </div>
    <script src="modal.js?v=1.0"></script>
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    <script src="script.js?v=1.0"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    
    
</body>
</html>
