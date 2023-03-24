import React, { useEffect, useState } from "react";
import Nexon from "./nexon.jpg";
import E20 from "./e20.jpg";
import Volvo from "./volvo.jpg";
import XC40 from "./xc40.jpg";
import { Link } from "react-router-dom";

const UpcomingCars = () => {
	const [allvehicle, setAllvehicles] = useState([]);

	useEffect(() => {
		const getAllvehicles = async () => {
		const temp = await fetch("http://localhost:5000/allvehicles/");
		// console.log('hi')
		// console.log(temp)
		console.log('bye')
		const tempJson = await temp.json();
		console.log(tempJson)
		console.log(tempJson.article);
		setAllvehicles(tempJson);
		};
		getAllvehicles();
	}, []);
	let img;
	return (
		<>
			<br />
			<br />
			<div className="section1">
				<h1>Upcoming Electric Cars</h1>

				<p>
					Here are all upcoming electric cars which are expected to
					launch in India in the year 2022-2023. The popular upcoming
					electric cars include Tata Altroz EV, Haima Bird Electric
					EV1 and Tesla Cybertruck.
				</p>
				<div className="grid">
					{allvehicle.map((vehicle) => {
						if(vehicle.title =='Tata Nexon'){
							img=Nexon;
						}
						else if(vehicle.title =='Mahindra E20 Plus'){
							img=E20;
						}
						else if(vehicle.title =='Mercedes Benz EQS'){
							img=Volvo;
						}
						else{
							img=XC40;
						}
						return (
						<figure className="effect-sarah">
							<img className="image__img" src={img} alt="service" />
							<figcaption>
								<h2>
									<span className="newCar">{vehicle.title}</span>
								</h2>
								<p>
									{vehicle.desc}
								</p>
								<Link to="/ev_cars/tata-nexon">View more</Link>
							</figcaption>
						</figure>
						);
					})}
					{/* <figure className="effect-sarah">
						<img className="image__img" src={Nexon} alt="service" />
						<figcaption>
							<h2>
								<span className="newCar">Tata Nexon EV</span>
							</h2>
							<p>
								Available for starting price of Rs 13.99 lakh ,
								the Nexon EV comes with a range of 312 km on a
								single charge, fast charging capability,
								extended battery life and className-leading
								safety features.
							</p>
							<Link to="/ev_cars/tata-nexon">View more</Link>
						</figcaption>
					</figure>
					<figure className="effect-sarah">
						<img className="image__img" src={E20} alt="products" />
						<figcaption>
							<h2>
								<span className="newCar">
									Mahindra e2O Plus
								</span>
							</h2>
							<p>
								Its Starting price is 7.48 lakh which can be
								affored easyily and extended battery life and
								className-leading safety features
							</p>
							<Link to="/ev_cars/mahindra-e20">View more</Link>
						</figcaption>
					</figure>
					<figure className="effect-sarah">
						<img className="image__img" src={Volvo} alt="volvo" />
						<figcaption>
							<h2>
								<span className="newCar">
									Mercedes Benz EQS
								</span>
							</h2>
							<p>
								With a rumoured global debut on the 15th of this
								month, the EQS is set to be Mercedes' flagship
								electric car, with a new build that is set to
								sustain as the Germans' standard for future EVs.
							</p>
							<Link to="/ev_cars/benz-eqs">View more</Link>
						</figcaption>
					</figure>
					<figure className="effect-sarah">
						<img className="image__img" src={XC40} alt="xc40" />
						<figcaption>
							<h2>
								<span className="newCar">
									Volvo XC40 recharge
								</span>
							</h2>
							<p>
								Its Starting price is 7.48 lakh which can be
								affored easyily and extended battery life and
								className-leading safety features
							</p>
							<Link to="/ev_cars/xc40-recharge">View more</Link>
						</figcaption>
					</figure> */}
				</div>
				<br />
				<br />
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
};

export default UpcomingCars;
