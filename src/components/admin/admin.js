import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"

// trang admin có những gì?
// sidebar -- các chức năng | chức năng A
//                          | chức năng B  
//                          | chức năng thứ n              



const Admin = () => {
    return (

        <div className='bg-white'>
          <div className="m-2">
            <i className ='bi bi-bootstrap-fill me-2 fs-4'></i>
            <span className='brand-name fs-4'> Admin page</span>
          </div>
          <hr className='text-dark' />
          <div className='list-group list-group-flush'>
            <a className='list-group-item py-2'> 
              <i className='bi bi-speedometer2 fs-5 me-2' > </i>
              <span> Chức năng A</span>
            </a>
    
            <a className='list-group-item py-2'> 
              <i className='bi bi-house fs-5 me-2'> </i>
              <span> Chức năng B</span>
            </a>
          </div>
        </div>
      );
};
export default Admin;