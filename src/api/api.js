import axios from 'axios';
import Cookies from 'js-cookie'; // مكتبة للتعامل مع الكوكيز

// الحصول على الـ token من الكوكيز
const token = Cookies.get('accessToken');

// تكوين Axios
export const api = axios.create({
  baseURL: 'http://localhost:3000/api', // تأكد من مطابقة الـ URL لـ backend
  headers: {
    Authorization: `Bearer ${token}`, // إضافة التوكن إلى الهيدر
  },
  withCredentials: true, // للسماح بإرسال الكوكيز عبر الطلبات
});

//ppppppppppppppp






// import axios from "axios";

// // احصل على التوكن من الـ localStorage أو cookies
// const token = localStorage.getItem("authToken");

// export const api = axios.create({
//   baseURL: "http://localhost:3000/api", // رابط backend
//   withCredentials: true, // للسماح بإرسال الكوكيز
//   headers: {
//     Authorization: `Bearer ${token}`, // إرسال التوكن في الهيدر
//   },
// });
