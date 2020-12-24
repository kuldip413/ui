import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const BoardAdmin = () => {
  return(
  		<div>
	        <form>
	            <div className="form-group">
	                <label>Delete User by id</label>
	                <input 
	                    type="email" 
	                    className="form-control" 
	                    placeholder="Enter id" />
	            </div>
	            <button type="submit" className="btn btn-primary btn-block">Submit</button>
	        </form>
	        <form>
	            <div className="form-group">
	                <label>Restore deleted User</label>
	                <input 
	                    type="email" 
	                    className="form-control" 
	                    placeholder="Enter id" />
	            </div>
	            <button type="submit" className="btn btn-primary btn-block float-right">Restore</button>
	        </form>
	        <form> 
	        	<h6>Find all users in database</h6>
	            <button type="submit" className="btn btn-primary btn-block">find</button>
	        </form>
	        <form> 
	        	<h6>Register a User users</h6>
	            <button type="submit" className="btn btn-primary btn-block">register</button>
	        </form>
        </div>
	);
};

export default BoardAdmin;