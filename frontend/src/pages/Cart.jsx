import { Link } from 'react-router-dom'
import { useCartStore } from '../stores/cartStore'

export default function Cart() {
  const items = useCartStore(state => state.items)
  const removeItem = useCartStore(state => state.removeItem)
  const clearCart = useCartStore(state => state.clearCart)

  const total = items.reduce((sum, item) => sum + item.price, 0)
  const groupedItems = items.reduce((acc, item) => {
    const existing = acc.find(i => i.id === item.id)
    if (existing) {
      existing.quantity += 1
    } else {
      acc.push({ ...item, quantity: 1 })
    }
    return acc
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      {items.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold mb-2">购物车空空如也</h1>
          <p className="text-gray-600 mb-6">去逛逛，购物吧！</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            继续购物
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {/* Items */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <h2 className="text-lg font-bold">购物车</h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:underline"
                >
                  清空购物车
                </button>
              </div>

              <div className="space-y-4">
                {groupedItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">¥{item.price}</p>
                      <p className="text-gray-500 text-sm mt-2">数量: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-500">¥{(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-500 hover:underline mt-2"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-lg p-6 h-fit sticky top-4">
              <h3 className="text-lg font-bold mb-4">订单摘要</h3>

              <div className="space-y-3 pb-4 border-b">
                <div className="flex justify-between text-gray-700">
                  <span>商品数量</span>
                  <span>{items.length}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>商品总价</span>
                  <span>¥{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>运费</span>
                  <span className="text-green-500">免费</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold my-4">
                <span>合计</span>
                <span className="text-red-500">¥{total.toFixed(2)}</span>
              </div>

              <button className="w-full py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition mb-2">
                结算
              </button>
              <Link
                to="/"
                className="block w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition text-center"
              >
                继续购物
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
