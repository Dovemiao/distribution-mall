import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { fetchProductsByCategory } from '../api/products'

const CATEGORIES = {
  '1': { name: '电子产品', emoji: '📱' },
  '2': { name: '衣服鞋帽', emoji: '👕' },
  '3': { name: '家居日用', emoji: '🏠' },
  '4': { name: '美妆护肤', emoji: '💄' },
  '5': { name: '食品饮料', emoji: '🍔' },
}

export default function Category() {
  const { id } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const category = CATEGORIES[id] || { name: '未知分类', emoji: '❓' }

  useEffect(() => {
    loadCategory()
  }, [id])

  const loadCategory = async () => {
    try {
      setLoading(true)
      const data = await fetchProductsByCategory(id)
      setProducts(data)
    } catch (error) {
      console.error('Failed to load category:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Category header */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">{category.emoji} {category.name}</h1>
        <p className="text-gray-600">共 {products.length} 个商品</p>
      </div>

      {loading ? (
        <div className="text-center py-12">加载中...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">该分类暂无商品</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
