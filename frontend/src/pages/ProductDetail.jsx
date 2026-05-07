import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchProduct } from '../api/products'
import { useCartStore } from '../stores/cartStore'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const addToCart = useCartStore(state => state.addItem)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await fetchProduct(id)
      setProduct(data)
    } catch (error) {
      console.error('Failed to load product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    alert(`已添加 ${quantity} 件到购物车`)
    setQuantity(1)
  }

  if (loading) return <div className="text-center py-12">加载中...</div>
  if (!product) return <div className="text-center py-12">商品不存在</div>

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 gap-8 bg-white p-6 rounded-lg">
        {/* Images */}
        <div>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images?.map((img, idx) => (
              <img key={idx} src={img} alt="" className="w-full h-20 object-cover rounded cursor-pointer hover:border-2 border-red-500" />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {product.tag === 'taobao' && (
              <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded">淘宝联盟</span>
            )}
            {product.tag === 'pinduoduo' && (
              <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded">拼多多</span>
            )}
          </div>

          {/* Price */}
          <div className="mb-6 pb-6 border-b">
            <div className="text-3xl font-bold text-red-500 mb-2">¥{product.price}</div>
            {product.originalPrice && (
              <div className="text-gray-500 line-through">¥{product.originalPrice}</div>
            )}
          </div>

          {/* Rating */}
          <div className="mb-6 pb-6 border-b">
            <div className="flex items-center gap-4">
              <span className="text-lg">⭐ {product.rating}/5</span>
              <span className="text-gray-600">({product.reviews}条评价)</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 pb-6 border-b">
            <h3 className="font-bold mb-2">商品描述</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Specs */}
          {product.specs && (
            <div className="mb-6 pb-6 border-b">
              <h3 className="font-bold mb-4">商品规格</h3>
              <div className="space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="text-gray-600 w-24">{key}:</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Purchase */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-700">数量:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="w-12 text-center border-l border-r border-gray-300 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              {product.affiliateLink && (
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-red-500 text-white rounded-lg text-center font-bold hover:bg-red-600 transition"
                >
                  🔗 去购买 (联盟推广)
                </a>
              )}
              <button
                onClick={handleAddCart}
                className="flex-1 py-3 border-2 border-red-500 text-red-500 rounded-lg font-bold hover:bg-red-50 transition"
              >
                加入购物车
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">用户评价</h2>
        <div className="space-y-4">
          {product.reviews_list?.map((review, idx) => (
            <div key={idx} className="pb-4 border-b">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{review.user}</span>
                <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
