import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function AddCustomer() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    function handleCust(e){
        e.preventDefault()
        let custObj={name,email}
        let url = 'http://localhost:8000/customer'
        fetch(url,{
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify(custObj)
        }).then((res)=>{
            if(res.ok){
                toast.success('Added Successfully')
            }
        }).then((data)=>{
            setName('')
            setEmail('')
            console.log(data)
        }).catch((error)=>{
            toast.error('Error occured by '+error.message)
        })
    }
    return(
        <>
            <div className="container">
                <div className="row py-3">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                    <form  onSubmit={handleCust}>
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title text-center">
                                    <h3>Add Customer</h3>
                                </div>
                            </div>
                            
                            <div className="card-body">
                                
                                    <div className="from-group">
                                        <label>Name</label>
                                        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter Your Name.." required className="form-control" />
                                    </div>
                                    <div className="from-group mt-2">
                                        <label>Email</label>
                                        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter Your email.." required className="form-control" />
                                    </div>
                               
                            </div>
                            <div className="card-footer">
                                <input type="submit" value="Add Customer" className="btn btn-primary" />
                                <Link className='btn btn-warning ms-3' to='/customer'>Go Back</Link>
                            </div>
                            
                        </div>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}