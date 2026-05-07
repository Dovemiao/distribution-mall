import { Link } from 'react-router-dom'
import { Heart, Share2 } from 'lucide-react'
import { useState } from 'react'

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false)

  const formatPrice = (price) => {
    return `¥${parseFloat(price).toFixed(2)}`
  }

  const handleShare = (e) => {
    e.preventDefault()
    const text = `${product.name} - ${formatPrice(product.price)} - 分销商城推荐`
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: text,
        url: window.location.href
      })
    } else {
      alert(`分享链接: ${product.affiliateLink}`)
    }
  }

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        {/* 商品图片 */}
        <div className="relative bg-gray-200 aspect-square overflow-hidden group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
          />
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
              {product.discount}
            </div>
          )}
          {product.badge && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
              {product.badge}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex justify-between text-white">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setLiked(!liked)
                }}
                className="hover:scale-110 transition-transform"
              >
                <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={handleShare}
                className="hover:scale-110 transition-transform"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* 商品信息 */}
        <div className="p-3">
          <p className="text-sm text-gray-700 line-clamp-2 mb-2 hover:text-red-500">
            {product.name}
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-500 font-bold text-lg">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <span className="flex items-center">
              ⭐ {product.rating || 4.8}
            </span>
            <span className="ml-2">{product.sales || 0}人付款</span>
          </div>
          {product.affiliateSource && (
            <div className="mt-2 text-xs text-gray-500">
              来自: {product.affiliateSource}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
