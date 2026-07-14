export function FormularioProducto({

    datosForm,
    manejarCambio,
    manejarEnvio,
    manejarCambioImagen,
    loading,
    modoEdicion,
    errores
}) {
 
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '24rem',
        margin: '3rem auto',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        gap: '16px'
    };
    
    return (
        <form style={formStyle} onSubmit={manejarEnvio}>
            <h3>
                {modoEdicion
                    ? "Editar Producto"
                    : "Agregar Nuevo Producto"}
            </h3>

            <div>
                <label>Nombre del Producto:</label>

                <input
                    className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                    type="text"
                    name="nombre"
                    placeholder="Ej: Brocha XLL"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                />

                <div className="invalid-feedback">
                    {errores.nombre}
                </div>
            </div>

            <div>
                <label>Precio:</label>
                <input
                    className={`form-control ${errores.precio ? "is-invalid" : ""}`}
                    type="number"
                    name="precio"
                    placeholder="1500"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                />

                <div className="invalid-feedback">
                    {errores.precio}
                </div>
            </div>

            <div>
                <label>Stock:</label>
                <input
                    className={`form-control ${errores.stock ? "is-invalid" : ""}`}
                    type="number"
                    name="stock"
                    placeholder="01"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                />

                <div className="invalid-feedback">
                    {errores.stock}
                </div>
            </div>

            <div>
                <label> ID </label>
                <input
                    className={`form-control ${errores.id ? "is-invalid" : ""}`}
                    type="number"
                    name="id"
                    placeholder="123456789"
                    value={datosForm.id}
                    onChange={manejarCambio}
                />

                <div className="invalid-feedback">
                    {errores.id}
                </div>
            </div>

            <div>
                <label>Categoria:</label>
                <input
                    className={`form-control ${errores.categoria ? "is-invalid" : ""}`}
                    type="text"
                    name="categoria"
                    placeholder="Ej: donde pertenece el objeto"
                    value={datosForm.categoria}
                    onChange={manejarCambio}
                />

                <div className="invalid-feedback">
                    {errores.categoria}
                </div>
            </div>

            <div>
                <label>Marca:</label>
                <input
                    className={`form-control ${errores.marca ? "is-invalid" : ""}`}
                    type="text"
                    name="marca"
                    placeholder="marca del producto"
                    value={datosForm.marca}
                    onChange={manejarCambio}
                />

                <div className="invalid-feedback">
                    {errores.marca}
                </div>
            </div>
            <div>
                <label>Detalle:</label>
                <textarea
                    className={`form-control ${errores.detalle ? "is-invalid" : ""}`}
                    rows="4"
                    name="detalle"
                    placeholder="Ej: detalle del producto..."
                    value={datosForm.detalle}
                    onChange={manejarCambio}
                />

                <div className="invalid-feedback">
                    {errores.detalle}
                </div>

            </div>

            <div>
                <label>Imagen:</label>
                <input
                    className={`form-control ${errores.imagen ? "is-invalid" : ""}`}
                    type="file"
                    placeholder="https://..."
                    onChange={manejarCambioImagen}
                />
                <div className="invalid-feedback">
                    {errores.imagen}
                </div>
            </div>

            <button
            className="btn btn-primary"
                type="submit"
                disabled={loading}
            >

                {
                    loading
                        ? "Procesando..."
                        : modoEdicion
                            ? "Actualizar Producto"
                            : "Guardar Producto"
                }

            </button>
        </form >
    );
}

export default FormularioProducto;