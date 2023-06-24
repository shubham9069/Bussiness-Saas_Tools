"use client"

import React, { useState ,useRef,useMemo} from 'react'
import style from '../page.module.css'
import './invoice.css'
import Image from 'next/image'
import Billing from './Billing'
import Item from './Item'
import { useReactToPrint } from 'react-to-print'

interface inputvalue{
  id:number;
  name:string;
  value:any
}

interface Billingaddress{
  name:string;
  home:string;
  streat:string;
  city:string;
  GSTIN:string;
  PAN:string;
  email:string;
  
  
  
  }


  interface item{
    id: number;
    name: string;
    gst: number;
    quantity: number;
    rate: number;
    amount: number;
    cgst: number;
    sgst: number;
    total: number;
  
  }

const Page = () => {
  const [inputField,setInputField] = useState(0)
  const [subtitle,setsubtitle] = useState("")
  const [inputvalue ,setInputvalue] = useState<inputvalue[]>([])
  const [invoice ,setinvoice] = useState({no:"",date:new Date().toISOString().slice(0, 10)})
  const [image,setImage] = useState<File | null>(null)
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const input=useMemo(()=>{
    var obj:inputvalue ={
    id:inputField,
    name:"",
    value:""
    }

   setInputvalue([...inputvalue,obj])
    
  },[inputField,])

  function handleinputfill(e:React.ChangeEvent<HTMLInputElement>,id:number):void{

var arr = inputvalue?.map((a)=>{

  if(a?.id==id){

    var newobj:inputvalue ={
      ...a,
      [e.target.name]:e.target.value,
    }
    return newobj
  }else{
    return a 
  }
 
})
setInputvalue(arr)
  }

  // billing compoenent 
  const [modal,setmodal]=useState<boolean>(false)
  const [toggle,setToggle]=useState<number>(1)
  const [addressForm,setAddressForm] = useState<Billingaddress>({
      name:"",
      home:"",
      streat:"",
      city:"",
      GSTIN:"",
      PAN:"",
      email:"",

  })
  const [billingAddress,setbillingAddress] = useState<Billingaddress>({
      name:"",
      home:"",
      streat:"",
      city:"",
      GSTIN:"",
      PAN:"",
      email:"",

  })

  // item 
  
  const [item,setitem] = useState<item[]>([])
const [noofinput,setnoofinput] = useState(1)
const [signature,setSignature] = useState<File | null>(null)
const [Attachment,setAttachment] = useState<FileList | null>(null)

  return (
    <div className='padding4rem' >
      <h2 className='mx-auto' style={{borderBottom:'2px dotted grey',width:'fit-content'}}> INVOICE</h2>
      <input placeholder='Add Sub Title' className='mx-auto subtitle-input' value={subtitle} onChange={(e)=>setsubtitle(e.target.value)}></input>
      <div className='invoice-number-box between-div'>
        <div className="left">

      <div className='invoice-div'>
        
        <span >INVOICE NO </span>
        <div >
        <input placeholder='1' className='' defaultValue={invoice?.no} onChange={(e)=>setinvoice({...invoice,["no"]:e.target.value})} ></input>
        <text style={{display:'block',color:'#626c7b',fontSize:'0.8rem'}}>Last Invoice No : 23 (23 july 2023) </text>
        </div>
     
      </div>
    
      <div className='invoice-div'>
        <span >INVOICE DATE </span>
        <input type="Date"  defaultValue={invoice?.date} onChange={(e)=>setinvoice({...invoice,["date"]:e.target.value})} className=''></input>
      </div>
      { inputvalue?.map((e)=>{

        return <div className='invoice-div' key={e?.id}>
       
        <input placeholder='input Name' className='' name="name" defaultValue={e?.name} style={{borderBottom:'none',color:"#4e5560",textTransform:'uppercase'}} onChange={(event)=>handleinputfill(event,e?.id)}></input>
        <input placeholder='value ' className='' name="value" defaultValue={e?.value} onChange={(event)=>handleinputfill(event,e?.id)}></input>
        <i className="bi bi-x-circle-fill" style={{fontSize:18,color:"#F1416C",}} onClick={()=>setInputvalue(inputvalue?.filter(elem=>elem?.id!=e?.id))}></i>
      </div>
      })

      }
      
      <div className='invoice-div align-items-center' onClick={()=>setInputField(inputField+1)} style={{cursor:"pointer"}}>
        <i className="bi bi-plus-square" style={{color:"#4f15d0",fontSize:18}}></i>
        <p style={{marginBottom:0,fontWeight:600,fontSize:'0.9rem'}}>Add More Fields</p>
      </div>



        </div>
        <div className="right">
      {image == null ?   <div className="add-image" onClick={():void=>document.getElementById("hidden-input")?.click()}>
          <input type="file" id="hidden-input" hidden onChange={(e:React.FormEvent<HTMLInputElement>)=>setImage((e.target as HTMLInputElement)?.files?.[0]!)}></input>
        <i className="bi bi-card-image" style={{color:"#4f15d0",fontSize:'1.2rem',marginRight:10}}></i>
          Add Image 
        </div>
        :
        <div style={{position:'relative'}}>
        <Image src={URL.createObjectURL(image)} alt='cc' width={200} height={200} style={{objectFit:'contain'}} />
        <i className="bi bi-x-circle-fill" style={{fontSize:18,color:"#F1416C",position:'absolute',top:'-30px',right:'-30px'}} onClick={()=>setImage(null)}></i>
        </div>
          }
      

          
        </div>
      </div>
      <Billing print={false} modal={modal} addressForm={addressForm} toggle={toggle} billingAddress={billingAddress} setmodal={setmodal} setToggle={setToggle} setAddressForm={setAddressForm} setbillingAddress={setbillingAddress}  />
      <Item print={false} Attachment={Attachment} setAttachment={setAttachment} signature={signature} setSignature={setSignature} noofinput={noofinput} setnoofinput={setnoofinput} item={item} setitem={setitem}/>
      <div className='center-div' style={{gridGap:30,margin:"3rem 0"}}>

<button className='btn-color' style={{background:"#dc5c5c"}} onClick={handlePrint}>Print your invoice</button>
      </div>


      {/* for print document  */}
      <div style={{display:'none'}} >
        <div ref={componentRef} className='padding4rem'>
        
      <h2 className='mx-auto' style={{borderBottom:'2px dotted grey',width:'fit-content'}}> INVOICE</h2>
      <input placeholder='Add Sub Title' className='mx-auto subtitle-input'></input>
      <div className='invoice-number-box between-div'>
        <div className="left">

      <div className='invoice-div'>
        
        <span >INVOICE NO </span>
        <div >
        <input placeholder='1' className='' style={{borderBottom:'none'}} defaultValue={invoice?.no}></input>
        <text style={{display:'block',color:'#626c7b',fontSize:'0.8rem'}}>Last Invoice No : 23 (23 july 2023) </text>
        </div>
     
      </div>
    
      <div className='invoice-div'>
        <span >INVOICE DATE </span>
        <input type="Date" defaultValue={invoice?.date} style={{borderBottom:'none'}} className=''></input>
      </div>

      { inputvalue?.map((a)=>{

        return <div key={a?.id} className='invoice-div'>
       
        <input  className='' defaultValue={a?.name} style={{borderBottom:'none',color:"#4e5560",textTransform:'uppercase',fontWeight:500}}></input>
        <input  className='' defaultValue={a?.value} style={{borderBottom:'none'}}></input>
      </div>
      })

      }
      
        </div>
        <div className="right">
      {image != null && (<div style={{position:'relative'}}>
        <Image src={URL.createObjectURL(image)} alt='cc' width={200} height={200} style={{objectFit:'contain'}} />
        </div>)}

        </div>
      </div>
      <Billing print={true} modal={modal} addressForm={addressForm} toggle={toggle} billingAddress={billingAddress} setmodal={setmodal} setToggle={setToggle} setAddressForm={setAddressForm} setbillingAddress={setbillingAddress}  />
      <Item print={true} Attachment={Attachment} setAttachment={setAttachment} signature={signature} setSignature={setSignature} noofinput={noofinput} setnoofinput={setnoofinput} item={item} setitem={setitem}/>
      </div>
      </div>

    </div>
    
  )
}

export default Page