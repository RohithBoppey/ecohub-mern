import React from "react";

import Nexon from "./nexon.jpg";
import E20 from "./e20.jpg";
import Volvo from "./volvo.jpg";
import XC40 from "./xc40.jpg";
import { Link } from "react-router-dom";

const UpcomingCars = () => {
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
					<figure className="effect-sarah">
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
					</figure>
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
