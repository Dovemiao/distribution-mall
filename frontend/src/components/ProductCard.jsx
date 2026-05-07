import { Link } from 'react-router-dom'
import { useCartStore } from '../stores/cartStore'

export default function ProductCard({ product }) {
  const addToCart = useCartStore(state => state.addItem)

  const handleAddCart = () => {
    addToCart(product)
    alert('已添加到购物车')
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-gray-100 h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Tags */}
        <div className="flex gap-2 mb-2">
          {product.tag === 'taobao' && (
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">淘宝</span>
          )}
          {product.tag === 'pinduoduo' && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">拼多多</span>
          )}
        </div>

        {/* Title */}
        <Link
          to={`/product/${product.id}`}
          className="block text-sm font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-red-500"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
          <span>⭐ {product.rating}</span>
          <span className="text-gray-400">({product.reviews}条评价)</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="text-xl font-bold text-red-500">
            ¥{product.price}
          </div>
          {product.originalPrice && (
            <div className="text-xs text-gray-500 line-through">
              ¥{product.originalPrice}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          {product.affiliateLink && (
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
            >
              🔗 去购买
            </a>
          )}
          <button
            onClick={handleAddCart}
            className="w-full py-2 bg-gray-100 text-gray-800 text-sm rounded hover:bg-gray-200 transition"
          >
            加入购物车
          </button>
        </div>
      </div>
    </div>
  )
}
