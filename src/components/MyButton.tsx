import {View, Text, StyleSheet, Vibration} from "react-native";
import {useState} from "react";

type PropsType = {
    title: string
    color?: string
    style?: string
    callback?: () => void
}

export const MyButton = ({title, color, style, callback}: PropsType) => {

    const [press, setPress] = useState<boolean>(false)

    const onPress = () => {
        callback()
        Vibration.vibrate(50, false)
        setPress(true)
    }

    const offPress = () => {
        setPress(false)
    }

    const styles = StyleSheet.create({
        button: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            borderStyle: 'solid',
            width: 60,
            height: 60,
            borderRadius: 10,
            borderWidth: 4,
            borderColor: color ? color : 'black'
        },
        buttonPressed: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            borderStyle: 'solid',
            borderRadius: 10,
            width: 60,
            height: 60,
            borderWidth: 2,
            borderColor: color ? color : 'black',
            backgroundColor: color ? color : 'black',
        },
        title: {
            fontSize: 30,
            fontWeight: "bold",
            color: color ? color : 'black',
        },
        titlePressed: {
            fontSize: 30,
            fontWeight: "bold",
            color: 'white'
        }
    })

    return (
        <View style={press ? styles.buttonPressed : styles.button}
              onTouchStart={onPress}
              onTouchEnd={offPress}

        >
            <Text style={press ? styles.titlePressed : styles.title}>{title}</Text>
        </View>
    )
}



