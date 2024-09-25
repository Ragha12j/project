import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { TextField, Button, Typography, Box, Container, CssBaseline, Avatar } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    // هنا يمكنك التحقق من صحة البيانات وإرسالها إلى الخادم لإنشاء حساب جديد
    if (name && email && password) {
      // في حالة النجاح، يمكن توجيه المستخدم إلى صفحة أخرى أو إظهار رسالة نجاح
      window.location.href = '/dashboard'; // افتراضيًا يتم توجيه المستخدم إلى صفحة أخرى
    } else {
      // في حالة الفشل
      setError('يرجى إدخال جميع الحقول المطلوبة');
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          marginTop: '100px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#87ceeb' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          حساب جديد
        </Typography>
        
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="الاسم"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="البريد الإلكتروني"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="كلمة المرور"
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRegister}
          sx={{ marginTop: '20px' }}
        >
          إنشاء حساب
        </Button>
        <Typography variant="body2" sx={{ marginTop: '10px' }}>
          لديك حساب بالفعل؟{' '}
          <a href="/login" style={{ textDecoration: 'none', color: '#007bff' }}>
            تسجيل الدخول
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
