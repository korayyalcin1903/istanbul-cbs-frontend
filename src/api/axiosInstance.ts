import axios from "axios";
import { toast } from "react-toastify";

const baseURL =
  import.meta?.env?.VITE_API_BASE_URL ||
  process.env.VITE_API_BASE_URL

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Auth yok: token ekleme / 401 yönlendirme yok.
// Yalnızca temel hata yönetimi:
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      const msg =
        error.response.data?.message ||
        `Hata: ${error.response.status} ${error.response.statusText}`;
      toast.error(msg);
    } else if (error.request) {
      toast.error("Sunucuya ulaşılamıyor.");
    } else {
      toast.error("İstek hazırlanırken bir sorun oluştu.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
