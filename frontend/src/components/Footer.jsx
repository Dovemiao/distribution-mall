function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
      <div className="container">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">帮助中心</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">联系我们</a></li>
              <li><a href="#" className="hover:text-white">常见问题</a></li>
              <li><a href="#" className="hover:text-white">售后服务</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">关于我们</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">公司介绍</a></li>
              <li><a href="#" className="hover:text-white">加入我们</a></li>
              <li><a href="#" className="hover:text-white">社会责任</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">推广合作</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">淘宝联盟</a></li>
              <li><a href="#" className="hover:text-white">拼多多推广</a></li>
              <li><a href="#" className="hover:text-white">合作申请</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">关注我们</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">微博</a></li>
              <li><a href="#" className="hover:text-white">微信</a></li>
              <li><a href="#" className="hover:text-white">抖音</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2024 分销商城. All rights reserved.</p>
          <p className="mt-2">淘宝联盟 | 拼多多推广合作</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
