import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
import { ChevronRight } from 'lucide-react'

function Home() {
  const [banners, setBanners] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [bannersRes, productsRes] = await Promise.all([
          axios.get('/api/banners'),
          axios.get('/api/products?limit=20')
        ])
        setBanners(bannersRes.data.data || [])
        setFeaturedProducts(productsRes.data.data?.slice(0, 8) || [])
        setAllProducts(productsRes.data.data || [])
        setError(null)
      } catch (err) {
        console.error('获取数据失败:', err)
        setError('加载失败，请稍后重试')
        // Mock data for development
        setFeaturedProducts(mockProducts.slice(0, 8))
        setAllProducts(mockProducts)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="bg-gray-50">
      {/* Banner轮播 */}
      <div className="bg-white">
        <div className="container">
          <div className="aspect-video bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
            {banners.length > 0 ? banners[0].title : '分销商城 - 精选好物'}
          </div>
        </div>
      </div>

      {/* 特色分类 */}
      <div className="bg-white mt-4 py-6">
        <div className="container">
          <h2 className="text-xl font-bold mb-4">热门分类</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {['女装', '男装', '美妆', '食品', '家居', '电器'].map((category, i) => (
              <a key={i} href={`/category/${i + 1}`} className="text-center hover:shadow-lg transition-shadow p-4 rounded-lg">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-400 to-orange-400 rounded-full flex items-center justify-center text-white text-2xl mb-2">
                  🛍️
                </div>
                <p className="font-semibold text-gray-800">{category}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 推荐商品 */}
      <div className="bg-white mt-4 py-6">
        <div className="container">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">精选推荐</h2>
            <a href="#" className="text-red-500 hover:text-red-600 flex items-center">
              更多 <ChevronRight size={20} />
            </a>
          </div>
          {loading ? (
            <div className="text-center py-8">加载中...</div>
          ) : error ? (
            <div className="text-center py-8 text-gray-500">{error}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 全部商品 */}
      <div className="bg-white mt-4 py-6 mb-12">
        <div className="container">
          <h2 className="text-xl font-bold mb-4">全部商品</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Mock data for development
const mockProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `热销商品 ${i + 1} - 高质量好物推荐`,
  price: Math.floor(Math.random() * 500) + 10,
  originalPrice: Math.floor(Math.random() * 800) + 100,
  image: `https://via.placeholder.com/300x300?text=Product+${i + 1}`,
  rating: (Math.random() * 2 + 3).toFixed(1),
  sales: Math.floor(Math.random() * 10000),
  discount: i % 3 === 0 ? `-${Math.floor(Math.random() * 50)}%` : null,
  badge: i % 4 === 0 ? '热卖' : i % 5 === 0 ? '新品' : null,
  affiliateSource: i % 2 === 0 ? '淘宝联盟' : '拼多多'
}))

export default Home
