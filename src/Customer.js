import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Customer = () => {
    const [custlist, custupdate] = useState([]);
    const [haveedit, editchange] = useState(false);
    const [haveview, viewchange] = useState(false);
    const [haveadd, addchange] = useState(false);
    const [haveremove, removechange] = useState(false);

    const navigate=useNavigate();


    useEffect(() => {
        GetUserAccess();
        loadcustomer();
       
    }, []);

    const loadcustomer = () => {
        fetch("http://localhost:8000/customer").then(res => {
            if (!res.ok) {
                return false
            }
            return res.json();
        }).then(res => {
            custupdate(res)
        });
    }

    const GetUserAccess = () => {
        const userrole = sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole').toString() : '';
        fetch("http://localhost:8000/roleaccess?role=" + userrole + "&menu=customer").then(res => {
            if (!res.ok) {
                navigate('/');
            toast.warning('You are not authorized to access');
                return false;
            }
            return res.json();
        }).then(res => {
            console.log(res);
            if (res.length > 0) {
                viewchange(true);
                let userobj = res[0];
                editchange(userobj.haveedit);
                addchange(userobj.haveadd);
                removechange(userobj.havedelete);
            }else{
                navigate('/');
            toast.warning('You are not authorized to access');
            }
        })
    }

    const handleadd = () => {
        if(haveadd){
        // toast.success('added')
        navigate('/add-customer')
        }else{
            toast.warning('You are not having access for add! please contact admin');
        }
    }
    const handleedit = (id) => {
        if(haveedit){
        // toast.success('edited')
        navigate('/edit-customer/'+id)
        }
        else{
            toast.warning('You are not having access for Edit! please contact admin');
        }
    }

    const handleremove = (id) => {
        if(haveremove){
        // toast.success('removed')
        let url = 'http://localhost:8000/customer/'+id
        fetch(url,{
            method:"DELETE",
        }).then((res)=>{
            if(res.ok){
                toast.success('Removed Successfully')
            }
        }).then((data)=>{
            // console.log(data)
           setTimeout(()=>{
            window.location.reload(true)
           },3000)
        }).catch((error)=>{
            toast.error('Error occured by '+error.message)
        })
        }else{
            toast.error('You are not having access for remove! please contact admin');
        }
    }


    return (
        <div className="container">

            <div className="card">
                <div className="card-header">
                    <h3>Customer Listing</h3>
                </div>
                <div className="card-body">
                    <button onClick={handleadd} className="btn btn-success">Add (+)</button>
                    <br></br>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {custlist &&
                                custlist.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button onClick={()=>{handleedit(item.id)}} className="btn btn-primary">Edit</button> |
                                            <button onClick={()=>{handleremove(item.id)}} className="btn btn-danger">Remove</button>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Customer;