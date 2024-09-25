import React, { useState, useEffect } from "react";
import { api } from "../../../api/api"; // استيراد API للتعامل مع backend
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Header from "../../../components/admin/Header";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState(""); // حالة البحث
  const [reservations, setReservations] = useState([]); // حالة الحجوزات الفارغة مبدئيًا
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  // دالة لجلب الحجوزات من API عند تحميل الصفحة
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await api.get("/reservations");
        setReservations(response.data); // تخزين البيانات في حالة الحجوزات
        setLoading(false); // إنهاء حالة التحميل
      } catch (err) {
        setError("حدث خطأ أثناء تحميل البيانات"); // تخزين رسالة الخطأ
        setLoading(false); // إنهاء حالة التحميل
      }
    };

    fetchReservations(); // استدعاء الدالة عند تحميل الصفحة
  }, []);

  // تصفية الحجوزات بناءً على مدخلات المستخدم
  const filteredReservations = reservations.filter((reservation) =>
    reservation.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // دالة لحذف الحجز
  const handleDelete = async (id) => {
    try {
      await api.delete(`/reservations/${id}`); // طلب حذف الحجز من API
      setReservations(reservations.filter((reservation) => reservation._id !== id)); // تحديث حالة الحجوزات بعد الحذف
    } catch (error) {
      console.error("Error deleting reservation", error);
    }
  };

  // عرض حالة التحميل أو الخطأ إن وجدت
  if (loading) return <p>جاري تحميل الحجوزات...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-gray-100">
      <Header title="لوحة التحكم" subTitle="List of Contacts for Future Reference" />

      {/* حقل البحث */}
      <Box display="flex" justifyContent="center" my={2}>
        <TextField
          label="بحث باسم العميل"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // تحديث البحث
          margin="normal"
          sx={{ width: "20%" }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-primary text-white">
              <TableCell>اسم العميل</TableCell>
              <TableCell>رقم الهاتف</TableCell>
              <TableCell>نوع المناسبة</TableCell>
              <TableCell>عدد الكراسي</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>تاريخ الحجز</TableCell>
              <TableCell>المبلغ المدفوع</TableCell>
              <TableCell align="center">إجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow key={reservation._id} className="text-center">
                <TableCell>{reservation.customerName}</TableCell>
                <TableCell>{reservation.customerPhone}</TableCell>
                <TableCell>{reservation.classification}</TableCell>
                <TableCell>{reservation.numberOfChairs}</TableCell>
                <TableCell>
                  {reservation.status === "confirmed" ? "مؤكد" : "مؤقت"}
                </TableCell>
                <TableCell>{new Date(reservation.bookingDate).toLocaleDateString()}</TableCell>
                <TableCell>{reservation.price} ريال</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    style={{ backgroundColor: "#87ceeb", color: "#fff" }}
                    onClick={() => handleDelete(reservation._id)} // استدعاء دالة الحذف عند الضغط على الزر
                  >
                    حذف
                  </Button>
                  <Link
                    to={`/adminPage/dashboard/view/${reservation._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<VisibilityIcon />}
                      style={{
                        backgroundColor: "#00bcd4",
                        color: "#fff",
                        marginRight: "20px",
                      }}
                    >
                      عرض
                    </Button>
                  </Link>

                  <Link
                    to={`/adminPage/dashboard/edit/${reservation._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#87ceeb",
                        color: "#fff",
                        marginRight: "20px",
                      }}
                      startIcon={<EditIcon />}
                    >
                      تعديل
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
