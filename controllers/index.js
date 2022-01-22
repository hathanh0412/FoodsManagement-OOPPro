// // console.log(axios);

// function getApiData() {
//   var promise = axios({
//     url: "http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien", //Thuộc tính đường dẫn do Backend quy định
//     method: "GET", //Giao thức Backend quy định

//     responseType: "json", //json: Mặc định
//   });

//   //Định nghĩa TH call API thành công
//   promise.then(function (result) {
//     console.log("result", result.data);

//     //Gọi hàm tạo giao diện
//     renderTable(result.data);
//   });

//   //Định nghĩa TH call API thất bại

//   promise.catch(function (error) {
//     console.log("error", error);
//   });
// }

// getApiData();

// function renderTable(mangSinhVien) {
//   var htmlContent = "";
//   for (var index = 0; index < mangSinhVien.length; index++) {
//     var sinhVien = mangSinhVien[index];

//     htmlContent += `
//     <tr style="width:200px">

//     <td>${sinhVien.maSinhVien}</td>
//     <td>${sinhVien.tenSinhVien}</td>
//     <td>${sinhVien.email}</td>
//     <td>${sinhVien.soDienThoai}</td>
//     <td>${sinhVien.loaiSinhVien}</td>
//     <td>${sinhVien.diemToan}</td>
//     <td>${sinhVien.diemRenLuyen}</td>
//     <td>

//         <button class="btn btn-danger" onclick = "xoaSinhVien('${sinhVien.maSinhVien}')">Xóa</button>
//         <button class="btn btn-primary" onclick ="suaSinhVien('${sinhVien.maSinhVien}')">Sửa</button>

//         </td>

//     </tr>

//     `;
//   }

//   document.querySelector("tbody").innerHTML = htmlContent;
// }

// function suaSinhVien(maSinhVienClick) {
//   console.log("maSinhVienClick", maSinhVienClick);
//   var promise = axios({
//     url:
//       "http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=" +
//       maSinhVienClick,
//     method: "GET",
//   });

//   //Thành công

//   promise.then(function (result) {
//     console.log("result", result);
//     var sinhVien = result.data;

//     //Gán các giá trị làn control phía trên
//     document.querySelector("#maSinhVien").value = sinhVien.maSinhVien;
//     document.querySelector("#tenSinhVien").value = sinhVien.tenSinhVien;
//     document.querySelector("#diemToan").value = sinhVien.diemToan;
//     document.querySelector("#diemLy").value = sinhVien.diemLy;
//     document.querySelector("#diemHoa").value = sinhVien.diemHoa;
//     document.querySelector("#diemRenLuyen").value = sinhVien.diemRenLuyen;
//     document.querySelector("#email").value = sinhVien.email;
//     document.querySelector("#soDienThoai").value = sinhVien.soDienThoai;
//   });

//   //Thất bại

//   promise.catch("error", error);
//   console.log("error", error.response?.data);
// }

// //Xóa sinh viên

// function xoaSinhVien(maSinhVienClick) {
//   console.log("maSinhVien", maSinhVienClick);

//   var promise = axios({
//     url:
//       "http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=0" + 
//       maSinhVienClick,
//     method: "DELETE",
//   });

//   //Thành công
//   promise.then (function (result) {

//     console.log('result', result);
//   })

//   //Thất bại

//   promise.catch(function (error) {

//     console.log('error', error.response?.data)
//   }
//   )}

// //Cập nhật Sinh vien

// document.querySelector("#btnCapNhatThongTin").onclick = function () {
//   //Lấy thông tin từ người dùng nhập input
//   var sinhVien = new SinhVien();
//   sinhVien.maSinhVien = document.querySelector("#maSinhVien").value;
//   sinhVien.tenSinhVien = document.querySelector("#tenSinhVien").value;
//   sinhVien.loaiSinhVien = document.querySelector("#loaiSinhVien").value;
//   sinhVien.email = document.querySelector("#email").value;
//   sinhVien.soDienThoai = document.querySelector("#soDienThoai").value;
//   sinhVien.diemToan = document.querySelector("#diemToan").value;
//   sinhVien.diemLy = document.querySelector("#diemLy").value;
//   sinhVien.diemHoa = document.querySelector("#diemHoa").value;
//   console.log("sinhVien", sinhVien);

//   //Gọi api cập nhật
//   var promise = axios({
//     url:
//       "http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=" +
//       sinhVien.maSinhVien,
//     method: "PUT",
//     data: sinhVien,
//   });
// };

// //Thêm sinh viên

// document.querySelector("#btnThemSinhVien").onclick = function () {
//   //Lấy thông tin người dùng nhập vào

//   var sinhVien = new SinhVien();

//   sinhVien.maSinhVien = document.querySelector("#maSinhVien").value;
//   sinhVien.tenSinhVien = document.querySelector("#tenSinhVien").value;
//   sinhVien.loaiSinhVien = document.querySelector("#loaiSinhVien").value;
//   sinhVien.email = document.querySelector("#email").value;
//   sinhVien.soDienThoai = document.querySelector("#soDienThoai").value;
//   sinhVien.diemToan = document.querySelector("#diemToan").value;
//   sinhVien.diemLy = document.querySelector("#diemLy").value;
//   sinhVien.diemHoa = document.querySelector("#diemHoa").value;
//   sinhVien.maSinhVien = document.querySelector("#maSinhVien").disabled = true;

//   console.log("sinhVien", sinhVien);

//   //Dùng axios gọi api (request url backend)

//   var promise = axios({
//     url: "http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien",
//     method: "POST",
//     data: sinhVien, // {"maSinhVien":1, "tenSinhVien":"sideptrai"}
//   });

//   //Thành công

//   promise.then(function (result) {
//     console.log("result", result.data);
//     var sinhVien = result.data;

//     //Gán các giá trị làn control phía trên
//     document.querySelector("#maSinhVien").value = sinhVien.maSinhVien;
//     document.querySelector("#tenSinhVien").value = sinhVien.tenSinhVien;
//     document.querySelector("#diemToan").value = sinhVien.diemToan;
//     document.querySelector("#diemLy").value = sinhVien.diemLy;
//     document.querySelector("#diemHoa").value = sinhVien.diemHoa;
//     document.querySelector("#diemRenLuyen").value = sinhVien.diemRenLuyen;
//     document.querySelector("#email").value = sinhVien.email;
//     document.querySelector("#soDienThoai").value = sinhVien.soDienThoai;

//     //Thành công thì load lại table

//     getApiData();
//   });

//   //Thất bại
//   promise.catch(function (error) {
//     console.log("error", error.response?.data); //Cách in ra error (nếu báo lỗi)
//   });
// };
