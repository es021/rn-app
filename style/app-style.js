import { StyleSheet } from 'react-native';


export const Color = {
    none : "rgba(0,0,0,0)",
    blue: "#2594ED",
    green: "#1daf31",
    red: "#ba2121",
    lightGray: "#d6d7da"
}

 
export default AppStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        color: Color.blue
    },
    h2: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 5
    },
    h3: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    textWhite: {
        color: "white"
    }
});
