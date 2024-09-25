import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { reservations } from "./data";
import Header from "../../../components/admin/Header";
import {
    TextField,
    Button,
    Container,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
} from "@mui/material";

const EditReservation = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [reservation, setReservation] = useState({
        customerName: "",
        customerPhone: "",
        classification: "",
        numberOfChairs: "",
        status: "",
        bookingDate: "",
        price: "",
    });

    useEffect(() => {
        const fetchReservation = () => {
            const reservationId = Number(id);
            const foundReservation = reservations.find((res) => res.id === reservationId);
            if (foundReservation) {
                setReservation(foundReservation);
            }
        };
        fetchReservation();
    }, [id]);

    const handleChange = (e) => {
        setReservation({ ...reservation, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log("تم حفظ التعديلات:", reservation);
        navigate("/dashboard");
    };

    return (
        <Container>
            {/* Header على اليمين وزر العودة إلى لوحة التحكم على اليسار */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Header title="تعديل الحجز" subTitle="Details of the reservation" />
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

            {/* مركز النموذج في منتصف الشاشة */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh" // ارتفاع الحد الأدنى لضمان التمركز
            >
                <form onSubmit={handleSave} style={{ width: "500px" }}> {/* تحديد عرض النموذج */}
                    <TextField
                        label="اسم العميل"
                        name="customerName"
                        value={reservation.customerName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="رقم الهاتف"
                        name="customerPhone"
                        value={reservation.customerPhone}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>نوع المناسبة</InputLabel>
                        <Select
                            name="classification"
                            value={reservation.classification}
                            onChange={handleChange}
                        >
                            <MenuItem value="زفاف">زفاف</MenuItem>
                            <MenuItem value="عيد ميلاد">عيد ميلاد</MenuItem>
                            <MenuItem value="مؤتمر">مؤتمر</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="عدد الكراسي"
                        name="numberOfChairs"
                        value={reservation.numberOfChairs}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>الحالة</InputLabel>
                        <Select
                            name="status"
                            value={reservation.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="مؤكد">مؤكد</MenuItem>
                            <MenuItem value="مؤقت">مؤقت</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="تاريخ الحجز"
                        name="bookingDate"
                        type="date"
                        value={reservation.bookingDate}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />

                    <TextField
                        label="المبلغ المدفوع"
                        name="price"
                        value={reservation.price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        style={{ marginTop: "20px" }}
                    >
                        حفظ التعديلات
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default EditReservation;
