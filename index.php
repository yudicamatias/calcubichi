<!DOCTYPE html>
<html>
<head>
    <title>Calculadora de Cuotas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link href="styles.css?v=1.0" rel="stylesheet">
</head>
<body>
    <div class="container">
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

    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    <script src="script.js?v=1.0"></script>
</body>
</html>
