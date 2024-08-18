import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  return (
    <div className='lg:bg-blue-50 mt-10'>
      <div className="card border-2 w-96 mt-4 p-4 ml-4 lg:ml-16 border-blue-400 bg-blue-100">
        <figure>
          <img src={product.image} className='h-[200px] w-[200px]' />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-[16px]">{product.name}</h2>
          <p className='font-semibold'>Brand: <span className='badge badge-outline p-4 rounded-lg text-[16px] border-blue-400 bg-blue-400 text-white'>{product.brand}</span></p>
          <p>{product.description}</p>
          <p className='font-semibold'>Price: <span className='font-normal'>{product.price}</span>$</p>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object
}

export default ProductCard;