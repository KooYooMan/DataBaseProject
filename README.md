# Website tạo thời khóa biểu cho sinh viên UET
## Lớp Cơ sở dữ liệu INT2207 1 - Thầy Lê Hồng Hải
## Thành viên đóng góp
  * Cao Duy Mạnh - 18020039
  * Vương Tiến Thành - 18021186
  * Lê Thị Hạnh - 18020457
  * Lê Quang Duy - 18020413
### 1. Chức năng trang web
  * Tạo, sửa đổi và tra cứu thời khóa biểu, lịch bằng mã lớp học cho sinh viên
  * Tra cứu lịch dạy của giảng viên
### 2. Cơ sở dữ liệu
  * Sơ đồ ER
  ![ER](https://i.imgur.com/h4R0eEV.png)

  * Cơ sở dữ liệu
  ![ERD](https://i.imgur.com/fObau4b.png)
### 3. Truy vấn cơ sở dữ liệu
* Giảng viên
  * Lấy toàn bộ danh sách giảng viên
  ~~~
  select lecturerName from lecturers
  ~~~
  * Lấy lịch dạy cho giảng viên theo tên
  ~~~
  select s.*
    from schedules as s
    join lecturers as l on l.lecturerID = s.lecturerID
    where l.lecturerName = "${lecturerName}"
  ~~~
* Học sinh
  * Lấy thời khóa biểu theo mã sinh viên
  ~~~
  select s.*
  from schedules as s
  join enrolllist as e on s.classID = e.classID and s.`group` = e.`group`\n"
  where e.studentID = "${studentID}"
  ~~~
  * Xóa danh sách lớp học đã đăng ký theo mã sinh viên
  ~~~
  delete from enrolllist where studentID=${studentID}
  ~~~
  * Nhập danh sách lớp học đã đăng ký
  ~~~
  const submitEnrollList = (studentID, enrollList, callback) => {
  let query = "insert into enrolllist values\n";

  enrollList.forEach(({ classID, group }) => {
    query += `("${studentID}", "${classID}", "${group}"),`;
  });
  query = query.substr(0, query.length - 1);
  query += ";";

  db().query(query, callback);
  };
  ~~~
  * Lấy lịch thi theo mã sinh viên
  ~~~
  select distinct es.*
  from examschedule as es
  join enrolllist as e on es.classID = e.classID 
  where e.studentID = "${studentID}";
  ~~~
  
* Lấy toàn bộ danh sách lịch thi
~~~ 
select * from examschedule
~~~

* Lấy toàn bộ danh sách thời khóa biểu
~~~
select * from schedules
~~~

### 4. Hình ảnh sản phẩm
  * Liên kết đến sản phẩm đã triển khai: https://kooyooman.github.io/DataBaseProject/
  * Giao diện khởi đầu
  ![main](https://i.imgur.com/dTRwiWT.png)
  * Tra cứu lịch học (thi) theo mã sinh viên
  ![stuid](https://i.imgur.com/mK8KpvX.png)
  * Chọn loại lịch
  ![select](https://i.imgur.com/ZhVY1nT.png)
  * Sửa đổi danh sách môn học
  ![mod](https://i.imgur.com/39tY2bT.png)
  * Lịch biểu theo bảng và các chức năng
  ![tab](https://i.imgur.com/hoVUeE7.png)
  * Tra cứu lịch theo tên giảng viên
  ![lecturer](https://i.imgur.com/cHzhxMx.png)
 
