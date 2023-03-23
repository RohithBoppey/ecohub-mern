import {
	createStyles,
	Card,
	Text,
	SimpleGrid,
	UnstyledButton,
	Anchor,
	Group,
	rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[6]
				: theme.colors.gray[0],
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 700,
	},

	item: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		borderRadius: theme.radius.md,
		height: rem(90),
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		transition: "box-shadow 150ms ease, transform 100ms ease",

		"&:hover": {
			boxShadow: theme.shadows.md,
			transform: "scale(1.05)",
		},
	},
}));

export function Announce() {
	const { classes, theme } = useStyles();

	return (
		<Card withBorder radius="md" className={classes.card}>
			<Group position="apart">
				<Text className={classes.title}>Announce to all the Users</Text>
			</Group>
			<SimpleGrid cols={3} mt="md">
				{/* {items} */}
			</SimpleGrid>
		</Card> 
	);
}
