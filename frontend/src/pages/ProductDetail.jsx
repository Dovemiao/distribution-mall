import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Heart, Share2, ShoppingCart } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'

function ProductDetail() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [liked, setLiked] = useState(false)
  const addItem = useCartStore(state => state.addItem)

  // Mock product data
  const product = {
    id: parseInt(id),
    name: `热销商品 ${id} - 高质量好物推荐`,
    price: 89.9,
    originalPrice: 199.9,
    image: `https://via.placeholder.com/500x500?text=Product+${id}`,
    images: [
      `https://via.placeholder.com/500x500?text=Product+${id}+1`,
      `https://via.placeholder.com/500x500?text=Product+${id}+2`,
      `https://via.placeholder.com/500x500?text=Product+${id}+3`,
    ],
    description: '这是一个优质商品，品质有保证，支持7天无理由退货。',
    rating: 4.8,
    sales: 10000,
    affiliateSource: 'taobao',
    affiliateLink: 'https://taobao.com/...',
    specs: [
      { key: '材质', value: '纯棉' },
      { key: '尺码', value: 'M/L/XL/XXL' },
      { key: '颜色', value: '黑色/白色/红色' },
      { key: '产地', value: '中国' }
    ],
    details: '详细商品描述和参数信息...'
  }

  const handleAddToCart = () => {
    addItem({ ...product, quantity })
    alert('已添加到购物车')
  }

  return (
    <div className="container py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左侧图片 */}
          <div>
            <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center mb-4">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <div key={i} className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:border-2 hover:border-red-500">
                  <img src={img} alt={`${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* 右侧信息 */}
          <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">{product.name}</h1>
            
            {/* 价格 */}
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-red-500">¥{product.price}</span>
                <span className="text-lg line-through text-gray-500">¥{product.originalPrice}</span>
              </div>
              <div className="text-sm text-orange-600">节省 ¥{(product.originalPrice - product.price).toFixed(2)}</div>
            </div>

            {/* 评分 */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b">
              <span>⭐ {product.rating} 分</span>
              <span className="text-gray-600">{product.sales} 人付款</span>
            </div>

            {/* 来源 */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                推广来源: <span className="font-semibold text-blue-600">
                  {product.affiliateSource === 'taobao' ? '淘宝联盟' : '拼多多推广'}
                </span>
              </p>
            </div>

            {/* 规格选择 */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">选择规格</h3>
              {product.specs.map((spec, i) => (
                <div key={i} className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">{spec.key}</p>
                  <div className="flex gap-2 flex-wrap">
                    {spec.value.split('/').map((val, j) => (
                      <button key={j} className="border border-gray-300 px-4 py-2 rounded hover:border-red-500">
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 数量选择 */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">购买数量</p>
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-lg hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center border-l border-r border-gray-300 py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => setLiked(!liked)}
                className="border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2"
              >
                <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                <span>收藏</span>
              </button>
              <button className="border border-orange-500 text-orange-500 py-3 rounded-lg hover:bg-orange-50 flex items-center justify-center gap-2">
                <Share2 size={20} />
                <span>分享</span>
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-lg hover:shadow-lg flex items-center justify-center gap-2 col-span-1 md:col-span-1"
              >
                <ShoppingCart size={20} />
                <span>加入购物车</span>
              </button>
            </div>
            <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 text-lg font-semibold">
              立即购买
            </button>

            {/* 购买须知 */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
              <p>✓ 支持7天无理由退货</p>
              <p>✓ 正品保证</p>
              <p>✓ 48小时发货</p>
            </div>
          </div>
        </div>

        {/* 商品详情 */}
        <div className="mt-8 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">商品详情</h2>
          <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {product.details}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
