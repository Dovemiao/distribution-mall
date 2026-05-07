import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Heart, Menu, X } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const cartItems = useCartStore(state => state.items)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      {/* 顶部条 */}
      <div className="bg-gray-100 text-sm text-gray-600 py-2">
        <div className="container flex justify-between items-center">
          <div>欢迎来到分销商城！精选好物，优惠购物</div>
          <div className="space-x-4">
            <a href="#" className="hover:text-red-500">我的收藏</a>
            <a href="#" className="hover:text-red-500">我的订单</a>
          </div>
        </div>
      </div>

      {/* 主导航 */}
      <div className="container py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold">
            分
          </div>
          <span className="text-xl font-bold text-gray-800">分销商城</span>
        </Link>

        {/* 搜索框 */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="搜索商品、品牌、款式"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="absolute right-0 bg-red-500 text-white px-4 py-2 rounded-r hover:bg-red-600"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        {/* 右侧操作 */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative hover:text-red-500">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button className="hidden md:block hover:text-red-500">
            <Heart size={24} />
          </button>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 分类导航 */}
      <div className="border-t hidden md:block">
        <div className="container">
          <nav className="flex space-x-8 py-3 text-gray-700">
            <Link to="/" className="hover:text-red-500">首页</Link>
            <Link to="/category/1" className="hover:text-red-500">女装</Link>
            <Link to="/category/2" className="hover:text-red-500">男装</Link>
            <Link to="/category/3" className="hover:text-red-500">美妆</Link>
            <Link to="/category/4" className="hover:text-red-500">家居</Link>
            <Link to="/category/5" className="hover:text-red-500">电器</Link>
            <Link to="/category/6" className="hover:text-red-500">食品</Link>
          </nav>
        </div>
      </div>

      {/* 移动菜单 */}
      {menuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-2">
            <Link to="/" className="block py-2 hover:text-red-500">首页</Link>
            <Link to="/category/1" className="block py-2 hover:text-red-500">女装</Link>
            <Link to="/category/2" className="block py-2 hover:text-red-500">男装</Link>
            <Link to="/category/3" className="block py-2 hover:text-red-500">美妆</Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
