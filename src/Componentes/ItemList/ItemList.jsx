import Item from "../Item/Item" ;

export function ItemList({ Productos }) {
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            {Productos.map(prod => (
                <Item key={prod.id} {...prod} />
            ))}
        </div>
    );
}

export default ItemList;