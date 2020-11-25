import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import {Header} from 'react-native-elements'
import dictionary from '../database';

export default class HomeScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            text : '',
            isSearchPressed : false,
            word : 'Loading ...',
            exapmles : [],
            definition : '',
        }
    }

    getWordOffline=(word)=>{
        var text = word.toLowerCase()
        
        try{
            var word = dictionary[text].word
            var lexicalCategory = dictionary[text].lexicalCategory
            var definition = dictionary[text].definition
            this.setState({
                "word" : word,
                "lexicalCategory" : lexicalCategory,
                "definition" : definition
            })
        }

        catch(error){
            Alert.alert("Sorry this word is not available for now")
            this.setState({
                'text' : '',
                'isSearchPressed' : false
            })
        }

    }

    getWord = (word) => {
        var searchKeyword = word.toLowerCase();
        var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json";
        console.log(url);
        //console.log(url)
        return fetch(url)
        .then((data)=>{
          if(data.status===200)
          {
            return data.json()
          }
          else
          {
            return null
          }
        })
        .then((response)=>{
            var responseObject = response;          
            if(responseObject)
            {
              var wordData = responseObject.definitions[0]              
              var definition=wordData.description
              var lexicalCategory=wordData.wordtype              
              this.setState({
                "word" : this.state.text, 
                "defination" :definition,
                "lexicalCategory": lexicalCategory   
              });
            }
            else
            {
              this.setState({
                "word" : this.state.text, 
                "defination" :"Not Found",                
              });    
            }        
        });        
    }

    render(){
        return(
            <View>
                <Header backgroundColor={'purple'}
                    centerComponent={{ text: "Pocket Dictionary", style: { fontSize: 20, color: '#fff' } }}
                />
                <View style={styles.inputBoxContainer}>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={(text) => {
                            this.setState({
                                text: text,
                                isSearchPressed: false,
                                word: 'Loading...',
                                lexicalCategory: '',
                                examples: [],
                                defination: ''
                            });
                        }}
                        value={this.state.text}
                    />
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => {
                            this.setState({ isSearchPressed: true });
                            this.getWordOffline(this.state.text);
                        }}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                    <View style={styles.outputBoxContainer}>
                        <Text style={{ fontSize: 20 }}>
                            {
                                this.state.isSearchPressed && this.state.word === 'Loading...'
                                    ? this.state.word
                                    : ""
                            }
                        </Text>
                        {
                            this.state.word !== 'Loading...' ?
                                (
                                    <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                        <View style={styles.detailsContainer}>
                                            <Text style={styles.detailsTitle}>
                                                Word:{" "}
                                            </Text>
                                            <Text style={{ fontSize: 18 }}>
                                                {this.state.word}
                                            </Text>
                                        </View>
                                        <View style={styles.detailsContainer}>
                                            <Text style={styles.detailsTitle}>
                                                Type:{" "}
                                            </Text>
                                            <Text style={{ fontSize: 18 }}>
                                                {this.state.lexicalCategory}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                                            <Text style={styles.detailsTitle}>
                                                Definition:{" "}
                                            </Text>
                                            <Text style={{ fontSize: 18 }}>
                                                {this.state.defination}
                                            </Text>
                                        </View>
                                    </View>
                                )
                                : null
                        }
                    </View>
                </View>
            </View>
        );
    }


}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputBoxContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        marginTop: 50,
        width: '80%',
        height: 55,
        borderWidth: 4,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 25
    },
    searchButton: {
        marginTop: 20,
        width: '40%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: 'orange'
    },
    buttonText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    outputContainer:{
        flex:0.7,
        alignItems:'center'
      },
      detailsContainer:{
        flexDirection:'row',
        alignItems:'center'
      },
      detailsTitle:{
        color:'orange',
        fontSize:20,
        fontWeight:'bold'
      }
});