import React, { useRef } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import electriccab from "../../lotties/electric-cab.json";
import { generateDefaultOptions } from "../../util/utils";
import { useSelector } from "react-redux";
import axios from "axios";

const Cabrequest = () => {
	const userDetails = useSelector((state) => state.userDet);

	const fromRef = useRef("");
	const toRef = useRef("");
	const phoneNumberRef = useRef("");
	const DateTimeRef = useRef("");
	const standardRadioRef = useRef();
	const minivanRadioRef = useRef();
	const businessRadioRef = useRef();
	const VIPRadioRef = useRef();

	// const navigate = useNavigate();

	const navigate = useNavigate();

	const submitHandler = async (event) => {
		event.preventDefault();
		// console.log(userDetails);
		const currentDate = Date.now();
		const selectedDate = Date.parse(DateTimeRef.current.value);
		if (currentDate > selectedDate) {
			alert("Please select valid date");
			return;
		}
		console.log(currentDate, selectedDate);
		let selectedCar = "invalid";
		if (standardRadioRef.current.checked) {
			selectedCar = "Standard";
		} else if (minivanRadioRef.current.checked) {
			selectedCar = "Minivan";
		} else if (businessRadioRef.current.checked) {
			selectedCar = "Business";
		} else if (VIPRadioRef.current.checked) {
			selectedCar = "VIP";
		}
		console.log(selectedCar);
		const details = {
			from: fromRef.current.value,
			to: toRef.current.value,
			selectedCar: selectedCar,
			selectedTime: selectedDate,
			phoneNumber: phoneNumberRef.current.value,
		};
		console.log(details);
		alert(
			"Booking has been done, Please check your email for confirmation of booking"
		);
		await axios.post(
			"https://ecohub-mern-server.onrender.com/cabservice/new-request",
			{
				userDetails: userDetails,
				bookingDetails: details,
			}
		);
		navigate("/");
	};

	return (
		<>
			<section className="container">
				<div className="row main-cab">
					<div className="text col col-lg-20 col-md-20 col-12 w-50 mx-auto cabformclass">
						<form className=" form-card" onSubmit={submitHandler}>
							<div className="row USER-DETAILS justify-content-between text-left">
								<div className="input-box col-sm-6 flex-column d-flex">
									{" "}
									<label className="form-control-label px-3">
										From:<span className="details"> *</span>
									</label>{" "}
									<input
										type="text"
										placeholder="Enter your pickup location"
										required
										ref={fromRef}
										className="cab_input"
									/>{" "}
								</div>
								<div className="input-box col-sm-6 flex-column d-flex">
									{" "}
									<label className="form-control-label px-3">
										To:<span className="details"> *</span>
									</label>{" "}
									<input
										type="text"
										placeholder="Enter your drop location"
										required
										ref={toRef}
										className="cab_input"
									/>{" "}
								</div>
							</div>
							<div className="row USER-DETAILS justify-content-between text-left">
								<div className="input-box col-sm-6 flex-column d-flex">
									{" "}
									<label className="form-control-label px-3">
										Phone number:
										<span className="details"> *</span>
									</label>{" "}
									<input
										type="text"
										placeholder="Enter phone number:"
										required
										id="phone"
										defaultValue={userDetails.phone_number}
										ref={phoneNumberRef}
										className="cab_input"
									/>{" "}
								</div>
								<div className="input-box col-sm-6 flex-column d-flex">
									{" "}
									<label className="form-control-label px-3">
										Date and Time:
										<span className="details"> *</span>
									</label>{" "}
									<input
										type="datetime-local"
										className="cab_input"
										ref={DateTimeRef}
										required
									/>
								</div>
							</div>

							<br />
							<br />
							<div>
								<div className="category">
									<div className="form-check form-check-inline">
										<input
											className="form-check-input cab_form_input "
											type="radio"
											name="Cab"
											id="Radios"
											value="Standard"
											ref={standardRadioRef}
											required
										/>
										<label
											className="form-check-label"
											for="inlineRadio1">
											Standard{" "}
										</label>
									</div>

									<div className="form-check form-check-inline">
										<input
											className="form-check-input cab_form_input"
											type="radio"
											name="Cab"
											id="Radios"
											value="Minivan"
											ref={minivanRadioRef}
										/>
										<label
											className="form-check-label"
											for="inlineRadio1">
											Minivan{" "}
										</label>
									</div>

									<div className="form-check form-check-inline">
										<input
											className="form-check-input cab_form_input"
											type="radio"
											name="Cab"
											id="Radios"
											value="Business"
											ref={businessRadioRef}
										/>
										<label
											className="form-check-label"
											for="inlineRadio1">
											Business{" "}
										</label>
									</div>

									<div className="form-check form-check-inline">
										<input
											className="form-check-input cab_form_input"
											type="radio"
											name="Cab"
											id="Radios"
											value="VIP"
											ref={VIPRadioRef}
										/>
										<label
											className="form-check-label"
											for="inlineRadio1">
											VIP{" "}
										</label>
									</div>
								</div>
							</div>

							<br />
							<br />
							<br />

							<div className="mx-auto d-grid gap-2 col-6">
								<button
									className="btn1 btn-secondary btn-lg cab_button"
									type="submit"
									value="Get Taxi">
									Get Taxi
								</button>
							</div>
						</form>
					</div>

					{/* <div className="img col d-none d-md-flex" data-aos="fade-up">
                      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js">
                          var anim; var elem = document.getElementById('bodymovin2')
                          var animData = {container: elem, renderer: 'svg', loop: true, autoplay: true, rendererSettings: {progressiveLoad: false, preserveAspectRatio: 'xMaxYMax slice' }, path: 'data4.json' }; anim = bodymovin.loadAnimation(animData);
                      </script>
                      <div className="container" style="height: 500px;  transition:0.5s;">
                          <lottie-player src="https://assets7.lottiefiles.com/private_files/lf30_hsabbeks.json"
                              background="rgba(255, 255, 255, 1.0)" speed="1" loop autoplay id="bodymovin2"></lottie-player>
                      </div>
                  </div> */}
					<Lottie
						options={generateDefaultOptions(electriccab)}
						height={500}
						width={550}></Lottie>
				</div>
			</section>
			<br /> <br />
			<br />
		</>
	);
};

export default Cabrequest;
