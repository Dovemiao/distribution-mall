import { useState } from 'react'

export default function Sidebar({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedRating, setSelectedRating] = useState(null)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    onFilterChange({ category, priceRange, rating: selectedRating })
  }

  const handleRatingChange = (rating) => {
    setSelectedRating(rating)
    onFilterChange({ category: selectedCategory, priceRange, rating })
  }

  return (
    <aside className="w-48 bg-white rounded-lg p-4 h-fit">
      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b">分类</h3>
        <ul className="space-y-2 text-sm">
          {['电子产品', '衣服鞋帽', '家居日用', '美妆护肤', '食品饮料'].map((cat) => (
            <li key={cat}>
              <label className="flex items-center cursor-pointer hover:text-red-500">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() => handleCategoryChange(cat)}
                  className="mr-2"
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b">价格区间</h3>
        <div className="space-y-2">
          {[
            { label: '0-100元', min: 0, max: 100 },
            { label: '100-500元', min: 100, max: 500 },
            { label: '500-1000元', min: 500, max: 1000 },
            { label: '1000元以上', min: 1000, max: 10000 },
          ].map((range) => (
            <label key={range.label} className="flex items-center cursor-pointer text-sm hover:text-red-500">
              <input
                type="radio"
                name="price"
                onChange={() => {
                  setPriceRange([range.min, range.max])
                  onFilterChange({ category: selectedCategory, priceRange: [range.min, range.max], rating: selectedRating })
                }}
                className="mr-2"
              />
              {range.label}
            </label>
          ))}
        </ul>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b">评分</h3>
        <ul className="space-y-2 text-sm">
          {[5, 4, 3].map((rating) => (
            <li key={rating}>
              <label className="flex items-center cursor-pointer hover:text-red-500">
                <input
                  type="checkbox"
                  checked={selectedRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="mr-2"
                />
                {'⭐'.repeat(rating)} {rating}星及以上
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setSelectedCategory(null)
          setPriceRange([0, 10000])
          setSelectedRating(null)
          onFilterChange({ category: null, priceRange: [0, 10000], rating: null })
        }}
        className="w-full py-2 border border-red-500 text-red-500 rounded text-sm hover:bg-red-50 transition"
      >
        重置筛选
      </button>
    </aside>
  )
}
