import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { searchProducts } from '../api/products'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('relevant')

  useEffect(() => {
    if (query) {
      loadSearchResults()
    }
  }, [query, sortBy])

  const loadSearchResults = async () => {
    try {
      setLoading(true)
      const data = await searchProducts(query, sortBy)
      setProducts(data)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search header */}
      <div className="bg-white rounded-lg p-4 mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold">搜索结果: <span className="text-red-500">"{query}"</span></h1>
        <div className="flex gap-2">
          {['relevant', 'price-asc', 'price-desc', 'latest'].map(sort => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`px-4 py-2 rounded text-sm ${
                sortBy === sort
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sort === 'relevant' ? '相关度' : sort === 'price-asc' ? '价格低到高' : sort === 'price-desc' ? '价格高到低' : '最新'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">搜索中...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>没有找到匹配的商品</p>
          <p className="text-sm mt-2">试试其他关键词吧</p>
        </div>
      ) : (
        <>
          <div className="text-gray-600 mb-4">
            找到 <span className="font-bold text-gray-900">{products.length}</span> 个商品
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
