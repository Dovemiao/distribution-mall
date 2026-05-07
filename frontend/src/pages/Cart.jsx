import { useCartStore } from '../stores/cartStore'
import { Trash2, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (items.length === 0) {
    return (
      <div className="container py-12 text-center">
        <ShoppingCart size={48} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-4">购物车空空如也</h2>
        <p className="text-gray-600 mb-6">快去逛逛，选择心仪的商品吧</p>
        <Link to="/" className="btn-primary">
          继续购物
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">购物车</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 商品列表 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg overflow-hidden">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border-b hover:bg-gray-50">
                {/* 商品图片 */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                {/* 商品信息 */}
                <div className="flex-1">
                  <Link to={`/product/${item.id}`} className="hover:text-red-500">
                    <p className="font-semibold text-gray-800 line-clamp-2">{item.name}</p>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">¥{item.price}</p>
                </div>

                {/* 数量和操作 */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 border-l border-r">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 结算栏 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 sticky top-20 h-fit">
            <h2 className="font-bold text-lg mb-4">订单摘要</h2>
            
            <div className="space-y-3 mb-4 pb-4 border-b">
              <div className="flex justify-between text-gray-600">
                <span>商品小计</span>
                <span>¥{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>运费</span>
                <span>¥0</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>合计</span>
              <span className="text-red-500">¥{total.toFixed(2)}</span>
            </div>

            <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 font-semibold mb-3">
              去结算
            </button>
            <button
              onClick={() => clearCart()}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
            >
              清空购物车
            </button>

            <div className="mt-6 pt-4 border-t text-xs text-gray-600 space-y-1">
              <p>✓ 支持7天无理由退货</p>
              <p>✓ 正品保证</p>
              <p>✓ 48小时发货</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
