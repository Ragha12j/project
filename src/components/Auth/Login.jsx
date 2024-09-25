import React, { useState } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { TextField, Button, Typography, Box, Container, CssBaseline, Avatar } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // تحقق من صحة البيانات من قاعدة البيانات
    if (email === 'test@example.com' && password === 'password') {
      // في حالة النجاح
      window.location.href = '/dashboard';
    } else {
      // في حالة الفشل
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <Container maxWidth="xs">
        <CssBaseline/>
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
          تسجيل الدخول
        </Typography>
        
     
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="البريد الإلكتروني"
          name="email"
          autoComplete="email"
          autoFocus
         
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
          autoComplete="current-password"
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
          onClick={handleLogin}
          sx={{ marginTop: '20px' }}
        >
          متابعة
        </Button>
        <Typography variant="body2" sx={{ marginTop: '10px' }}>
          ليس لديك حساب؟{' '}
          <a href="/register" style={{ textDecoration: 'none', color: '#007bff' }}>
            سجل الآن
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
//===================