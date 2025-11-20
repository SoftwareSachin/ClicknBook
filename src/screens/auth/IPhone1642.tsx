import React from "react";
import { SafeAreaView, View, ImageBackground, ScrollView, Image, TouchableOpacity, Text, StyleSheet, } from "react-native";
export default (props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground 
				source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/3dab4ya8_expires_30_days.png"}} 
				resizeMode = {'stretch'}
				style={styles.view}
				>
					<ScrollView  style={styles.scrollView}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/jvyiaa5r_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image}
						/>

						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
								<Text style={styles.text}>
									{"Login via Email"}
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.view2}>
							<Text style={styles.text2}>
								{"or "}
							</Text>
						</View>

						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
								<Text style={styles.text}>
									{"Continue via Phone number"}
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.row}>
							<Text style={styles.text3}>
								{"Don’t have an account?"}
							</Text>
							<TouchableOpacity onPress={() => alert('Register pressed!')}>
								<Text style={styles.text4}>
									{"Register"}
								</Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity style={styles.button2} onPress={()=>alert('Pressed!')}>
							<Text style={styles.text5}>
								{"Skip for now"}
							</Text>
						</TouchableOpacity>
					</ScrollView>
				</ImageBackground>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	buttonContainer: {
		borderWidth: 1,
		borderColor: '#000000',
		borderRadius: 12,
		marginHorizontal: 16,
		marginBottom: 16,
		padding: 2,
	},
	button: {
		alignItems: "center",
		backgroundColor: "#F8D800",
		borderRadius: 10,
		paddingVertical: 18,
	},
	button2: {
		alignItems: "center",
		borderColor: "#000000",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: 18,
		marginBottom: 51,
		marginHorizontal: 16,
	},
	image: {
		borderRadius: 40,
		height: 492,
		marginTop: 33,
		marginBottom: 50,
	},
	row: {
		alignSelf: "flex-start",
		flexDirection: "row",
		marginBottom: 16,
		marginLeft: 20,
	},
	scrollView: {
		flex: 1,
		borderRadius: 40,
	},
	text: {
		color: "#000000",
		fontSize: 14,
		fontWeight: "bold",
	},
	text2: {
		color: "#808080",
		fontSize: 12,
	},
	text3: {
		color: "#000000",
		fontSize: 12,
		fontWeight: "bold",
		marginRight: 6,
	},
	text4: {
		color: "#B50E00",
		fontSize: 12,
		fontWeight: "bold",
		textDecorationLine: 'underline',
	},
	text5: {
		color: "#000000",
		fontSize: 14,
		fontWeight: "bold",
	},
	view: {
		flex: 1,
	},
	view2: {
		alignItems: "center",
		marginBottom: 16,
	},
});
