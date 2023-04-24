import React, { useEffect, useState } from "react";
import ShowProductData from "../../components/Admin/ShowProductData";
import ShowUserData from "../../components/Admin/ShowUserData";
import AdminNavbar from "../../components/Admin/Navbar/Navbar";

const ShowMainData = (props) => {
	const [allUsers, setAllUsers] = useState([]);
	const [allProducts, setAllProducts] = useState([]);

	const getAllProducts = async () => {
		const products = await fetch("https://ecohubserver.azurewebsites.net/products");
		let productsJson = await products.json();
		// productsJson = JSON.parse(productsJson);
		// console.log(typeof(productsJson));
		// console.log(productsJson);
		setAllProducts(productsJson);
	};

	const getAllUsers = async () => {
		const users = await fetch("https://ecohubserver.azurewebsites.net/users");
		let usersJson = await users.json();
		console.log(usersJson);
		// usersJson = JSON.parse(usersJson);
		setAllUsers(usersJson);
	};

	useEffect(() => {
		getAllUsers();
		getAllProducts();
	}, []);

	return (
		<>
			<AdminNavbar onLogout={props.onLogout} />
			<ShowUserData users={allUsers} />
			<ShowProductData products={allProducts} />
		</>
	);
};

export default ShowMainData;
