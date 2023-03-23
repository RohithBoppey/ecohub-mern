import { createStyles, Text, Container, Textarea, Button } from "@mantine/core";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 700,
		fontSize: 45,
	},
}));

export function Announce() {
	const navigate = useNavigate();

	const { classes, theme } = useStyles();

	const announcementRef = useRef();

	const submitHandler = () => {};

	return (
		<Container size="md" align="center">
			<Text className={classes.title}>Announce to all the Users</Text>
			<Textarea
				placeholder=""
				label="Your comment"
				withAsterisk
				pt="md"
				pb="md"
				autosize
				minRows={4}
				ref={announcementRef}
			/>
			<Button onSubmit={submitHandler}>Announce!</Button>
		</Container>
	);
}
