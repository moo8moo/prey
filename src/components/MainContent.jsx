import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import { useForkRef } from "@mui/material";
import "moment/dist/locale/ar-dz";
import { grey } from "@mui/material/colors";
moment.locale("ar");
export default function MainContent() {
	// STATES
	const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
	const [timings, setTimings] = useState({
		Fajr: "",
		Dhuhr: "",
		Asr: "",
		Sunset: "",
		Isha: "",
	});

	const [remainingTime, setRemainingTime] = useState("");

	const [selectedCity, setSelectedCity] = useState({
		displayName: "مكة المكرمة",
		apiName: "Makkah al Mukarramah",
	});

	const [today, setToday] = useState("");

	const avilableCities = [
		{
			displayName: "مكة المكرمة",
			apiName: "Makkah al Mukarramah",
		},
		{
			displayName: "الرياض",
			apiName: "Riyadh",
		},
		{
			displayName: "الدمام",
			apiName: "Dammam",
		},
	];

	const prayersArray = [
		{ key: "Fajr", displayName: "الفجر" },
		{ key: "Dhuhr", displayName: "الظهر" },
		{ key: "Asr", displayName: "العصر" },
		{ key: "Sunset", displayName: "المغرب" },
		{ key: "Isha", displayName: "العشاء" },
	];
	const getTimings = async () => {
		console.log("calling the api");
		const response = await axios.get(
			`https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.apiName}`
		);
		setTimings(response.data.data.timings);
	};
	useEffect(() => {
		getTimings();
	}, [selectedCity]);

	useEffect(() => {
		let interval = setInterval(() => {
			console.log("calling timer");
			setupCountdownTimer();
		}, 1000);

		const t = moment();
		setToday(t.format("MMM Do YYYY | h:mm"));

		return () => {
			clearInterval(interval);
		};
	}, [timings]);

	// const data = await axios.get(
	// 	"https://api.aladhan.com/v1/timingsByCity?country=SA&city=Riyadh"
	// );

	const setupCountdownTimer = () => {
		const momentNow = moment();

		let prayerIndex = 2;

		if (
			momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
		) {
			prayerIndex = 1;
		} else if (
			momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
		) {
			prayerIndex = 2;
		} else if (
			momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
		) {
			prayerIndex = 3;
		} else if (
			momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
		) {
			prayerIndex = 4;
		} else {
			prayerIndex = 0;
		}

		setNextPrayerIndex(prayerIndex);

		// now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
		const nextPrayerObject = prayersArray[prayerIndex];
		const nextPrayerTime = timings[nextPrayerObject.key];
		const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

		let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

		if (remainingTime < 0) {
			const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
			const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
				moment("00:00:00", "hh:mm:ss")
			);

			const totalDiffernce = midnightDiff + fajrToMidnightDiff;

			remainingTime = totalDiffernce;
		}
		console.log(remainingTime);

		const durationRemainingTime = moment.duration(remainingTime);

		setRemainingTime(
			`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
		);
		console.log(
			"duration issss ",
			durationRemainingTime.hours(),
			durationRemainingTime.minutes(),
			durationRemainingTime.seconds()
		);
	};
	const handleCityChange = (event) => {
		const cityObject = avilableCities.find((city) => {
			return city.apiName == event.target.value;
		});
		console.log("the new value is ", event.target.value);
		setSelectedCity(cityObject);
	};

	return (
		<>
			{/* TOP ROW */}
			<Grid container spacing={-2} style={{background:'#ffd39a`',padding:"10px",borderRadius:'5px',margin:'0%'}}>
				<Grid xs={6}>
					<div>
						<h2>{today}</h2>
						<h1>{selectedCity.displayName}</h1>
					</div>
				</Grid>

				<Grid xs={6}>
					<div>
						<h2>
							متبقي حتى صلاة{" "}
							{prayersArray[nextPrayerIndex].displayName}
						</h2>
						<h1>{remainingTime}</h1>
					</div>
				</Grid>
			</Grid>
			{/*== TOP ROW ==*/}

			{/* <Divider style={{ borderColor: "orange", opacity: "1" }} /> */}

			{/* PRAYERS CARDS */}
			<Grid
			   container spacing={0}
				item xs={12} md={6}
				style={{ marginTop: "50px",width:'100%', gap:'10px'}}
				justifyContent='flex-start'
				// alignItems='flex-start'


			>
				<Prayer
				    style={{background:'grey'}}
				 	name="الفجر"
					time={timings.Fajr}
					image="data:image/jpeg;base64,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"
				/>
				<Prayer
					name="الظهر"
					time={timings.Dhuhr}
					image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqxI75XMfSkHUryx2_dNCAWET256r1JCTuCg&s"
				/>
				<Prayer
					name="العصر"
					time={timings.Asr}
					image="data:image/jpeg;base64,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"
				/>
				<Prayer
					name="المغرب"
					time={timings.Sunset}
					image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Ag9ZKRmckNVooivEzX1aRsuk1kHKly-3jg&s"
				/>
				<Prayer
					name="العشاء"
					time={timings.Isha}
					image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdt-qiuYUIaXQ-n3lBXCa21xj5vuzW7fGZoQ&s"
				/>
			</Grid>
			{/*== PRAYERS CARDS ==*/}

			{/* SELECT CITY */}
			<Stack
				direction="row"
				justifyContent={"center"}
				style={{ marginTop: "40px" }}
			>
				<FormControl style={{ width: "20%" }}>
					<InputLabel id="demo-simple-select-label">
						<span style={{ color: "white" }}>المدينة</span>
					</InputLabel>
					<Select
						style={{ color: "white" }}
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						// value={age}
						label="Age"
						onChange={handleCityChange}
					>
						{avilableCities.map((city) => {
							return (
								<MenuItem
									value={city.apiName}
									key={city.apiName}
								>
									{city.displayName}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</Stack>
		</>
	);
}
