import React from "react";
import Navbar from "../../components/Navbar/Navbar";

import "./user-profile.css";

const UserDetails = (props) => {
	// console.log(props.user)
	
	return (
		<div>
			<Navbar />
			<div className="container-up middle">
				<div className="outer">
					<div
						id="userprofilepage"
						className="profile-nav col-md-14 middle">
						<div className="panel">
							<div className="container-up user-heading round">
								<a href="/user-profile">
									<img
										src={props.user.img_url}
										alt="User"
										className="profileImage"
									/>
								</a>

								<h1 style={{ fontSize: 28 }}>
									<br />
									{props.user.fullname}
								</h1>
								<p><b>Your Unique User ID: </b> &nbsp;&nbsp; {props.user._id}</p>
							</div>
						</div>

						<div>
							<h1 style={{ textAlign: "center", fontSize: 50 }}>
								<b>User details</b>
							</h1>
							<div className="row">
								<div>
									<h5 style={{ textAlign: "center" }}>
										{props.user.username}
									</h5>
								</div>
								<div>
									<h5 style={{ textAlign: "center" }}>
										{props.user.fullname}
									</h5>
								</div>
								<div>
									<h5 style={{ textAlign: "center" }}>
										{props.user.city}, India.
									</h5>
								</div>

								<div>
									<h5 style={{ textAlign: "center" }}>
										{props.user.email}
									</h5>
								</div>

								<div style={{ textAlign: "center" }}>
									<br />
									<button
										type="button"
										className="btn btn-outline-primary">
										<a
											href="/update-profile"
											style={{ textDecoration: "none" }}>
											Update Profile
										</a>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<footer className="bg-light pb-5">
				<div className="container-up text-center">
					<p className="font-italic text-muted mb-0">
						&copy; Ecohub.com All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default UserDetails;
