import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProducts } from '../features/products/productsSlice'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.products)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (status === 'idle') void dispatch(fetchProducts())
  }, [dispatch, status])

  const filteredProducts = useMemo(
    () => items.filter((product) => product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())),
    [items, query],
  )

  return (
    <section>
      <div className="hero">
        <div><p className="eyebrow">PHÀM TRẦN BẢO VẬT</p><h1>Vạn vật hữu linh, kỳ trân dị bảo hội tụ.</h1><p>Khám phá muôn vàn pháp khí, linh vật được tuyển chọn, trợ đạo hữu trên con đường tu tiên đại đạo.</p></div>
      </div>
      <div className="catalogue-heading">
        <div><h2>Tân phẩm xuất thế</h2><p>{items.length} bảo vật đang chờ hữu duyên</p></div>
        <label className="search"><span>Tầm bảo</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nhập tên bảo vật..." /></label>
      </div>
      {status === 'loading' && <p className="state-message">Đang triệu hồi bảo vật...</p>}
      {status === 'failed' && <div className="state-message error"><p>{error}</p><button onClick={() => void dispatch(fetchProducts())}>Thi triển lại</button></div>}
      {status === 'succeeded' && (filteredProducts.length > 0 ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="state-message">Không tìm thấy bảo vật hữu duyên.</p>)}
    </section>
  )
}
