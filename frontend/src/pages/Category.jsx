import { useParams } from 'react-router-dom'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { ChevronDown } from 'lucide-react'

function Category() {
  const { categoryId } = useParams()
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showFilter, setShowFilter] = useState(false)

  const categories = {
    '1': '女装',
    '2': '男装',
    '3': '美妆',
    '4': '食品',
    '5': '家居',
    '6': '电器'
  }

  // Mock products
  const products = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `${categories[categoryId] || '商品'} ${i + 1}`,
    price: Math.floor(Math.random() * 500) + 10,
    originalPrice: Math.floor(Math.random() * 800) + 100,
    image: `https://via.placeholder.com/300x300?text=${categories[categoryId]}+${i + 1}`,
    rating: (Math.random() * 2 + 3).toFixed(1),
    sales: Math.floor(Math.random() * 10000),
  }))

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">{categories[categoryId] || '商品分类'}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 左侧筛选 */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg p-4 sticky top-20">
            <h3 className="font-bold mb-4">筛选条件</h3>
            
            {/* 价格范围 */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">价格区间</p>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm mt-2">
                <span>¥{priceRange[0]}</span>
                <span>¥{priceRange[1]}</span>
              </div>
            </div>

            {/* 销量 */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">销量</p>
              <div className="space-y-2 text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> 1000+ 销量
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> 5000+ 销量
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> 10000+ 销量
                </label>
              </div>
            </div>

            {/* 评分 */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">评分</p>
              <div className="space-y-2 text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> 4.8+ 星
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> 4.5+ 星
                </label>
              </div>
            </div>

            <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
              重置筛选
            </button>
          </div>
        </div>

        {/* 右侧商品 */}
        <div className="md:col-span-3">
          {/* 排序条 */}
          <div className="flex gap-4 mb-6 pb-4 border-b">
            <button
              onClick={() => setSortBy('default')}
              className={`px-4 py-2 rounded ${sortBy === 'default' ? 'bg-red-100 text-red-500' : 'hover:bg-gray-100'}`}
            >
              综合
            </button>
            <button
              onClick={() => setSortBy('price-asc')}
              className={`px-4 py-2 rounded ${sortBy === 'price-asc' ? 'bg-red-100 text-red-500' : 'hover:bg-gray-100'}`}
            >
              价格↑
            </button>
            <button
              onClick={() => setSortBy('price-desc')}
              className={`px-4 py-2 rounded ${sortBy === 'price-desc' ? 'bg-red-100 text-red-500' : 'hover:bg-gray-100'}`}
            >
              价格↓
            </button>
            <button
              onClick={() => setSortBy('sales')}
              className={`px-4 py-2 rounded ${sortBy === 'sales' ? 'bg-red-100 text-red-500' : 'hover:bg-gray-100'}`}
            >
              销量
            </button>
          </div>

          {/* 商品网格 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
