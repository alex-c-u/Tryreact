import { useEffect, useState } from 'react';
import TarjetaContacto from './TarjetaContacto';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

function Directorio() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const cargarEquipo = async () => {

      try {

        const equipoRef = collection(db, "equipo");

        const respuesta = await getDocs(equipoRef);

        const datos = respuesta.docs.map(doc => ({
          idFirestore: doc.id,
          ...doc.data()
        }));

        setUsuarios(datos);

      }

      catch (error) {

        console.error(error);

        setError("Error al cargar el equipo.");

      }

      finally {

        setCargando(false);

      }

    };

    cargarEquipo();

  }, []);

  if (cargando) {

    return <p>Cargando equipo...</p>;

  }

  if (error) {

    return <p>{error}</p>;

  }

  return (

    <div className="row">

      {

        usuarios.map(usuario => (

          <TarjetaContacto

            key={usuario.idFirestore}

            {...usuario}

          />

        ))

      }

    </div>

  );

}

export default Directorio;