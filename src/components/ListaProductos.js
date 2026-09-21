import React, { Component } from 'react';
import Producto from './Producto';

class ListaProductos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productos: [
        { id: 1, nombre: 'Notebook', precio: 500000 },
        { id: 2, nombre: 'Mouse', precio: 15000 },
        { id: 3, nombre: 'Teclado', precio: 25000 }
      ],
      carrito: []
    };

    this.agregarAlCarrito = this.agregarAlCarrito.bind(this);
    this.eliminarDelCarrito = this.eliminarDelCarrito.bind(this);
  }

  agregarAlCarrito(producto) {
    this.setState({
      carrito: [...this.state.carrito, producto]
    });
  }

  eliminarDelCarrito(index) {
    const nuevoCarrito = [...this.state.carrito];

    nuevoCarrito.splice(index, 1);

    this.setState({
      carrito: nuevoCarrito
    });
  }

  calcularTotal() {
    return this.state.carrito.reduce(
      (total, producto) => total + producto.precio,
      0
    );
  }

  render() {
    const total = this.calcularTotal();

    return (
      <div className="section-card mb-4">

        <div className="section-title">
          <div>
            <h2 className="fw-bold mb-1">
              Productos
            </h2>

            <p className="text-muted mb-0">
              Selecciona los productos que deseas agregar.
            </p>
          </div>

          <span className="badge bg-primary">
            {this.state.productos.length} productos
          </span>
        </div>

        <div className="row g-3 mt-2">
          {this.state.productos.map((producto) => (
            <div
              className="col-md-4"
              key={producto.id}
            >
              <Producto
                nombre={producto.nombre}
                precio={producto.precio}
                producto={producto}
                agregarAlCarrito={this.agregarAlCarrito}
              />
            </div>
          ))}
        </div>

        <div className="carrito-box mt-4">

          <div className="d-flex justify-content-between align-items-center">
            <h3 className="h5 fw-bold mb-0">
              Carrito
            </h3>

            <span className="badge bg-dark">
              {this.state.carrito.length}
            </span>
          </div>

          {this.state.carrito.length === 0 ? (
            <p className="text-muted mb-0 mt-3">
              Todavía no has agregado productos.
            </p>
          ) : (
            <>
              <div className="mt-3">
                {this.state.carrito.map((producto, index) => (
                  <div
                    className="producto-carrito"
                    key={index}
                  >
                    <div>
                      <span>
                        {producto.nombre}
                      </span>

                      <strong className="ms-3">
                        ${producto.precio.toLocaleString('es-CL')}
                      </strong>
                    </div>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        this.eliminarDelCarrito(index)
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>

              <div className="carrito-total mt-3 pt-3">
                <span className="fw-bold">
                  Total
                </span>

                <span className="fw-bold fs-5">
                  ${total.toLocaleString('es-CL')}
                </span>
              </div>
            </>
          )}

        </div>

      </div>
    );
  }
}

export default ListaProductos;