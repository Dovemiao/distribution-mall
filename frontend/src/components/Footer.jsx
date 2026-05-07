export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container py-8">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">分销商城</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">关于我们</a></li>
              <li><a href="#" className="hover:text-white">联系我们</a></li>
              <li><a href="#" className="hover:text-white">招聘信息</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">服务中心</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">售后保障</a></li>
              <li><a href="#" className="hover:text-white">配送说明</a></li>
              <li><a href="#" className="hover:text-white">发票说明</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">联盟推广</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">淘宝联盟</a></li>
              <li><a href="#" className="hover:text-white">拼多多</a></li>
              <li><a href="#" className="hover:text-white">分销指南</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">关注我们</h3>
            <div className="space-y-2 text-sm">
              <p>微信: xxx</p>
              <p>QQ: xxx</p>
              <p>微博: xxx</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2026 分销商城 All Rights Reserved</p>
          <p className="mt-2">ICP备案号: xxxxx</p>
        </div>
      </div>
    </footer>
  )
}
