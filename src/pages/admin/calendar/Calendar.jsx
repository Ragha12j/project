import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Paper, Stack, Modal, Box, TextField, Button } from "@mui/material";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "./calendar.css";

const Calendar = () => {
  const [weekendsVisible, setweekendsVisible] = useState(true);
  const [currentEvents, setcurrentEvents] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [customerName, setCustomerName] = useState(""); // حقل اسم الزبون
  const [customerPhone, setCustomerPhone] = useState(""); // حقل رقم الهاتف
  const [numberOfChairs, setNumberOfChairs] = useState(0); // حقل عدد الكراسي
  const [price, setPrice] = useState(0); // حقل السعر
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);

  // فتح/إغلاق صندوق الحوار لإضافة حدث
  const handleOpenAdd = (date) => {
    setSelectedDate(date);
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
    // إعادة تعيين الحقول بعد إغلاق صندوق الحوار
    setNewEventTitle("");
    setCustomerName("");
    setCustomerPhone("");
    setNumberOfChairs(0);
    setPrice(0);
  };

  // فتح/إغلاق صندوق الحوار لحذف حدث
  const handleOpenDelete = (event) => {
    setEventToDelete(event);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  // إضافة حدث جديد
  const handleAddEvent = () => {
    if (newEventTitle && customerName && customerPhone) {
      let calendarApi = selectedDate.view.calendar;
      calendarApi.addEvent({
        id: String(Date.now()),
        title: newEventTitle,
        start: selectedDate.startStr,
        end: selectedDate.endStr,
        allDay: selectedDate.allDay,
        extendedProps: { // يمكنك إضافة خصائص إضافية هنا
          customerName,
          customerPhone,
          numberOfChairs,
          price,
        },
      });
      handleCloseAdd();
    }
  };

  // حذف الحدث
  const handleDeleteEvent = () => {
    if (eventToDelete) {
      eventToDelete.remove();
      handleCloseDelete(); // إغلاق صندوق الحوار بعد الحذف
    }
  };

  // عند اختيار تاريخ معين
  const handleDateSelect = (selectInfo) => {
    handleOpenAdd(selectInfo);
  };

  // عند النقر على حدث
  const handleEventClick = (clickInfo) => {
    handleOpenDelete(clickInfo.event); // فتح صندوق الحوار عند النقر على حدث لحذفه
  };

  // متابعة الأحداث
  const handleEvents = (events) => {
    setcurrentEvents(events);
  };

  return (
    <Stack direction={"row"}>
      <Paper className="demo-app-sidebar">
        <h2 style={{ textAlign: "center" }}>جميع الحجوزات ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <li key={event.id}>
              <b>{event.startStr}</b> <i>{event.title}</i>
            </li>
          ))}
        </ul>
      </Paper>

      <div className="demo-app-main">
        <FullCalendar
          locale="ar"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>

      {/* صندوق الحوار لإضافة حدث */}
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>إضافة حجز جديد</h2>
          <TextField
            fullWidth
            label="عنوان الحدث"
            variant="outlined"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="اسم الزبون"
            variant="outlined"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="رقم الهاتف"
            variant="outlined"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="عدد الكراسي"
            variant="outlined"
            type="number"
            value={numberOfChairs}
            onChange={(e) => setNumberOfChairs(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="السعر"
            variant="outlined"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            margin="normal"
          />
          <Stack direction="row" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleAddEvent}>
              إضافة
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseAdd}>
              إغلاق
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* صندوق الحوار لحذف حدث */}
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>هل أنت متأكد أنك تريد حذف الحدث؟</h2>
          <p>الحدث: {eventToDelete ? eventToDelete.title : ""}</p>
          <Stack direction="row" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleDeleteEvent}>
              نعم، متأكد
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseDelete}>
              إغلاق
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};

export default Calendar;
