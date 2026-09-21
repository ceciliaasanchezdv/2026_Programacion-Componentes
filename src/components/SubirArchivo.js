import React, { Component } from 'react';
import { auth, storage } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

class SubirArchivo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      archivo: null,
      progreso: 0,
      url: '',
      usuario: null
    };

    this.seleccionarArchivo = this.seleccionarArchivo.bind(this);
    this.subirArchivo = this.subirArchivo.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = onAuthStateChanged(auth, (usuario) => {
      this.setState({
        usuario: usuario
      });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  seleccionarArchivo(event) {
    this.setState({
      archivo: event.target.files[0]
    });
  }

  subirArchivo() {
    const archivo = this.state.archivo;

    if (!archivo) {
      alert('Selecciona un archivo');
      return;
    }

    const archivoRef = ref(
      storage,
      'uploads/' + archivo.name
    );

    const uploadTask = uploadBytesResumable(
      archivoRef,
      archivo
    );

    uploadTask.on(
      'state_changed',

      (snapshot) => {
        const progreso =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        this.setState({
          progreso: Math.round(progreso)
        });
      },

      (error) => {
        console.error(error);
        alert('Error al subir el archivo');
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            this.setState({
              url: url,
              archivo: null
            });

            alert('Archivo subido correctamente');
          });
      }
    );
  }

  render() {
    if (!this.state.usuario) {
      return (
        <div className="card p-4 mt-4">
          <h2>Subir Archivo</h2>

          <p>
            Debes iniciar sesión para subir archivos.
          </p>
        </div>
      );
    }

    return (
      <div className="card p-4 mt-4">
        <h2>Subir Archivo</h2>

        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={this.seleccionarArchivo}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={this.subirArchivo}
        >
          Subir archivo
        </button>

        <p className="mt-3">
          Progreso: {this.state.progreso}%
        </p>

        {this.state.url && (
          <p>
            Archivo subido:{' '}
            <a
              href={this.state.url}
              target="_blank"
              rel="noreferrer"
            >
              Ver archivo
            </a>
          </p>
        )}
      </div>
    );
  }
}

export default SubirArchivo;