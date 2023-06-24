
"use client"

import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import { Interface } from 'readline';
interface Billingaddress{
   name:string;
   home:string;
   streat:string;
   city:string;
   GSTIN:string;
   PAN:string;
   email:string;
   
   
   
   }
interface propsobj{
   print:boolean
   modal:boolean;
   setmodal: React.Dispatch<React.SetStateAction<boolean>>
   toggle:number;
   setToggle: React.Dispatch<React.SetStateAction<number>>
   addressForm:Billingaddress;
   billingAddress:Billingaddress;
   setAddressForm: React.Dispatch<React.SetStateAction<Billingaddress>>;
   setbillingAddress: React.Dispatch<React.SetStateAction<Billingaddress>>;
   
   
   }

const Billing = ({print,modal,toggle,addressForm,billingAddress,setAddressForm,setToggle,setmodal,setbillingAddress}:propsobj) => {
 

    const handleInput =(e:React.ChangeEvent<HTMLInputElement>):void=>{

            toggle==1 ?setAddressForm({...addressForm,[e.target.name]:e.target.value}) :setbillingAddress({...billingAddress,[e.target.name]:e.target.value})
            


    }
  return (
    <>
    <div className='center-div billed' style={{gridGap:30}}>
    <div className='billed-by'>
    <h4 >Billed By </h4>
    <span style={{color:"grey",fontSize:'0.8rem'}}>( your Details )</span>

   {!print && (<select>
        <option selected hidden>select address</option>
    </select>)} 
    {
        addressForm?.name  ?
        <div className='add-billing ' style={{flexDirection:'column'}}> 
        <div className='between-div'> 
        <h5 style={{display:'inline-block'}}>Business Details </h5>
         {!print && (<span style={{color:'#4f15d0',fontSize:'0.9rem',cursor:'pointer'}} onClick={()=>{setmodal(true);setToggle(1)}}>Edit</span>)}
        </div>

        <div className='d-flex' style={{gridGap:30,margin:"1rem 0"}}>
           <span style={{color:"#6e757feb",fontWeight:600,minWidth:120}}>Business Name </span> 
           <span style={{fontWeight:600,}}>{addressForm?.name}</span> 
        </div>
        <div className='d-flex' style={{gridGap:30,margin:"1rem 0"}}>
           <span style={{color:"#6e757feb",fontWeight:600,minWidth:120}}>Address </span> 
           <span style={{fontWeight:600}}>{addressForm?.home},{addressForm?.streat},{addressForm?.city}</span> 
        </div>
        <div className='d-flex' style={{gridGap:30,margin:"1rem 0"}}>
           <span style={{color:"#6e757feb",fontWeight:600,minWidth:120}}>GSTIN</span> 
           <span style={{fontWeight:600,textTransform:'uppercase'}}>{addressForm?.GSTIN}</span> 
        </div>
        <div className='d-flex' style={{gridGap:30,margin:"1rem 0"}}>
           <span style={{color:"#6e757feb",fontWeight:600,minWidth:120}}>PAN </span> 
           <span style={{fontWeight:600,textTransform:'uppercase'}}>{addressForm?.PAN}</span> 
        </div>
        <div className='d-flex' style={{gridGap:30,margin:"1rem 0"}}>
           <span style={{color:"#6e757feb",fontWeight:600,minWidth:120}}>Email </span> 
           <span style={{fontWeight:600}}>{addressForm?.email}</span> 
        </div>
        
        
        </div>
    :
        <div className='add-billing center-div' style={{flexDirection:'column'}}>  

        <p>Select your address</p>
        <p>or</p>
        <button className=' btn-color' onClick={()=>{setmodal(true);setToggle(1)}} ><i className="bi bi-plus-circle-fill" style={{marginRight:10}}></i>Add New Address</button>
    </div>

    }
      
    
    </div>
    <div className='billed-to'>
    <h4 >Billed To </h4>
    <span style={{color:"grey",fontSize:'0.8rem'}}>( your Details )</span>

    {!print && (<select>
        <option selected hidden>select address</option>
    </select>)}
    {
        billingAddress?.name  ?
        <div className='add-billing ' style={{flexDirection:'column'}}> 
        <div className='between-div'> 
        <h5 style={{display:'inline-block'}}>Business Details </h5>
        {!print && (<span style={{color:'#4f15d0',fontSize:'0.9rem',cursor:'pointer'}} onClick={()=>{setmodal(true);setToggle(2)}}>Edit</span>)}
        </div>

        <div className='d-flex' style={{gridGap:30,margin:"1rem 0"}}>
           <span style={{color:"#6e757feb",fontWeight:600,minWidth:120}}>Business Name </span> 
           <span style={{fontWeight:600,}}>{billingAddress?.name}</span> 
        </div>
        <div className='d-flex' style={{gridGap:30,margin:"1rem 0"}}>
           <span style={{color:"#6e757feb",fontWeight:600,minWidth:120}}>Address </span> 
           <span style={{fontWeight:600}}>{billingAddress?.home},{billingAddress?.streat},{billingAddress?.city}</span> 
        </div>
        <div className='d-flex' style={{gridGap:30,margin:"1rem 0"}}>
           <span style={{color:"#6e757feb",fontWeight:600,minWidth:120}}>GSTIN</span> 
           <span style={{fontWeight:600,textTransform:'uppercase'}}>{billingAddress?.GSTIN}</span> 
        </div>
        <div className='d-flex' style={{gridGap:30,margin:"1rem 0"}}>
           <span style={{color:"#6e757feb",fontWeight:600,minWidth:120}}>PAN </span> 
           <span style={{fontWeight:600,textTransform:'uppercase'}}>{billingAddress?.PAN}</span> 
        </div>
        <div className='d-flex' style={{gridGap:30,margin:"1rem 0"}}>
           <span style={{color:"#6e757feb",fontWeight:600,minWidth:120}}>Email </span> 
           <span style={{fontWeight:600}}>{billingAddress?.email}</span> 
        </div>
        
        
        </div>
    :
        <div className='add-billing center-div' style={{flexDirection:'column'}}>  

        <p>Select your address</p>
        <p>or</p>
        <button className=' btn-color' onClick={()=>{setmodal(true);setToggle(2)}} ><i className="bi bi-plus-circle-fill" style={{marginRight:10}}></i>Add New Client </button>
    </div>

    }
      
    
    </div>
    </div>
    <Modal show={modal} onHide={()=>setmodal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add billing Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className="inputwrapper">
 <p className='span-text-dark' > Billing Name</p>
  <input type="text" className="form-input" placeholder='Billing Name' value={ toggle==1 ?  addressForm?.name:billingAddress?.name} name="name"  onChange={handleInput}></input>
       </div>
        <div className="inputwrapper">
 <p className='span-text-dark' > Home</p>
  <input type="text" className="form-input" placeholder='House no / building no / flat no' value={toggle==1 ?  addressForm?.home:billingAddress?.home}  name="home"  onChange={handleInput}></input>
       </div>
        <div className="inputwrapper">
 <p className='span-text-dark' > Streat / Locality</p>
  <input type="text" className="form-input" placeholder='Streat / Locality' value={toggle==1 ?  addressForm?.streat:billingAddress?.streat}  name="streat"  onChange={handleInput}></input>
       </div>
        <div className="inputwrapper">
 <p className='span-text-dark' > City (State)</p>
  <input type="text" className="form-input" placeholder='City (State)' value={toggle==1 ?  addressForm?.city:billingAddress?.city}  name="city"  onChange={handleInput}></input>
       </div>
        <div className="inputwrapper">
 <p className='span-text-dark' > GSTIN</p>
  <input type="text" className="form-input"  style={{textTransform:'uppercase'}} placeholder='4825SF7825G7CD5' value={toggle==1 ?  addressForm?.GSTIN:billingAddress?.GSTIN} name="GSTIN"  onChange={handleInput} ></input>
       </div>
        <div className="inputwrapper">
 <p className='span-text-dark' > PAN</p>
  <input type="text" style={{textTransform:'uppercase'}} className="form-input" placeholder='IMIPK5637K' value={toggle==1 ?  addressForm?.PAN:billingAddress?.PAN}  name="PAN"  onChange={handleInput}></input>
       </div>
        <div className="inputwrapper">
 <p className='span-text-dark' > Email</p>
  <input type="text" className="form-input" placeholder='Email' value={toggle==1 ?  addressForm?.email:billingAddress?.email} name="email"  onChange={handleInput}></input>
       </div>
       




        </Modal.Body>
        <Modal.Footer>
        <button className='btn-color' style={{color:"#4f15d0",background:"#4c15c50f"}} onClick={()=>setmodal(false)} >Close  </button>
          <button className='btn-color' onClick={()=>setmodal(false)}>Add new Address </button>
        </Modal.Footer>
      </Modal>
    
    </>
  )
}

export default Billing