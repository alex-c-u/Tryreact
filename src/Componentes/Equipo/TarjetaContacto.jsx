import styles from './TarjetaContacto.module.css';

function TarjetaContacto({ nombre, email, puesto, foto }) {
  return (
    <div className="col-md-3 mb-3">
      <div className={styles.columna}>

        <div className={styles.card}>

          <img
            src={foto}
            alt={nombre}
            className={styles.avatar}
          />

          <div className={styles.body}>

            <h5 className={styles.nombre}>
              {nombre}
            </h5>

            <p className={styles.puesto}>
              {puesto}
            </p>

            <p className={styles.email}>
              {email}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default TarjetaContacto;