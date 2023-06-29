'use client'


import React,{useState} from 'react'
import style from './page.module.css'
import { RgbaColorPicker } from "react-colorful";
import './business.css'




interface Business{
    name: string,
    phone: string,
    ceo: string,
    logoName: string,
    email: string
}
interface RGBA{
    r:number,
    g:number,
    b:number,
    a:number
}
const Page = () => {
    var arr:RGBA[] =[
        {r: 255, g: 0, b: 0, a: 1 },
        {r: 255, g: 127, b: 0, a: 1 },
        {r: 255, g: 255, b: 0, a: 1 },
        {r: 0, g: 255, b: 0, a: 1 },
        {r: 0, g: 0, b: 255, a: 1 },
        {r: 75, g: 0, b: 130, a: 1 },
        {r: 148, g: 0, b: 211, a: 1 },

    ]


    const [BusinessDetails,setBusinessDetails] = useState<Business>({name:"",phone:"",ceo:"",logoName:"",email:""});
    const [color, setColor] = useState<RGBA>({ r: 75, g: 75, b: 150, a: 1 });
    const [textcolor, settextcolor] = useState<RGBA>({ r: 75, g: 75, b: 150, a: 1 });

        const handleinput =(e:any)=>{
            setBusinessDetails({...BusinessDetails,[e.target.name]:e.target.value})
        }
    
  return (
  <>
    <div className='padding4rem' >
<div className='d-flex' style={{justifyContent:'space-evenly',gridGap:20}}>
    <div style={{width:'100%',maxWidth:500}}>
    <div className="inputwrapper">
 <p className='span-text-dark' > company Name</p>
  <input type="text" className="form-input" placeholder='Billing Name' name="name" onChange={handleinput} ></input>
       </div>
    <div className="inputwrapper">
 <p className='span-text-dark' >CEO Name</p>
  <input type="text" className="form-input" placeholder='Billing Name' name="ceo" onChange={handleinput}  ></input>
       </div>
       <div className="inputwrapper">
 <p className='span-text-dark' >Logo Name </p>
  <input type="text" className="form-input" placeholder='Billing Name' name="logoName" onChange={handleinput}  ></input>
       </div>
  
    </div>
    <div style={{width:'100%',maxWidth:500}}>
    <div className="inputwrapper">
 <p className='span-text-dark' >Phone Number </p>
  <input type="text" className="form-input" placeholder='Billing Name' name="phone" onChange={handleinput}  ></input>
       </div>
    <div className="inputwrapper">
 <p className='span-text-dark' > Email</p>
  <input type="text" className="form-input" placeholder='Billing Name' name="email" onChange={handleinput}  ></input>
       </div>
 
    </div>

</div>

<div className='center-div' style={{gridGap:30,margin:"2rem 0"}}>

<button className='btn-color' style={{background:"#dc5c5c"}}>Generate your card </button>
    </div>

 <div className={`${style.container}`}>
    <div className={style.left}>
        <div style={{width:400,height:200,background:`rgb(${color?.r},${color.g},${color.b},${color.a})`}}>
     
        </div>
 
        </div>    
    <div className={style.right}>
 
    <div className='d-flex align-items-center ' style={{gridGap:10,margin:'1rem 0'}}>
        <span>BACKGROUND :</span>
    {arr?.map((a,i)=>{

        return  <div key={i} className={style.colorIcon}style={{background:`rgb(${a?.r},${a.g},${a.b},${a.a})`}} onClick={()=>setColor(a)}></div> 
    })}
    <div className="dropdown">
    <div className={` ${style.colorIcon} center-div dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false" style={{border:'1.5px solid #4f15d059'}} > <i className="bi bi-eyedropper" style={{color:'#4f15d0'}}></i></div> 
    <ul className="dropdown-menu">
      <RgbaColorPicker color={color} onChange={setColor} className='dropdown-item' />;
  </ul>
 
    </div>
    </div>
    <div className='d-flex align-items-center ' style={{gridGap:10,margin:'1rem 0'}}>
        <span>TEXT COLOR:</span>
    {[{r:255,g:255,b:255,a:1},{r:0,g:0,b:0,a:1}]?.map((a,i)=>{

        return  <div key={i} className={style.colorIcon}style={{background:`rgb(${a?.r},${a.g},${a.b},${a.a})`}} onClick={()=>settextcolor(a)}></div> 
    })}
    <div className="dropdown">
    <div className={` ${style.colorIcon} center-div dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false" style={{border:'1.5px solid #4f15d059'}} > <i className="bi bi-eyedropper" style={{color:'#4f15d0'}}></i></div> 
    <ul className="dropdown-menu">
      <RgbaColorPicker color={textcolor} onChange={settextcolor} className='dropdown-item' />;
  </ul>
 
    </div>
    </div>
      

    {/*     */}
    </div>    
    
    
    
    
</div>   
    </div>
  </>
  )
}

export default Page