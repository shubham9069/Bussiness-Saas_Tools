/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
    images: {
        domains: ["localhost", "techshubham.website"],
      },
      async exportPathMap() {
        const routes = {
          '/': { page: '/' }, // Index page
          '/SalarySlip': { page: '/SalarySlip' }, 
          '/Invoice': { page: '/invoice' }, 
        }
}
}

module.exports = nextConfig
