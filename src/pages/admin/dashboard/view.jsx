import React from "react";
import { useParams, Link } from "react-router-dom";
import { reservations } from "./data"; // استيراد بيانات الحجز
import { Container, Box, Typography, Button, Paper, IconButton } from "@mui/material";
import Header from "../../../components/admin/Header";
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from "docx";
import DownloadIcon from '@mui/icons-material/Download';

const View = () => {
  const { id } = useParams();
  const reservation = reservations.find((r) => r.id === parseInt(id));

  if (!reservation) {
    return <div>الحجز غير موجود.</div>;
  }

  // دالة لتحميل تفاصيل الحجز كملف Word
  const handleDownload = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun("تفاصيل الحجز"),
              ],
              heading: "Heading1",
            }),
            new Paragraph(`اسم العميل: ${reservation.customerName}`),
            new Paragraph(`رقم الهاتف: ${reservation.customerPhone}`),
            new Paragraph(`نوع المناسبة: ${reservation.classification}`),
            new Paragraph(`عدد الكراسي: ${reservation.numberOfChairs}`),
            new Paragraph(`الحالة: ${reservation.status === "confirmed" ? "مؤكد" : "مؤقت"}`),
            new Paragraph(`تاريخ الحجز: ${reservation.bookingDate}`),
            new Paragraph(`المبلغ المدفوع: ${reservation.price} ريال`),
          ],
        },
      ],
    });

    // حزم الوثيقة وتحميلها
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "تفاصيل_الحجز.docx");
    });
  };

  return (
    <Container>

     
      {/* Header على اليمين وزر العودة إلى لوحة التحكم على اليسار */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>

      <Header title="عرض الحجز" subTitle="Details of the reservation" />
        {/* زر العودة إلى لوحة التحكم */}
        <Link to="/adminPage/dashboard" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 3 }}
            >
              العودة إلى لوحة التحكم
            </Button>
          </Link>

      </Box>

      {/* محتوى الصفحة */}
      <Box display="flex" justifyContent="center" mt={5}>
        
        <Paper elevation={3} sx={{ padding: 4, width: '50%', textAlign: 'center' }}>
          
       
          <Typography variant="h4" gutterBottom>
            تفاصيل الحجز
          </Typography>

          <Typography>
            <strong>اسم العميل:</strong> {reservation.customerName}
          </Typography>
          <Typography>
            <strong>رقم الهاتف:</strong> {reservation.customerPhone}
          </Typography>
          <Typography>
            <strong>نوع المناسبة:</strong> {reservation.classification}
          </Typography>
          <Typography>
            <strong>عدد الكراسي:</strong> {reservation.numberOfChairs}
          </Typography>
          <Typography>
            <strong>الحالة:</strong> {reservation.status === "confirmed" ? "مؤكد" : "مؤقت"}
          </Typography>
          <Typography>
            <strong>تاريخ الحجز:</strong> {reservation.bookingDate}
          </Typography>
          <Typography>
            <strong>المبلغ المدفوع:</strong> {reservation.price} ريال
          </Typography>
          <IconButton color="primary" onClick={handleDownload}>
          <DownloadIcon />
        </IconButton>
        </Paper>
      </Box>
    </Container>
  );
};

export default View;
