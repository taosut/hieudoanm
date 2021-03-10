'use strict';

interface IEthnicMinority {
  name: string;
  type: string;
  type_en: string;
}

const ethnicMInorities: Array<IEthnicMinority> = [
  { name: 'Kinh', type: 'Việt - Mường', type_en: 'Vietic' },
  { name: 'Chứt', type: 'Việt - Mường', type_en: 'Vietic' },
  { name: 'Mường', type: 'Việt - Mường', type_en: 'Vietic' },
  { name: 'Thổ', type: 'Việt - Mường', type_en: 'Vietic' },
  { name: 'Ba Na', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Brâu', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Bru', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Chơ Ro', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Co', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Cờ Ho', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Cơ Tu', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Giẻ Triêng', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Hrê', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Kháng', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Khmer', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Khơ Mú', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Mạ', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Mảng', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Mnông', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Ơ Đu', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Rơ Măm', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Tà Ôi', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Xinh Mun', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Xơ Đăng', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'X’Tiêng', type: 'Môn - Khmer', type_en: 'Austroasiatic' },
  { name: 'Bố Y', type: 'Tày - Thái', type_en: 'Tai-Kadai (Tai)' },
  { name: 'Giáy', type: 'Tày - Thái', type_en: 'Tai-Kadai (Tai)' },
  { name: 'Lào', type: 'Tày - Thái', type_en: 'Tai-Kadai (Tai)' },
  { name: 'Lự', type: 'Tày - Thái', type_en: 'Tai-Kadai (Tai)' },
  { name: 'Nùng', type: 'Tày - Thái', type_en: 'Tai-Kadai (Tai)' },
  { name: 'Sán Chay', type: 'Tày - Thái', type_en: 'Tai-Kadai (Tai)' },
  { name: 'Tày', type: 'Tày - Thái', type_en: 'Tai-Kadai (Tai)' },
  { name: 'Thái', type: 'Tày - Thái', type_en: 'Tai-Kadai (Tai)' },
  { name: 'Cờ Lao', type: 'Kadai', type_en: 'Tai-Kadai (Kra)' },
  { name: 'La Chí', type: 'Kadai', type_en: 'Tai-Kadai (Kra)' },
  { name: 'La Ha', type: 'Kadai', type_en: 'Tai-Kadai (Kra)' },
  { name: 'Pu Péo', type: 'Kadai', type_en: 'Tai-Kadai (Kra)' },
  { name: 'Dao', type: "H'Mông - Dao", type_en: 'Hmong-Mien' },
  { name: 'Hmong', type: "H'Mông - Dao", type_en: 'Hmong-Mien' },
  { name: 'Pà Thẻn', type: "H'Mông - Dao", type_en: 'Hmong-Mien' },
  { name: 'Chăm', type: 'Nam đảo', type_en: 'Malayo-Polynesian' },
  { name: 'Chu Ru', type: 'Nam đảo', type_en: 'Malayo-Polynesian' },
  { name: 'Ê Đê', type: 'Nam đảo', type_en: 'Malayo-Polynesian' },
  { name: 'Gia Rai', type: 'Nam đảo', type_en: 'Malayo-Polynesian' },
  { name: 'Ra Glai', type: 'Nam đảo', type_en: 'Malayo-Polynesian' },
  { name: 'Hoa', type: 'Hán', type_en: 'Chinese' },
  { name: 'Ngái', type: 'Hán', type_en: 'Chinese' },
  { name: 'Sán Dìu', type: 'Hán', type_en: 'Chinese' },
  { name: 'Phunoi', type: 'Tạng-Miến', type_en: 'Sino-Tibetan' },
  { name: 'Hà Nhì', type: 'Tạng-Miến', type_en: 'Sino-Tibetan' },
  { name: 'La Hủ', type: 'Tạng-Miến', type_en: 'Sino-Tibetan' },
  { name: 'Lô Lô', type: 'Tạng-Miến', type_en: 'Sino-Tibetan' },
  { name: 'Phù Lá', type: 'Tạng-Miến', type_en: 'Sino-Tibetan' },
  { name: 'Si La', type: 'Tạng-Miến', type_en: 'Sino-Tibetan' }
];

export default ethnicMInorities;
