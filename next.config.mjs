/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        //перенаправляем на страницу регистрации
        source: '/',  
        destination: '/register',
        permanent: true, 
      },
    ];
  },
};

export default nextConfig;
