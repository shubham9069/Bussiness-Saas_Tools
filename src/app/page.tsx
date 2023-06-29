import Image from 'next/image'
import styles from './page.module.css'
import Navbar from './component/Navbar'
import './welcome.css'



export default function Home() {
  return (
   <>
  <div className="welcome-page">
      <div className="header">
        <h1>Welcome to Shubham World !</h1>
        <p>We are thrilled to have you here. Our website is designed to provide you with convenient and user-friendly tools to streamline your business processes. Whether you need to generate salary slips, create professional invoices, or design eye-catching business cards, we have got you covered.</p>
      </div>

      <div className="generator-info">
        <div className="generator-info-text">
          <h2>Salary Slip Generator</h2>
          <p>Say goodbye to manual calculations and paperwork. Our salary slip generator simplifies the process of creating accurate and detailed salary slips for your employees. Just enter the necessary information, such as employee details, salary components, deductions, and allowances, and our tool will generate professional and printable salary slips instantly.</p>
        </div>
        <div className="generator-info-image">
          <div>
          <img src="salary-slip.png" alt="Salary Slip Generator" />
          </div>
          
        </div>
      </div>

      <div className="generator-info">
        <div className="generator-info-image">
          <div>
          <img src="invoice.png" alt="Invoice Generator" />
          </div>
          
        </div>
        <div className="generator-info-text">
          <h2>Invoice Generator</h2>
          <p>Create customized and professional invoices effortlessly with our invoice generator. Whether you run a small business or a freelance operation, our tool allows you to generate invoices with ease. Simply input your company information, client details, products or services rendered, and any applicable taxes or discounts. You can then download or email the invoices directly to your clients.</p>
        </div>
      </div>

      <div className="generator-info">
        <div className="generator-info-text">
          <h2>Business Card Maker</h2>
          <p>Make a lasting impression with professionally designed business cards. Our business card maker offers a range of templates and customization options to help you create unique and visually appealing cards. Add your logo, contact information, and any other details you desire, and generate high-quality, printable business cards that reflect your brand identity.</p>
        </div>
        <div className="generator-info-image">
          <div>

          <img src="bussinesscard.png" alt="Business Card Maker" style={{ maxWidth:400}}/>
          </div>
        </div>
      </div>

      <p className="final-words">{`We understand the importance of efficiency and professionalism in today's fast-paced business world. That's why we have developed these tools to save you time and enhance your productivity. Enjoy the convenience and simplicity of managing essential business tasks on a single platform.`}</p>

      <p className="thank-you">{`Thank you for choosing Shubham world as your go-to resource for generating salary slips, invoices, and business cards. We hope our tools make your business operations smoother and more enjoyable. If you have any questions or need assistance, please don't hesitate to contact our support team.`}</p>

      <p className="get-started">Get started now and experience the ease and convenience of our salary slip generator, invoice generator, and business card maker. Happy generating and designing!</p>

      <p className="signature">Sincerely,<br/>Shubham Kaushik </p>
    </div>

   </>
  )
}
