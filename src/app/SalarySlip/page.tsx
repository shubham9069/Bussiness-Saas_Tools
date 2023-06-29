'use client'

import React,{useState,useMemo,useRef} from 'react'
import '../invoice/invoice.css'
import './salary.css'
import {useReactToPrint} from 'react-to-print'
import { resolve } from 'path'
import Image from 'next/image'




interface inputvalue{
    id:number;
    name:string;
    value:any;
    amount?:number
  }
  
const Page = () => {
    const [inputField,setInputField] = useState(0)
  const [subtitle,setsubtitle] = useState("")
  const [image,setImage] = useState<File | null>(null)
  const [inputvalue ,setInputvalue] = useState<inputvalue[]>([])
  const [invoice ,setinvoice] = useState({no:"",date:new Date().toISOString().slice(0, 10)})
  const [Earning ,setEarning] = useState<inputvalue[]>([
    {id:0,name:"basic pay",value:40,amount:0},  // 40% of salary
    {id:1,value:50,name:"H.R.A",amount:0}, // 50% of basic pay 
    {id:2,name:"T.A",value:10,amount:0},   // 10% of basic pay 
    {id:3,name:"D.A",value:50,amount:0}, // 50% of basic pay 
    {id:4,name:"Other",value:0,amount:0} // 50% of basic pay 
    // 50% of basic pay 
])

  const [Deduction ,setDeduction] = useState<inputvalue[]>([{id:0,name:"",value:"",amount:0}])
  const [total,setTotal] = useState<number>(0)
  const componentRef = useRef(null);
  const [print,setPrint] = useState(false)
  function PromiseFunc(){
    return new Promise((resolve, reject) =>{
      
      resolve(setPrint(true))
    })}
  const HandlePrint = useReactToPrint({
 
    onBeforeGetContent:async()=>{
      await PromiseFunc()
    
    },
    content: () => componentRef.current,
    onAfterPrint:()=>{
      (()=>setPrint(false))()}
  });

  const input=useMemo(()=>{
    var obj:inputvalue ={
    id:inputField,
    name:"",
    value:""
    }

   setInputvalue([...inputvalue,obj])
    
  },[inputField])

function handleinputfill(e:React.ChangeEvent<HTMLInputElement>,id:number,state:inputvalue[],setstate:React.Dispatch<React.SetStateAction<inputvalue[]>>):void{


var arr = state?.map((a)=>{

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
setstate(arr)
  }

  const salaryCal=useMemo(()=>{
    var basicpay:number

    var totalAmount:number
var arr :inputvalue[] = Earning?.map((a):inputvalue=>{
    
    if(a?.id==0){
        basicpay=total*(a?.value/100)
        totalAmount=total*(a?.value/100)
        return  {...a,amount:total*(a?.value/100)}
    }
    if(a?.id==1){
        
        totalAmount=totalAmount+basicpay*(a?.value/100)
     return {...a,amount:basicpay*(a?.value/100)}
    }
    if(a?.id==2){
        
        totalAmount=totalAmount+basicpay*(a?.value/100)
     return {...a,amount:basicpay*(a?.value/100)}
    }
    if(a?.id==3){
        totalAmount=totalAmount+basicpay*(a?.value/100)
     return {...a,amount:basicpay*(a?.value/100)}
    }
    if(a?.id==3){
        totalAmount=totalAmount+basicpay*(a?.value/100)
     return {...a,amount:basicpay*(a?.value/100)}
    }
    if(a?.id==4){
        console.log(totalAmount)
     return {...a,amount:total-totalAmount}
    }
    
    return a
})

setEarning(arr)

 

  },[total])


  const totalEarning = useMemo(()=>{

return Earning?.reduce((prev,a)=>( prev+Number(a?.amount!)),0)
  },[Earning])

  const totalDeduction  = useMemo(()=>{

return Deduction?.reduce((prev,a)=>( prev+Number(a?.amount!)),0)
  },[Deduction])
  


  return (
    <div className='padding4rem' ref={componentRef} >
      <div style={{maxWidth:200,margin:'1rem auto'}}>
    {image == null ?   <div className="add-image" onClick={():void=>document.getElementById("hidden-input")?.click()}>
          <input type="file" id="hidden-input" hidden onChange={(e:React.FormEvent<HTMLInputElement>)=>setImage((e.target as HTMLInputElement)?.files?.[0]!)}></input>
         <i className="bi bi-card-image" style={{color:"#4f15d0",fontSize:'1.2rem',marginRight:10}}></i>
          Add Image 
        </div>
        :
        <div style={{position:'relative'}}>
        <Image src={URL.createObjectURL(image)} alt='cc' width={150} height={150} style={{objectFit:'contain'}} />
        { !print && (<i className="bi bi-x-circle-fill" style={{fontSize:18,color:"#F1416C",position:'absolute',top:'-30px',right:'-30px'}} onClick={()=>setImage(null)}></i>)}
        </div>
          }
          </div>
    <div className='invoice-number-box d-flex flex-column' style={{maxHeight:300,flexWrap:"wrap"}} >
    <div className='invoice-div' >
      
    <input value={"EMPOLOYEE NO"}   style={{fontWeight:500,borderBottom:'none'}} placeholder='Write'></input>
      <div >
      <input placeholder='1' style={{borderBottom:!print ? '1.5px solid grey':'none'}} className='' value={invoice?.no} onChange={(e)=>setinvoice({...invoice,["no"]:e.target.value})} ></input>
     
      </div>
   
    </div>
  
    <div className='invoice-div' >
    <input value={"DATE OF SALARY"}   style={{fontWeight:500,borderBottom:'none'}} placeholder='Write'></input>
      <input type="text" style={{borderBottom:!print ? '1.5px solid grey':'none'}}  value={invoice?.date} onChange={(e)=>setinvoice({...invoice,["date"]:e.target.value})} className=''></input>
    </div>
    { inputvalue?.map((e)=>{

      return <div className='invoice-div' key={e?.id} >
     
      <input placeholder='input Name' className='' name="name" value={e?.name} style={{borderBottom:'none',color:"BLACK",textTransform:'uppercase',fontWeight:500}} onChange={(event)=>handleinputfill(event,e?.id,inputvalue,setInputvalue)}></input>
      <input placeholder='value ' style={{borderBottom:!print ? '1.5px solid grey':'none'}} className='' name="value" value={e?.value} onChange={(event)=>handleinputfill(event,e?.id,inputvalue,setInputvalue)}></input>
     {!print && (<i className="bi bi-x-circle-fill" style={{fontSize:18,color:"#F1416C",}} onClick={()=>setInputvalue(inputvalue?.filter(elem=>elem?.id!=e?.id))}></i>)}
    </div>
    })

    }
    
    {!print && (<div className='invoice-div align-items-center' onClick={()=>setInputField(inputField+1)} style={{cursor:"pointer"}}>
      <i className="bi bi-plus-square" style={{color:"#4f15d0",fontSize:18}}></i>
      <p style={{marginBottom:0,fontWeight:600,fontSize:'0.9rem'}}>Add More Fields</p>
    </div>)}
 
    </div>
   <div className='salaryCalculate '>

<div className='left'>
    <h5 style={{background:"#4f15d0",padding:'1rem',marginBottom:0,color:'white',borderRadius: '12px 12px 0 0  '}}>Earning</h5>
    <div>
  {Earning?.map((a)=>{

    return  <div className=' salary-details between-div' key={a?.id} >
    <input value={a?.name} name="name" onChange={(e)=>handleinputfill(e,a?.id,Earning,setEarning)}  style={{fontWeight:500,borderBottom:'none',flex:1}} placeholder='Write'></input>

    <span>₹</span><input type="number" style={{borderBottom:!print ? '1.5px solid grey':'none'}}  value={Number(a?.amount)} onFocus={(e)=>(a?.amount==0 &&(e.target.value=""))}  name="amount" onChange={(e)=>handleinputfill(e,a?.id,Earning,setEarning)}></input>
     {!print && (<i className="bi bi-x-circle-fill" style={{fontSize:18,color:"#F1416C",marginLeft:20}} onClick={()=>setEarning(Earning?.filter(elem=>elem?.id!=a?.id))}></i>)}
    
</div>

  })}
    {!print && (<div className='invoice-div align-items-center' onClick={()=>setEarning([...Earning,{id:Earning.length,name:"",value:"",amount:0}])} style={{cursor:"pointer"}}>
      <i className="bi bi-plus-square" style={{color:"#4f15d0",fontSize:18}}></i>
      <p style={{marginBottom:0,fontWeight:600,fontSize:'0.9rem'}}>Add More Fields</p>
    </div>)}
   
    <div className=' salary-details between-div' >
    <input value={"Total Amount Earn "} name="name" disabled style={{fontWeight:500,borderBottom:'none',flex:1}}></input>
    <span>₹</span><input type="number" style={{borderBottom:!print ? '1.5px solid grey':'none'}}  value={totalEarning} disabled></input>
</div>
    <div className=' salary-details between-div' >
    <input value={"Total Salary"} name="name"  style={{fontWeight:500,borderBottom:'none',flex:1}}></input>
    <span>₹</span><input type="number" style={{borderBottom:!print ? '1.5px solid grey':'none'}}  value={total} onFocus={(e)=>(total==0 &&(e.target.value=""))}   onChange={(e)=>setTotal(Number(e.target.value))}></input>
</div>
    </div>
</div>
<div className='right'>
<h5 style={{background:"#4f15d0",padding:'1rem',marginBottom:0,color:'white',borderRadius: '12px 12px 0 0  '}}>Deduction</h5>
    <div>
  {Deduction?.map((a)=>{

    return   <div className=' salary-details between-div' key={a?.id} >
    <input value={a?.name} name="name" onFocus={(e)=>(a?.amount==0 &&(e.target.value=""))} onChange={(e)=>handleinputfill(e,a?.id,Deduction,setDeduction)} style={{fontWeight:500,borderBottom:'none',flex:1}} placeholder='Write'></input>
    <span>₹</span><input type="number" style={{borderBottom:!print ? '1.5px solid grey':'none'}} value={a?.amount} name="amount" onChange={(e)=>handleinputfill(e,a?.id,Deduction,setDeduction)}></input>
    {!print && (<i className="bi bi-x-circle-fill" style={{fontSize:18,color:"#F1416C",marginLeft:20}} onClick={()=>setDeduction(Deduction?.filter(elem=>elem?.id!=a?.id))}></i>)}
        
</div>

  })}
    {!print && (<div className='invoice-div align-items-center' onClick={()=>setDeduction([...Deduction,{id:Deduction.length,name:"",value:"",amount:0}])} style={{cursor:"pointer"}}>
      <i className="bi bi-plus-square" style={{color:"#4f15d0",fontSize:18}}></i>
      <p style={{marginBottom:0,fontWeight:600,fontSize:'0.9rem'}}>Add More Fields</p>
    </div>)}
    
    <div className=' salary-details between-div' >
    <input value={"Total Amount Dedc "} disabled name="name"  style={{fontWeight:500,borderBottom:'none',flex:1}}></input>
    <span>₹</span><input type="number" disabled style={{borderBottom:!print ? '1.5px solid grey':'none'}} value={totalDeduction} onFocus={(e)=>(totalDeduction==0 &&(e.target.value=""))}></input>
</div>
   
    </div>
</div>

   </div>
   <div className='d-flex justify-content-evenly ' style={{padding:'3rem 0',maxWidth:800,margin:'0 auto ',fontSize:18,fontWeight:500}}>
 <div>Net Amount <br/> ₹{(totalEarning-totalDeduction).toFixed(2)}</div>
 <div> =</div>
 <div>Total Earning <br/> ₹{totalEarning.toFixed(2)} </div>
 <div>-</div>
 <div>Total Deducction <br/> ₹{totalDeduction.toFixed(2)} </div>


   </div>
   <div className='center-div' style={{gridGap:30,margin:"3rem 0",}}>
    <p style={{maxWidth:700,textAlign:'center'}}>
   * Year to Date (YTD) amount will not be displayed against the salary component 
where there is previous Financial Year arrear amount is paid / deducted.
This is an auto generated payslip, therefore does not require a signature. If 
you have any questions regarding the contents of this payslip, please send an 
email to careers@TalkCharge.com. </p>

   </div>
   <p style={{margin:' 2rem 0 2rem auto',width:'fit-content',color:'grey'}}>Generated by Techninza </p>
    {!print && (<div className='center-div' style={{gridGap:30,margin:"3rem 0"}}>

<button className='btn-color' style={{background:"#dc5c5c"}} onClick={HandlePrint}>Print your slip</button>
    </div>)}
    </div>

  )
}

export default Page