import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"

export default function EditCustomer() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const {id}=useParams()
    useEffect(()=>{
        let url = 'http://localhost:8000/customer/'+id
        fetch(url).then((res)=>{
            if(res.ok){
                return res.json()
            }
        }).then((data)=>{
            setName(data.name)
            setEmail(data.email)
            
        }).catch((error)=>{
            toast.error('Error occured by '+error)
        })
    },[])
    function handleCust(e){
        e.preventDefault()
        let custObj={name,email}
        let url = 'http://localhost:8000/customer/'+id
        fetch(url,{
            headers:{
                "Content-Type":"application/json"
            },
            method:"PUT",
            body:JSON.stringify(custObj)
        }).then((res)=>{
            if(res.ok){
                toast.success('Update Successfully')
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
                                    <h3>Update Customer</h3>
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
                                <input type="submit" value="Update Customer" className="btn btn-primary" />
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