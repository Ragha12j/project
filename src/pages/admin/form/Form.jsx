import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";


// نموذج التعبير العادي للتحقق من البريد الإلكتروني
const regEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const data = [
  { value: "Admin", label: "مسؤول" },
  { value: "Manger", label: "مدير" },
  { value: "User", label: "مستخدم" },
];

const Form = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleClick = () => setOpen(true);

  const onSubmit = (data) => {
    console.log("تم الانتهاء", data);
    handleClick();
    reset(); // إعادة تعيين الحقول بعد الإرسال
  };

  

  return (


    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5", // لون خلفية
      }}
      
    >
        
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "700px", // عرض ثابت للنموذج
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <Stack sx={{ gap: 2 }} direction={"row"}>
          <TextField
            error={Boolean(errors.firstName)}
            helperText={Boolean(errors.firstName) ? "هذا الحقل مطلوب ويجب ألا يقل عن 3 أحرف" : null}
            {...register("firstName", { required: true, minLength: 3 })}
            label="الاسم الأول"
            variant="filled"
            fullWidth
          />
          <TextField
            error={Boolean(errors.lastName)}
            helperText={Boolean(errors.lastName) ? "هذا الحقل مطلوب ويجب ألا يقل عن 3 أحرف" : null}
            {...register("lastName", { required: true, minLength: 3 })}
            label="اسم العائلة"
            variant="filled"
            fullWidth
          />
        </Stack>

        <TextField
          error={Boolean(errors.email)}
          helperText={Boolean(errors.email) ? "يرجى تقديم عنوان بريد إلكتروني صالح" : null}
          {...register("email", { required: true, pattern: regEmail })}
          label="البريد الإلكتروني"
          variant="filled"
          fullWidth
        />

        <TextField
          error={Boolean(errors.ContactNumber)}
          helperText={Boolean(errors.ContactNumber) ? "يرجى تقديم رقم هاتف صالح" : null}
          {...register("ContactNumber", { required: true, pattern: phoneRegExp })}
          label="رقم الهاتف"
          variant="filled"
          fullWidth
        />

        <TextField label="العنوان 2" variant="filled" fullWidth />

        <TextField variant="filled" select label="الدور" defaultValue="User" fullWidth>
          {data.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ textAlign: "center" }}>
          <Button type="submit" variant="contained" sx={{ textTransform: "capitalize" }}>
            إنشاء مستخدم جديد
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
              تم إنشاء الحساب بنجاح
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
