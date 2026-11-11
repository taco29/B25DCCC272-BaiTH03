# Phàm Trần Các (shop-mini)

Ứng dụng bán hàng mẫu viết bằng React 18 + TypeScript + Vite, dùng React Router, Redux Toolkit và React Context.

## Chạy dự án

```bash
npm install
npm run dev      # chạy môi trường phát triển
npm run build    # kiểm tra kiểu + build production
```

Đăng nhập thử nghiệm: tên bất kỳ, mật khẩu `123456`. Dữ liệu sản phẩm lấy từ `https://fakestoreapi.com/products`.

## Quản lý state: dữ liệu nào để ở đâu

Nguyên tắc chọn: **dữ liệu chỉ một component dùng thì để `useState`; dữ liệu cần dùng ở nhiều nơi nhưng ít thay đổi thì để Context; dữ liệu nghiệp vụ dùng chung, đổi thường xuyên hoặc có logic phức tạp (async, tính toán) thì để Redux.**

### 1. `useState` — state cục bộ của một component

| Dữ liệu | File | Lý do |
|---|---|---|
| `query` (từ khoá tìm kiếm) | [HomePage.tsx](src/pages/HomePage.tsx) | Chỉ trang chủ dùng để lọc danh sách. Không cần chia sẻ, mất khi rời trang cũng không sao. Danh sách đã lọc được tính từ `items` + `query` nên không lưu thêm. |
| `username`, `password`, `error` (form đăng nhập) | [LoginPage.tsx](src/pages/LoginPage.tsx) | Giá trị đang nhập chỉ có ý nghĩa trong form. Mật khẩu càng không nên đưa vào store toàn cục. |
| `placed` (đã đặt hàng xong chưa) | [CheckoutPage.tsx](src/pages/CheckoutPage.tsx) | Chỉ dùng để chuyển giữa form và màn hình thành công của trang này. |

Lý do chung: state cục bộ đơn giản, không gây re-render các component không liên quan, và được dọn đi cùng component.

### 2. React Context — dữ liệu toàn cục, ít thay đổi

| Dữ liệu | File | Lý do |
|---|---|---|
| `theme` (sáng/tối) và `toggleTheme` | [ThemeContext.tsx](src/contexts/ThemeContext.tsx) | Header, layout và CSS đều cần biết theme, nhưng chỉ đổi khi người dùng bấm nút. Là cấu hình giao diện, không phải dữ liệu nghiệp vụ nên không cần Redux. Lưu `localStorage` (khoá `theme`) để nhớ lựa chọn. |
| `user`, `login`, `logout` | [AuthContext.tsx](src/contexts/AuthContext.tsx) | Header (hiển thị tên, nút đăng xuất) và route bảo vệ cần dùng chung, nhưng thay đổi rất hiếm (chỉ khi đăng nhập/đăng xuất). Lưu `localStorage` (khoá `shopmini-user`) để giữ phiên sau khi tải lại trang. |

Lý do chung: Context đủ để tránh truyền props qua nhiều tầng, và vì giá trị ít đổi nên không lo re-render nhiều. Mỗi context có hook riêng (`useTheme`, `useAuth`) và báo lỗi nếu dùng ngoài Provider.

### 3. Redux Toolkit — dữ liệu nghiệp vụ dùng chung

| Dữ liệu | File | Lý do |
|---|---|---|
| `products`: `items`, `status`, `error` | [productsSlice.ts](src/features/products/productsSlice.ts) | Danh sách sản phẩm được trang chủ và trang chi tiết cùng đọc; tải một lần rồi dùng lại, không gọi API lại khi chuyển trang. Dùng `createAsyncThunk` để quản lý vòng đời `pending / fulfilled / rejected` (loading, lỗi, thử lại) ở một chỗ. |
| `cart.items` (kèm số lượng) | [cartSlice.ts](src/features/cart/cartSlice.ts) | Giỏ hàng bị nhiều nơi đọc và ghi: nút "Thu nhập" ở thẻ sản phẩm, trang chi tiết, trang giỏ hàng, huy hiệu số lượng ở Header, trang thanh toán (xoá giỏ sau khi đặt). Có nhiều thao tác (thêm, xoá, đổi số lượng, xoá hết) nên reducer tập trung dễ kiểm soát và dễ debug bằng Redux DevTools. |

Dữ liệu dẫn xuất **không lưu trong store** mà tính bằng selector (`selectCartCount`, `selectCartTotal`), để tránh lưu trùng và lệch dữ liệu.

## Tóm tắt nhanh

| Câu hỏi | Chọn |
|---|---|
| Chỉ một component/trang dùng? | `useState` |
| Nhiều nơi dùng, là cấu hình/phiên, ít đổi? | Context |
| Nhiều nơi đọc/ghi, nhiều thao tác, có async hoặc tính toán dẫn xuất? | Redux |

## Cấu trúc thư mục

```
src/
├─ app/         store, typed hooks của Redux
├─ components/  Header, ProductCard...
├─ contexts/    ThemeContext, AuthContext
├─ features/    cart, products (slice Redux)
├─ layouts/     MainLayout
├─ pages/       Home, ProductDetail, Cart, Checkout, Login, NotFound
└─ types/       kiểu dùng chung
```
