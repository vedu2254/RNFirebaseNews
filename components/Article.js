import React from "react";
import {View,StyleSheet,Text,Linking,Pressable,Image} from "react-native";
import moment from "moment";

const Article = (props) => {
    const goToSource = () =>{
        Linking.openURL(props.url);
    }
    return(
        <Pressable style={[styles.container, styles.shadowProp ]} onPress={goToSource}>
        <View style={{width: "65%", marginLeft:5,}}>
            <View style={styles.data}>
                <Text style={styles.source}>{props.sourceName}</Text>
                <Text style={styles.date}>{moment(props.publishedAt).startOf('day').fromNow()  }</Text>
            </View>
            <Text numberOfLines={2} style={styles.title}>{props.title}</Text>
            <Text style={styles.description} numberOfLines={2}>
                {props.description}
            </Text>
        </View>
            <Image source={{
                uri: props.urlToImage
            }}
            style={styles.image}
            />
        </Pressable>
    )
}

export default Article;

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    container:{
        width: "95%",
        marginLeft: "2.5%",
        flexDirection: "row",
        fontColor: "black",
        borderRadius: 10,
        shadowOpacity: 0.5,
        shadowColor: "grey",
        shadowOffset: {
            height: 5,
            width: 5
        },
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        marginTop: 15
    },
    image:{
        marginLeft:5,
        marginTop: 15,
        height: "70%",
        width: "30%",
        borderRadius:5,
    },
    title:{
        fontSize: 15,
        fontWeight: "600",
        marginTop: 2,
        color: "black",
    },
    description:{
        fontSize: 12,
        fontWeight: "400",
        marginTop: 2,
        marginBottom:7,
        color: "grey",
    },
    data:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 7,
        color: "grey",
    },   
    date:{
        fontWeight: "bold",
        color: "#e63946",
        fontSize: 10
    },
    source:{
        color: "#e63946",
        fontWeight: "bold",
        fontSize: 10
    }
})