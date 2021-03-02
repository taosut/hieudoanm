# ZaloPay (formerly 123pay)

A Node.js API Wrapper Library for [ZaloPay](https://zalopay.vn/)

If you've found an bug/issue, please [send me an email](mailto:hieumdoan@gmail.com).

- [ZaloPay (formerly 123pay)](#zalopay-formerly-123pay)
  - [Installation](#installation)
  - [Usage](#usage)

## Installation

```sh
npm install zalopay
# OR
yarn add zalopay
```

## Usage

[Full Documentation](https://docs.zalopay.vn/)

```ts
import ZaloPay from 'zalopay';

const configs = {
  app_id: '',
  key1: '',
  key2: ''
};

const zalopay: ZaloPay = new ZaloPay(configs);

// Get Banks
const banks: any = zalopay.getListMerchantBanks();
// [
//   {
//     bankcode: 'NASB',
//     name: 'BAC A BANK',
//     displayorder: 0,
//     pmcid: 39,
//     minamount: 10000,
//     maxamount: 250000000
//   },...
// ]

// Create Transaction
const items = [
  {
    itemid: '',
    itemname: '',
    itemprice: 1000,
    itemquantity: 1
  }
];
const transaction = {
  /**
   * Required
   */
  app_user: 'demo',
  amount: 50000,
  items,
  bankcode: 'zalopayapp',
  description: 'ZaloPay Integration Demo',
  order_type: 'GOODS', // Loại đơn hàng:GOODS, TRANSPORTATION, HOTEL, FOOD, TELCARD, BILLING. Mặc định là GOODS.
  /**
   * Embed Data (Optional)
   */
  redirecturl: '', // Redirect về url này sau khi thanh toán trên cổng ZaloPay (override redirect url lúc đăng ký app với ZaloPay)
  columninfo: {}, // Thêm thông tin hiển thị ở phần Quản lý giao dịch chi tiết trên Merchant site, nếu cột chưa tồn tại cần vào phần Cài đặt hiển thị dữ liệu để cấu hình
  campaigncode: '', // Dùng để triển khai chương trình khuyến mãi
  zlppaymentid: '', // Mã thông tin thanh toán
  /**
   * Optional
   */
  callback_url: '', // Zalopay sẽ thông báo trạng thái thanh toán của đơn hàng khi thanh toán hoàn tất; callback_url được gọi để thông báo kết quả thanh toán thất bại hoặc thành công. Nếu không được cung cấp, callback_url mặc định của ứng dụng sẽ được sử dụng.
  product_code: '', // Loại API mà đối tác sử dụng: ESCROW, QR, DIRECT, AGREEMENT
  device_info: {}, // Chuỗi JSON mô tả thông tin của thiết bị
  title: '', // Tiêu đề đơn hàng.
  phone: '', // Số điện thoại của người dùng
  email: '', // Email của người dùng
  address: '' // Địa chỉ của người dùng
};
const data: any = await zalopay.createTransaction(transaction);
// {
//   return_code: 1
//   return_message: '', // Mô tả chi tiết thông tin mã lỗi
//   sub_return_code: 1,
//   sub_return_message: '',
//   order_url: '', // Dùng để tạo QR code hoặc gọi chuyển tiếp sang trang cổng ZaloPay
//   app_trans_id: '' // Dùng để truy vấn trạng thái thanh toán của đơn hàng
// }

// Handle callback_url
app.post('/callback_url', (req, res) => {
  const data = zalopay.handleCallback(req.body);
  res.json(data); // { 'code': '', 'message': '' }
});


// Get Transaction Status
const app_trans_id: string = '';
const data: any = await zalopay.getTransactionStatus(app_trans_id);
// {
//   return_code: 1,
//   return_message: '', // Thông tin trạng thái đơn hàng
//   sub_return_code: 1,
//   sub_return_message: '',
//   is_processing: true,
//   amount: 123, // Số tiền ứng dụng nhận được (chỉ có ý nghĩa khi thanh toán thành công)
//   zp_trans_id: // Mã giao dịch của ZaloPay
// }

// Refund
const zp_trans_id: string = '';
const amount: number = 0;
const description: string = ''; // optional
const data: any = await zalopay.refund(zp_trans_id, amount, description);
// {
//   return_code: 1,
//   return_message: '', // Thông tin trạng thái đơn hàng
//   sub_return_code: 1,
//   sub_return_message: '',
//   refund_id: '' // Mã giao dịch hoàn tiền của ZaloPay, cần lưu lại để đối chiếu
// }

// Get Refund Status
const m_refund_id: string = '';
const data: any = await zalopay.getRefundStatus(m_refund_id);
// {
//   return_code: 1,
//   return_message: '', // Thông tin trạng thái đơn hàng
//   sub_return_code: 1,
//   sub_return_message: '',
// }
```
