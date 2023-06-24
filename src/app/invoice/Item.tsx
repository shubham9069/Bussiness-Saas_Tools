'use client'

import Image from 'next/image';
import React,{useMemo, useState,useRef} from 'react'



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
interface itemprop{
  Attachment:FileList | null;
  setAttachment:React.Dispatch<React.SetStateAction<FileList | null>>
  signature:File | null;
  setSignature:React.Dispatch<React.SetStateAction<File | null>>
  noofinput:number;
  setnoofinput:React.Dispatch<React.SetStateAction<number>>;
  item:item[];
  setitem:React.Dispatch<React.SetStateAction<item[]>>;
  print:boolean
}
const Item = ({print,Attachment,setAttachment,signature,setSignature,noofinput,setnoofinput,item,setitem}:itemprop) => {



  const inputmemo=useMemo(()=>{
    var obj:item ={
      id:noofinput,
      name:"",
      gst: 0,
      quantity: 1,
      rate: 0,
      amount: 0,
      cgst: 0,
      sgst: 0,
      total: 0,
    }

    setitem([...item,obj])
    
  },[noofinput])

  function handlechange(e:React.ChangeEvent<HTMLInputElement>,id:number){

    var arr:item[]=item?.map((a):item=>{
      
      if(a?.id == id) {
        var obj={...a,[e.target.name]:e.target.value, }
        console.log(obj)
       return {...obj,
        amount:obj?.quantity*obj?.rate,
        cgst:((obj?.quantity*obj?.rate) * (obj?.gst/100))/2,
        sgst:((obj?.quantity*obj?.rate) * (obj?.gst/100))/2,
        total:((obj?.quantity*obj?.rate) * (obj?.gst/100))+obj?.quantity*obj?.rate,
        }
      }
        else{
          return a
        }
         
    })

setitem(arr)


  }

  const calculate =useMemo(()=>{
interface calobj{
  amount:number;
  CGST:number;
  SGST:number;
  total:number;
}

let obj:calobj = {
  amount:0,
  CGST:0,
  SGST:0,
  total:0
}
    
      item?.forEach((a)=>{
       
        
          obj.amount = obj.amount+a?.amount 
          obj.CGST =  obj.CGST + a?.cgst
          obj.SGST = obj.SGST+a?.sgst
          obj.total = obj.total+a?.total
          
      })
    
return obj
  },[item])



  return (
    <>
    
    <table className='input-table'>
    <thead>
  <tr>
    <th>item</th>
    <th>GST Rate </th>
    <th>Quantity</th>
    <th>Rate </th>
    <th>Amount </th>
    <th>CGST</th>
    <th>SGST</th>
    <th>Total</th>
    <th></th>
  </tr>
  </thead>
  <tbody>
{item?.map((a,i)=>{

return <tr key={a?.id}>
 
    <td><input style={{width:200,borderBottom:!print ? '1.5px solid #bdbdbd':'none'}} placeholder='item name (required)' value={a?.name} name="name" onChange={(e)=>handlechange(e,a?.id)}></input></td>
    <td><input style={{width:50,borderBottom:!print ? '1.5px solid #bdbdbd':'none'}} type='number' value={a?.gst} name="gst"  onChange={(e)=>handlechange(e,a?.id)}></input> <span>%</span></td>
    <td><span ></span><input style={{width:50,borderBottom:!print ? '1.5px solid #bdbdbd':'none'}} type='number'   value={a?.quantity} name="quantity"  onChange={(e)=>handlechange(e,a?.id)}></input></td>
    <td><span>₹</span><input style={{width:70,borderBottom:!print ? '1.5px solid #bdbdbd':'none'}} type='number'  value={a?.rate} name="rate"  onChange={(e)=>handlechange(e,a?.id)}></input ></td>
    <td><span style={{color:"grey"}}>₹</span><input style={{width:70,borderBottom:!print ? '1.5px solid #bdbdbd':'none'}} type='number' disabled  value={a?.amount} name="amount"  onChange={(e)=>handlechange(e,a?.id)}></input></td>
    <td><span style={{color:"grey"}}>₹</span><input style={{width:70,borderBottom:!print ? '1.5px solid #bdbdbd':'none'}} type='number'   disabled value={a?.cgst} name="cgst" ></input></td>
    <td><span style={{color:"grey"}}>₹</span><input style={{width:70,borderBottom:!print ? '1.5px solid #bdbdbd':'none'}} type='number'  disabled  value={a?.sgst} name="sgst"  ></input></td>
    <td><span style={{color:"grey"}}>₹</span><input  style={{width:100,borderBottom:!print ? '1.5px solid #bdbdbd':'none'}}type='number'  disabled value={a?.total} name="total" ></input></td>
    <td>{!print && (<i className="bi bi-x-circle-fill" style={{fontSize:18,color:"#F1416C"}} onClick={()=>setitem(item?.filter(elem=>elem?.id!=a?.id))}></i>)}</td>
   
  
  {/* <tr>
   <div className='d-flex ' style={{gridGap:30}}>
  <div className='d-flex align-items-center'  style={{cursor:"pointer",gridGap:15}}>
        <i className="bi bi-plus-square" style={{color:"#4f15d0",fontSize:18}}></i>
        <p style={{marginBottom:0,fontWeight:600,fontSize:'0.9rem'}}>Add Description</p>
      </div>
  <div className='d-flex align-items-center'  style={{cursor:"pointer",gridGap:15}}>
        <i className="bi bi-plus-square" style={{color:"#4f15d0",fontSize:18}}></i>
        <p style={{marginBottom:0,fontWeight:600,fontSize:'0.9rem'}}>Add thumblains</p>
      </div>
      </div>
      </tr> */}
      </tr>
})
}
  </tbody>
 
</table>
    
 {!print && (<button style={{ width:'100%',padding:'0.85rem ',background:"#f6f9ff",border:'2px dotted #cac9c9c9',fontWeight:500,borderRadius:6}} onClick={()=>setnoofinput(noofinput+1)}>
 <i className="bi bi-plus-square" style={{color:"#4f15d0",fontSize:'1.1rem',marginRight:10}} ></i>Add New Line </button> )}  
    
 <div className='' style={{margin:'2rem 0 2rem auto',width:300}} >

<div className="price-details between-div ">
  <p>Amount</p>
  <span>₹ {calculate?.amount}</span>
  </div>    
<div className="price-details between-div ">
  <p>SGST</p>
  <span>₹{calculate?.SGST}</span>
  </div>    
<div className="price-details between-div ">
  <p>CGST</p>
  <span>₹{calculate?.CGST}</span>
  </div> 

  <div className="price-details between-div ">
  <p style={{fontSize:'0.9rem',color:'#505367'}}> <i className="bi bi-tag" style={{fontSize:'1rem',color:'#4f15d0',marginRight:10}}></i>Add more discount </p>
 
  </div> 


  <div style={{width:'100%',height:2,background:'grey' ,marginBottom:10}}></div> 
      
    
    <div className="price-details between-div ">
      <p style={{fontSize:22}}>Total (INR)</p>
      <span style={{fontSize:20}}>₹{calculate?.total}</span>
  </div>
  </div> 
  {!print ?   
  <div className='d-flex ' style={{gridGap:20}}>
  <div className="add-image">
        <i className="bi bi-card-list" style={{color:"#4f15d0",fontSize:'1.2rem',marginRight:10}}></i>
          Add note  
        </div>
       
        
        {Attachment == null ?   <div className="add-image"  onClick={():void=>document.getElementById("hidden-input3")?.click()}>
          <input type="file" multiple id="hidden-input3" hidden onChange={(e:React.FormEvent<HTMLInputElement>)=>setAttachment((e.target as HTMLInputElement)?.files!)}></input>
        <i className="bi bi-card-image" style={{color:"#4f15d0",fontSize:'1.2rem',marginRight:10}}></i>
          Add Attachments
        </div>
        :
        
        <div style={{position:'relative'}}>
          {Array.from(Attachment)?.map((a)=>{

            return <Image key={a?.name} src={URL.createObjectURL(a)} alt='cc' width={150} height={150} style={{objectFit:'contain'}} />
          })}
        
        <i className="bi bi-x-circle-fill" style={{fontSize:18,color:"#F1416C",position:'absolute',top:'-30px',right:'-30px'}} onClick={()=>setAttachment(null)}></i>
        </div>
          }
        {signature == null ?   <div className="add-image" style={{margin:'0 0 0 auto'}}  onClick={():void=>document.getElementById("hidden-input2")?.click()}>
          <input type="file" id="hidden-input2" hidden onChange={(e:React.FormEvent<HTMLInputElement>)=>setSignature((e.target as HTMLInputElement)?.files?.[0]!)}></input>
        <i className="bi bi-card-image" style={{color:"#4f15d0",fontSize:'1.2rem',marginRight:10}}></i>
          Add Signature
        </div>
        :
        <div style={{position:'relative',margin:'0 0 0 auto'}}>
        <Image src={URL.createObjectURL(signature)} alt='cc' width={150} height={150} style={{objectFit:'contain'}} />
        <i className="bi bi-x-circle-fill" style={{fontSize:18,color:"#F1416C",position:'absolute',top:'-30px',right:'-30px'}} onClick={()=>setSignature(null)}></i>
        </div>
          }
  </div>
  
  :  <div className='d-flex ' style={{gridGap:20}}>
  <div className="add-image">
        <i className="bi bi-card-list" style={{color:"#4f15d0",fontSize:'1.2rem',marginRight:10}}></i>
          Add note  
        </div>
       
        
        {Attachment == null ? ""
        :
        
        <div style={{position:'relative'}}>
          {Array.from(Attachment)?.map((a)=>{

            return <Image key={a?.name} src={URL.createObjectURL(a)} alt='cc' width={150} height={150} style={{objectFit:'contain'}} />
          })}
        </div>
          }
        {signature == null ? ""
        :
        <div style={{position:'relative',margin:'0 0 0 auto'}}>
        <Image src={URL.createObjectURL(signature)} alt='cc' width={150} height={150} style={{objectFit:'contain'}} />
       
        </div>
          }
  </div>}

    
    </>
  )
}

export default Item