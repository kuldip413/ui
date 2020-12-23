import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const normalUser = () => {
	return(
		<div>
			<h1>normalUser</h1>
		</div>
	);
};

export default normalUser;