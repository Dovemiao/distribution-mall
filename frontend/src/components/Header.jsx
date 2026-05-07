import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../stores/cartStore'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const cartItems = useCartStore(state => state.items)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-100 text-sm text-gray-600 py-2">
        <div className="container flex justify-between">
          <div>欢迎来到分销商城！</div>
          <div className="space-x-4">
            <a href="#" className="hover:text-gray-900">登录</a>
            <a href="#" className="hover:text-gray-900">注册</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-red-500 flex-shrink-0">
            🛍️ 分销商城
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="flex">
              <input
                type="text"
                placeholder="搜索商品、品牌、店铺"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-500 text-white rounded-r hover:bg-red-600 transition"
              >
                搜索
              </button>
            </div>
          </form>

          {/* Right menu */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/cart" className="relative">
              <div className="text-2xl">🛒</div>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <a href="#" className="text-2xl">❤️</a>
          </div>
        </div>
      </div>

      {/* Categories bar */}
      <div className="bg-white border-t border-gray-200">
        <div className="container flex gap-6 text-sm text-gray-700 py-2 overflow-x-auto">
          <Link to="/" className="hover:text-red-500 whitespace-nowrap">首页</Link>
          <Link to="/category/1" className="hover:text-red-500 whitespace-nowrap">电子产品</Link>
          <Link to="/category/2" className="hover:text-red-500 whitespace-nowrap">衣服鞋帽</Link>
          <Link to="/category/3" className="hover:text-red-500 whitespace-nowrap">家居日用</Link>
          <Link to="/category/4" className="hover:text-red-500 whitespace-nowrap">美妆护肤</Link>
          <Link to="/category/5" className="hover:text-red-500 whitespace-nowrap">食品饮料</Link>
        </div>
      </div>
    </header>
  )
}
