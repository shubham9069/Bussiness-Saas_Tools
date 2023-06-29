'use client'

import React, { useEffect, useState } from 'react'
import { RgbaColorPicker } from 'react-colorful'
import style from '../BusinessCard/page.module.css'


interface RGBA{
  r:number,
  g:number,
  b:number,
  a:number
}
const page = () => {
  const[name,setname] = useState("")


  const [subtextcolor, setsubtextcolor] = useState<RGBA>({ r: 255, g: 255, b: 255, a: 1 });
  const [background,setbackground] = useState({ color: 'linear-gradient(to right, #0F3443 , #34E89E)', background: "black"},)
  const [font,setFont] = useState("")
  const [fontSize,setFontSize] = useState<any>(40)
  const [text,setText] = useState("")
  const [combinations,setcombinations] = useState<any>([])
  const fontFamilies = [
    'Jura',
    'Bebas Neue',
    'Fasthand',
    'Caveat',
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Courier New",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Palatino",
    "Garamond",
    "Comic Sans MS",
    "Impact",
    "Lucida Sans",
    "Lucida Grande",
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Raleway",
    "Source Sans Pro"
  ];
  var arr = [
    { color: 'linear-gradient(to right, #0F3443 , #34E89E)', background: "black"},
    { color: 'linear-gradient(to right, #FFD3A5,#FD6585)',   background:    "black"},
    { color: 'linear-gradient(to right, #12C2E9 , #F64F59)', background: "black"},
    { color: 'linear-gradient(to right, #FCCF31 , #F55555)', background: "black"},
    // Add more combinations below...
    { color: 'linear-gradient(to right, #7F7FD5 , #91EAE4)', background: "black"},
    { color: 'linear-gradient(to right, #3E5151 , #DECBA4)', background: "black"},
    { color: 'linear-gradient(to right, #333399 , #FF00CC)', background: "black"},
    { color: 'linear-gradient(to right, #31B7C2 , #7BC393)', background: "black"},
    { color: 'linear-gradient(to right, #0F3443 , #34E89E)', background: "white"},
    { color: 'linear-gradient(to right, #FFD3A5,#FD6585)',   background:    "white"},
    { color: 'linear-gradient(to right, #12C2E9 , #F64F59)', background: "white"},
    { color: 'linear-gradient(to right, #FCCF31 , #F55555)', background: "white"},
    // Add more combinations below...
    { color: 'linear-gradient(to right, #7F7FD5 , #91EAE4)', background: "white"},
    { color: 'linear-gradient(to right, #3E5151 , #DECBA4)', background: "white"},
    { color: 'linear-gradient(to right, #333399 , #FF00CC)', background: "white"},
    { color: 'linear-gradient(to right, #31B7C2 , #7BC393)', background: "white"},
    { color: 'black', background: "bg.jpg"},
    // Keep adding combinations as needed...
  ];
  
  useEffect(()=>{
    (()=>{
       var newarr = arr.map((elem)=>{
        var color1 = elem.color.split(",")[1]
        var color2 = elem.color.split(",")[2]
       
          return {color:`linear-gradient(to bottom,${color1+","+color2}`,background:elem?.background}

       })
      setcombinations([...newarr,...arr])
    })()

  },[])
  
  
  return (
    <>
    <div  className='padding4rem'>
    <div className="inputwrapper">
      <div className='between-div'  >
 <p className='span-text-dark' style={{margin:'0 3rem 0 0 '}} > Business Name</p>
  <input type="text" className="form-input" placeholder='Business Name' name="name" onChange={(e)=>setname(e.target.value)}></input>
  </div>
  <button className='btn-color' style={{background:"#dc5c5c"}}>Generate your card </button>
       </div>
       <div className="d-flex ">
    <div className="left" style={{flex:1,padding:'1rem'}}>

      <div style={{width:'100%',margin:'1.5rem 0'}} className='dropdown'>
    <input className="form-input dropdown-toggle" value={font} style={{width:'100%',border:'1px solid #cbcbcb'}} data-bs-toggle="dropdown" aria-expanded="false" placeholder='font-family'/>

    <ul className="dropdown-menu" style={{width:'100%',height:250,overflowY:'auto'}}>
      {fontFamilies?.map((a)=>{

        return <li className='dropdown-item' style={{fontFamily:a}} onClick={()=>setFont(a)}>{a}</li>
      })}
      
  </ul>
    </div>

{/* one column  */}
    <div className='div' style={{width:'100%',margin:'1.5rem 0'}}   >
 <p className='span-text-dark' style={{margin:0,fontSize:12,fontWeight:900,fontFamily:"monospace"}} > Slogon</p>
 <div className='d-flex' style={{gridGap:10}}>
  <input type="text" className="form-input"  style={{border:'1px solid #cbcbcb'}} placeholder='type Slogan' name="name" value={text} onChange={(e)=>setText(e.target.value)} ></input>
  <div className="dropdown">
    <div className={` ${style.colorIcon} center-div dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false" style={{background:`rgb(${subtextcolor?.r},${subtextcolor.g},${subtextcolor.b},${subtextcolor.a})`,border:'1.5px solid #4f15d059'}} ></div> 
    <ul className="dropdown-menu">
      <RgbaColorPicker color={subtextcolor} onChange={setsubtextcolor} className='dropdown-item' />;
  </ul>
 
    </div>
    </div>
  </div>
    <div className='div' style={{width:'100%',margin:'1.5rem 0'}}   >
 <p className='span-text-dark' style={{margin:0,fontSize:12,fontWeight:900,fontFamily:"monospace"}} > Size</p>
 <div className='d-flex' style={{gridGap:10}}>
  <input type="range"  style={{border:'1px solid #cbcbcb',width:'100%',maxWidth:400}} name="name" onChange={(e)=>setFontSize(e.target.value)} ></input>
    </div>
  </div>



  <div className='div' style={{width:'100%',margin:'1.5rem 0'}}   >
 <p className='span-text-dark' style={{margin:0,fontSize:12,fontWeight:900,fontFamily:"monospace"}} >Background Color </p>
 <div className='d-flex flex-wrap' style={{gridGap:10,height:300,overflow:'auto'}}>
 {combinations?.map((a:any)=>{

return  <div className='center-div card-container' style={{width:132,height:75.5,background:a?.background.includes('.') ? `url(/bg.jpg) no-repeat center `:a?.background, borderRadius:6,backgroundSize:'contain'}} onClick={()=>setbackground(a)} >
     
<div>
<p style={{background:a?.color,
fontFamily:font,

fontSize:12,
fontWeight:700,
margin:0,
lineHeight:'12px'
}}>{name}</p>
<p style={{background:a?.color ,
fontFamily:font,
fontSize:9,
fontWeight:400,
margin:0
}}>{text}</p>
</div>

</div>
})}
  </div>
  </div>
    </div>

    <div className='d-flex justify-content-center right' style={{flex:1,padding:'1rem'}}>
    <div className='center-div card-container' style={{padding:"0 4rem",height:302,width:2*264,background:background?.background.includes('.') ? `url(/bg.jpg) no-repeat center `:background?.background,}}>
     
     <div>
     <p style={{background:background?.color,
     fontFamily:font,
     fontSize:Number(fontSize),
     fontWeight:900,
     margin:0,
     
    }}>{name}</p>
     <p style={{color:`rgb(${subtextcolor?.r},${subtextcolor.g},${subtextcolor.b},${subtextcolor.a})`,
     fontFamily:font,
     fontSize:Number(fontSize)/2,
     fontWeight:400,
     margin:0,
     lineHeight:'0px'
    }}>{text}</p>
    </div>
   
     </div>
    </div>
       </div>
    
    
       </div>
    </>
  )
}

export default page