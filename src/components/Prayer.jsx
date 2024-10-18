import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard({ name, time, image }) {
	return (
		<Card sx={{ width: "170px",background:'orange' }}>
			<CardMedia
				sx={{ height: 140 }}
				image={image}
				title="moo"
			/>
			<CardContent>
				<h2>{name}</h2>

				<Typography variant="" color="black">
					{time}
				</Typography>
			</CardContent>
		</Card>
	);
}
