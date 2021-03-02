'use strict';

export default [
  {
    code: '00',
    message: 'Giao dịch thành công'
  },
  {
    code: '01',
    message: 'Giao dịch đã tồn tại'
  },
  {
    code: '02',
    message: 'Merchant không hợp lệ (kiểm tra lại vnp_TmnCode)'
  },
  {
    code: '03',
    message: 'Dữ liệu gửi sang không đúng định dạng'
  },
  {
    code: '04',
    message: 'Khởi tạo GD không thành công do Website đang bị tạm khóa'
  },
  {
    code: '05',
    message:
      'Giao dịch không thành công do: Quý khách nhập sai mật khẩu quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch'
  },
  {
    code: '13',
    message:
      'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.'
  },
  {
    code: '07',
    message: 'Giao dịch bị nghi ngờ là giao dịch gian lận'
  },
  {
    code: '09',
    message:
      'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.'
  },
  {
    code: '10',
    message:
      'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần'
  },
  {
    code: '11',
    message:
      'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.'
  },
  {
    code: '12',
    message: 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.'
  },
  {
    code: '51',
    message:
      'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.'
  },
  {
    code: '65',
    message:
      'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.'
  },
  {
    code: '08',
    message:
      'Giao dịch không thành công do: Hệ thống Ngân hàng đang bảo trì. Xin quý khách tạm thời không thực hiện giao dịch bằng thẻ/tài khoản của Ngân hàng này.'
  },
  {
    code: '99',
    message: 'Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)'
  }
];
