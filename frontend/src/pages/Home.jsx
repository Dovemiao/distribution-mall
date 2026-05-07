import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import Sidebar from '../components/Sidebar'
import { fetchProducts } from '../api/products'

export default function Home() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await fetchProducts()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filters) => {
    let filtered = products

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    if (filters.priceRange) {
      filtered = filtered.filter(
        p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      )
    }

    if (filters.rating) {
      filtered = filtered.filter(p => p.rating >= filters.rating)
    }

    setFilteredProducts(filtered)
  }

  if (loading) {
    return <div className="text-center py-12">加载中...</div>
  }

  return (
    <div className="flex gap-6">
      <Sidebar onFilterChange={handleFilterChange} />
      <div className="flex-1">
        {/* Banner */}
        <div className="bg-red-500 text-white rounded-lg p-8 mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">精选好物，优惠推荐</h1>
          <p>精选来自淘宝、拼多多的优质商品，每天更新</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            没有找到匹配的商品
          </div>
        )}
      </div>
    </div>
  )
}
