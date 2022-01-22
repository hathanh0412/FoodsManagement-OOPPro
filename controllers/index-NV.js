// console.log(axios);

//Tạo biến kiểm tra
var kiemTra = Validation();

//Gọi data từ server
function getApiData() {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
    method: "GET",
    responseType: "json",
  });

  //Call thành công
  promise.then(function (result) {
    console.log("result", result.data);
  });

  //Call thất bại

  promise.catch(function (error) {
    console.log("error", error);
  });
}

getApiData();

//Tạo bảng

function renderTable(mangNhanVien) {
  var tableNhanVien = "";
  for (var index = 0; index < mangNhanVien.length; index++) {
    var nhanVien = mangNhanVien[index];
    tableNhanVien += `
    <tr>
          <td>${nhanVien.maNhanVien}</td>
          <td>${nhanVien.tenNhanVien}</td>
          <td>${nhanVien.chucVu}</td>
          <td>${nhanVien.heSoChucVu}</td>
          <td>${nhanVien.luongCoBan}</td>
          <td>${nhanVien.soGioLamTrongThang}</td>
          <td>
              <button class = "btn btn-danger" onclick ="xoaNhanVien('${nhanVien.maNhanVien}')">Xóa</button>
              <button class = "btn btn-primary" onclick ="chinhSuaNhanVien('${nhanVien.maNhanVien}')">Chỉnh sửa</button>
          </td>
    </tr>
    `;
  }
  document.querySelector("tblNhanVien").innerHTML = tableNhanVien;
}

//Thêm nhân viên
document.querySelector("#btnThemNhanVien").onclick = function () {
  var nhanVien = new NhanVien();
  var selectorChucVu = document.getElementById("chucVu");
  var arrTagChucVu = selectorChucVu.option;
  var indexOptionSelected = selectorChucVu.selectedIndex;
  nhanVien.chucVu = arrTagChucVu[indexOptionSelected].innerHTML;

  nhanVien.maNhanVien = document.querySelector("#maNhanVien").value;
  nhanVien.tenNhanVien = document.querySelector("#tenNhanVien").value;
  nhanVien.chucVu = document.querySelector("#chucVu").value;
  nhanVien.luongCoBan = document.querySelector("#luongCoBan").value;
  nhanVien.soGioLamTrongThang = document.querySelector(
    "#soGioLamTrongThang"
  ).value;

  // console.log("nhanVien", nhanVien);

  //Kiểm tra hợp lệ
  var valid = true;
  //KT rỗng
  valid &=
    kiemTra.kiemTraRong(
      nhanVien.maNhanVien,
      "#error_required_maNhanVien",
      "Mã nhân viên"
    ) &
    (nhanVien.tenNhanVien, "#error_required_tenNhanVien", "Tên nhân viên") &
    (nhanVien.luongCoBan, "#error_required_luongCoBan", "Lương cơ bản") &
    (nhanVien.soGioLamTrongThang,
    "#error_required_soGioLamTrongThang",
    "Số giờ làm");

  //Kiểm tra ký tự
  valid &= kiemTra.kiemTraKyTu(
    nhanVien.tenNhanVien,
    "error_allLetter_tenNhanVien",
    "Tên nhân viên"
  );
  //Kiểm tra độ dài
  valid &= kiemTra.kiemTraDoDai(
    nhanVien.maNhanVien,
    "#error_required_maNhanVien",
    4,
    6,
    "Mã nhân viên"
  );
  //Kiểm tra giá trị
  valid &= kiemTra.kiemTraGiaTri(
    nhanVien.luongCoBan,
    "#error_required_luongCoBan",
    1000000,
    20000000,
    "Lương cơ bản"
  );
  valid &= kiemTra.kiemTraGiaTri(
    nhanVien.soGioLamTrongThang,
    "#error_required_soGioLamTrongThang",
    50,
    150,
    "Số giờ làm"
  );

  //Xử lý
  if (!value) {
    return;
  }

  //Gọi axios

  var promise = axios({
    url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
    method: "POST",
    responseType: "json",
    data: nhanVien
  });

  //Call thành công
  promise.then(function (result) {
    console.log(result.data);
  });
  getApiData();

  //Call thất bại
  promise.catch(function (error) {
    console.log("error", error);
  });

  clearInput();
};

//Xóa nhân viên
function xoaNhanVien(maNhanVien) {
  var promise = axios({
    url:
      "http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maNhanVien" +
      maNhanVien,
    method: "DELETE",
  });

  //Call thành công
  promise.then(function (result) {
    console.log("result", result.data);
  });

  //Call thất bại
  promise.catch(function (error) {
    console.log("error", error);
  });
}

//Sửa nhân viên

function chinhSuaNhanVien(maNhanVien) {
  var promise = axios({
    url:
      "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien" +
      maNhanVien,
    method: "GET",
    data: nhanVien,
  });

  //Call thành công
  promise.then(function (result) {
    var nhanVien = result.data;
    document.querySelector("#maNhanVien").value = nhanVien.maNhanVien;
    document.querySelector("#tenNhanVien").value = nhanVien.tenNhanVien;
    document.querySelector("#chucVu").value = nhanVien.chucVu;
    document.querySelector("#luongCoBan").value = nhanVien.luongCoBan;
    document.querySelector("#soGioLamTrongThang").value =
      nhanVien.soGioLamTrongThang;

    document.querySelector("#maNhanVien").disabled = true;
  });

  //Call thất bại
  promise.catch(function (error) {
    console.log("error", error);
  });
}

//Cập nhật thông tin nv

document.querySelector("#btnCapNhat").onclick = function () {
  var nhanVien = new NhanVien();
  var selectorChucVu = document.getElementById("chucVu");
  var arrTagChucVu = selectorChucVu.option;
  var indexOptionSelect = arrTagChucVu[indexOptionSelected].innerHTML;
  nhanVien.maNhanVien = document.querySelector("#maNhanVien").value;
  nhanVien.tenNhanVien = document.querySelector("#tenNhanVien").value;
  nhanVien.chucVu = document.querySelector("#chucVu").value;
  nhanVien.soGioLamTrongThang = document.querySelector(
    "#soGioLamTrongThang"
  ).value;

  //Kiểm tra hợp lệ
  var valid = true;
  //KT rỗng
  valid &=
    kiemTra.kiemTraRong(
      nhanVien.maNhanVien,
      "#error_required_maNhanVien",
      "Mã nhân viên"
    ) &
    (nhanVien.tenNhanVien, "#error_required_tenNhanVien", "Tên nhân viên") &
    (nhanVien.luongCoBan, "#error_required_luongCoBan", "Lương cơ bản") &
    (nhanVien.soGioLamTrongThang,
    "#error_required_soGioLamTrongThang",
    "Số giờ làm");

  //Kiểm tra ký tự
  valid &= kiemTra.kiemTraKyTu(
    nhanVien.tenNhanVien,
    "error_allLetter_tenNhanVien",
    "Tên nhân viên"
  );
  //Kiểm tra độ dài
  valid &= kiemTra.kiemTraDoDai(
    nhanVien.maNhanVien,
    "#error_required_maNhanVien",
    4,
    6,
    "Mã nhân viên"
  );
  //Kiểm tra giá trị
  valid &= kiemTra.kiemTraGiaTri(
    nhanVien.luongCoBan,
    "#error_required_luongCoBan",
    1000000,
    20000000,
    "Lương cơ bản"
  );
  valid &= kiemTra.kiemTraGiaTri(
    nhanVien.soGioLamTrongThang,
    "#error_required_soGioLamTrongThang",
    50,
    150,
    "Số giờ làm"
  );

  //Xử lý
  if (!value) {
    return;
  }
};

//gọi Api
var promise = axios({
  url:
    "http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien" +
    nhanVien.maNhanVien,
  method: "PUT",
  data: nhanVien,
});

//Call thành công
promise.then(function (result) {
  getApiData();
  clearInput();
});

//Call thất bại
promise.catch(function (error) {
  console.log("error", error);
});

//Clear input

function clearInput(){
  document.querySelector('#maNhanVien').value = '';
  document.querySelector('#tenNhanVien').value = '';
  document.querySelector('#chucVu').value = '';
  document.querySelector('#luongCoBan').value = '';
  document.querySelector('#soGioLamTrongThang').value = '';
  document.querySelector('#maNhanVien').disabled = false;

  document.querySelector('#btnThemNhanVien').disabled = false;
  
}
