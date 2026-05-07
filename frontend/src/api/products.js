const API_BASE = process.env.REACT_APP_API_URL || '/api'

// Mock data for development
const mockProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 8999,
    originalPrice: 9999,
    image: 'https://via.placeholder.com/300x300?text=iPhone+15',
    category: '电子产品',
    tag: 'taobao',
    rating: 4.8,
    reviews: 1250,
    description: '苹果旗舰手机，A17 Pro芯片，钛金属设计',
    specs: {
      '屏幕': '6.7英寸',
      '处理器': 'A17 Pro',
      '内存': '8GB',
      '存储': '256GB/512GB/1TB',
      '颜色': '黑色/白色/金色/蓝色',
    },
    affiliateLink: 'https://taobao.com/item/1234567',
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5 无线耳机',
    price: 2399,
    originalPrice: 2999,
    image: 'https://via.placeholder.com/300x300?text=Sony+Headphones',
    category: '电子产品',
    tag: 'pinduoduo',
    rating: 4.7,
    reviews: 856,
    description: '业界领先的降噪技术，32小时续航',
    affiliateLink: 'https://pinduoduo.com/item/1234567',
  },
  {
    id: 3,
    name: 'UNIQLO 羊毛衣',
    price: 199,
    originalPrice: 299,
    image: 'https://via.placeholder.com/300x300?text=Sweater',
    category: '衣服鞋帽',
    tag: 'taobao',
    rating: 4.6,
    reviews: 542,
    description: '100% 纯羊毛，舒适透气',
    affiliateLink: 'https://taobao.com/item/1234567',
  },
  {
    id: 4,
    name: 'Dyson V15 吸尘器',
    price: 4999,
    originalPrice: 5999,
    image: 'https://via.placeholder.com/300x300?text=Dyson',
    category: '家居日用',
    tag: 'taobao',
    rating: 4.9,
    reviews: 1024,
    description: '无绳高效吸尘，激光检测灰尘',
    affiliateLink: 'https://taobao.com/item/1234567',
  },
  {
    id: 5,
    name: 'SK-II 仙人水',
    price: 1299,
    originalPrice: 1599,
    image: 'https://via.placeholder.com/300x300?text=SK2',
    category: '美妆护肤',
    tag: 'pinduoduo',
    rating: 4.8,
    reviews: 2156,
    description: '日本原装进口，明星护肤品',
    affiliateLink: 'https://pinduoduo.com/item/1234567',
  },
  {
    id: 6,
    name: '澳洲进口牛奶',
    price: 39.9,
    originalPrice: 49.9,
    image: 'https://via.placeholder.com/300x300?text=Milk',
    category: '食品饮料',
    tag: 'taobao',
    rating: 4.7,
    reviews: 3254,
    description: '全脂纯牛奶，1L装',
    affiliateLink: 'https://taobao.com/item/1234567',
  },
]

export async function fetchProducts(page = 1, limit = 20) {
  try {
    // In production, call real API
    // const response = await fetch(`${API_BASE}/products?page=${page}&limit=${limit}`)
    // return response.json()
    
    // For development, return mock data
    return mockProducts
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return mockProducts
  }
}

export async function fetchProduct(id) {
  try {
    // const response = await fetch(`${API_BASE}/products/${id}`)
    // return response.json()
    return mockProducts.find(p => p.id === parseInt(id)) || mockProducts[0]
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return mockProducts[0]
  }
}

export async function fetchProductsByCategory(categoryId) {
  try {
    // const response = await fetch(`${API_BASE}/categories/${categoryId}/products`)
    // return response.json()
    const categoryMap = {
      '1': '电子产品',
      '2': '衣服鞋帽',
      '3': '家居日用',
      '4': '美妆护肤',
      '5': '食品饮料',
    }
    const category = categoryMap[categoryId]
    return mockProducts.filter(p => p.category === category)
  } catch (error) {
    console.error('Failed to fetch category products:', error)
    return []
  }
}

export async function searchProducts(query, sortBy = 'relevant') {
  try {
    // const response = await fetch(`${API_BASE}/search?q=${query}&sort=${sortBy}`)
    // return response.json()
    let results = mockProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    )

    if (sortBy === 'price-asc') {
      results.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      results.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'latest') {
      results.sort((a, b) => b.id - a.id)
    }

    return results
  } catch (error) {
    console.error('Failed to search products:', error)
    return []
  }
}
