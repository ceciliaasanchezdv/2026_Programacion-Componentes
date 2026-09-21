import React, { Component } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

class Autenticacion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.registrar = this.registrar.bind(this);
    this.iniciarSesion = this.iniciarSesion.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  registrar() {
    createUserWithEmailAndPassword(
      auth,
      this.state.email,
      this.state.password
    )
      .then(() => {
        alert('Usuario registrado correctamente');
      })
      .catch((error) => {
        console.error(error);
        alert('Error al registrar usuario');
      });
  }

  iniciarSesion() {
    signInWithEmailAndPassword(
      auth,
      this.state.email,
      this.state.password
    )
      .then(() => {
        alert('Inicio de sesión correcto');
      })
      .catch((error) => {
        console.error(error);
        alert('Email o contraseña incorrectos');
      });
  }

  render() {
    return (
      <div className="card p-4 mt-4">
        <h2>Autenticación</h2>

        <div className="mb-3">
          <label className="form-label">Email:</label>

          <input
            type="email"
            name="email"
            className="form-control"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña:</label>

          <input
            type="password"
            name="password"
            className="form-control"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <button
            className="btn btn-success me-2"
            onClick={this.registrar}
          >
            Registrarse
          </button>

          <button
            className="btn btn-primary"
            onClick={this.iniciarSesion}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }
}

export default Autenticacion;