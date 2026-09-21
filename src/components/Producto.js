function Producto(props) {
  return (
    <div className="card producto-card h-100">
      <div className="card-body d-flex flex-column">
        <span className="badge bg-light text-primary align-self-start mb-3">
          Producto
        </span>

        <h3 className="h4 fw-bold">
          {props.nombre}
        </h3>

        <p className="text-muted mb-4">
          Precio:{' '}
          <strong className="text-dark">
            ${props.precio.toLocaleString('es-CL')}
          </strong>
        </p>

        <button
          className="btn btn-primary mt-auto"
          onClick={() =>
            props.agregarAlCarrito(props.producto)
          }
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default Producto;