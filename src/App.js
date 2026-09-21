import './App.css';
import ListaProductos from './components/ListaProductos';
import Formulario from './components/Formulario';
import Autenticacion from './components/Autenticacion';
import SubirArchivo from './components/SubirArchivo';

function App() {
  return (
    <div className="app-page">
      <div className="container py-5">

        <header className="app-header mb-4">
          <span className="badge bg-primary mb-3">
            Proyecto Final
          </span>

          <h1 className="fw-bold mb-2">
            Tienda de Productos
          </h1>

          <p className="text-muted mb-0">
            Aplicación desarrollada con React, Bootstrap y Firebase
          </p>
        </header>

        <ListaProductos />

        <div className="row g-4 mt-1 mb-4">
          <div className="col-lg-6">
            <Formulario />
          </div>

          <div className="col-lg-6">
            <Autenticacion />
          </div>
        </div>

        <SubirArchivo />

      </div>
    </div>
  );
}

export default App;