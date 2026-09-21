import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

class Formulario extends Component {
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator({
      autoForceUpdate: this
    });

    this.state = {
      nombre: '',
      correo: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validator.allValid()) {
      addDoc(collection(db, 'usuarios'), {
        nombre: this.state.nombre,
        correo: this.state.correo
      })
        .then(() => {
          alert('Datos guardados correctamente');

          this.setState({
            nombre: '',
            correo: ''
          });

          this.validator.hideMessages();
        })
        .catch((error) => {
          console.error('Error al guardar:', error);
          alert('Error al guardar los datos');
        });
    } else {
      this.validator.showMessages();
    }
  }

  render() {
  return (
    <div className="card p-4 mt-4">
      <h2>Formulario</h2>

      <form onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre:</label>

          <input
            type="text"
            name="nombre"
            className="form-control"
            value={this.state.nombre}
            onChange={this.handleChange}
          />

          {this.validator.message(
            'nombre',
            this.state.nombre,
            'required|alpha'
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Correo:</label>

          <input
            type="email"
            name="correo"
            className="form-control"
            value={this.state.correo}
            onChange={this.handleChange}
          />

          {this.validator.message(
            'correo',
            this.state.correo,
            'required|email'
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
}

export default Formulario;