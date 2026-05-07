import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'

function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResults(Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `${query} - 搜索结果 ${i + 1}`,
        price: Math.floor(Math.random() * 500) + 10,
        originalPrice: Math.floor(Math.random() * 800) + 100,
        image: `https://via.placeholder.com/300x300?text=Search+${i + 1}`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        sales: Math.floor(Math.random() * 10000),
      })))
      setLoading(false)
    }, 500)
  }, [query])

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">搜索结果: "{query}"</h1>
      
      {loading ? (
        <div className="text-center py-12">搜索中...</div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-4">未找到相关商品</p>
          <p className="text-sm">请尝试其他关键词</p>
        </div>
      )}
    </div>
  )
}

export default Search
