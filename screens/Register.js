import * as React from 'react';
import { useState } from 'react'
import { Image, TextInput, StyleSheet, Text, TouchableOpacity, View, Modal, ScrollView } from 'react-native';
import axios from 'axios';
import { domain } from '../config';

export const Register = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [countryAndCode, setCountry] = useState({country: '', code: ''});
  const [fname, setFname] = useState({fname: ''});
  const [lname, setLname] = useState({lname: ''});
  const [phone, setPhone] = useState({phone: ''});
  const [company, setCompany] = useState({company: ''});
  const [email, setEmail] = useState({email: ''});
  const [pass, setPass] = useState({pass: ''});
  const [passConfirmed, confirmPass] = useState(false);
  const [errText, setErrText] = useState('');
  const countriesAndCodes = [{
    country: 'Ukraine',
    code: '+380'
  },
  {
    country: 'Belarus',
    code: '+375'
  },
  {
    country: 'Russia',
    code: '+7'
  }];
  const companyList = ['Individual', 'Company'];

  let setCountryHandler = (country) => {
    for (let i = 0; i < countriesAndCodes.length; i++) {
      if (country === countriesAndCodes[i].country) {
        setCountry({country: countriesAndCodes[i].country, code: countriesAndCodes[i].code})
      }
    }
  };

  let companyHandler = (company) => {
    for (let i = 0; i < companyList.length; i++) {
      if (company === companyList[i]) {
        setCompany({company: companyList[i]})
      }
    }
  };

  let passHandler = (confirmedPass) => {
    if (pass.pass === confirmedPass) {
      confirmPass(true)
    }
  };

  let registerHandler = async () => {
    if (fname.fname !== '' && lname.lname !== '' && email.email !== '' && phone.phone !== '' && countryAndCode.country !== '' && company.company !== '') {
      if (passConfirmed === true) {
        axios.post(`https://${domain}.ngrok.io/register`, {
          fname: fname.fname,
          lname: lname.lname,
          email: email.email,
          pass: pass.pass,
          phone: phone.phone,
          country: countryAndCode.country,
          company: company.company
        })
        .then(async (res) => {
          console.log(res)
          if (res.data === 'OK') {
            navigation.navigate('Login')
          }
          else if (res.data === 'User already exists!') {
            setErrText(res.data)
            setModalVisible(true)
            setEmail({email: ''})
          };
        })
        .catch(async (err) => {
          console.log(err)
        });
      } else {
        setErrText('Please confirm your password')
        setModalVisible(true)
      }
    } else {
      setErrText('Please enter your information')
      setModalVisible(true)
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{
      height: '109%',
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center'}}
      onContentSizeChange={test => console.log(test)}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.errorText}>{errText}</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.ok}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Image
          style={styles.logo}
          source={require('../assets/icons/mdt_logo_register.png')}  
        />
        <Text style={styles.welcome}>Welcome!</Text>
        {/* Fname */}
        <View style={styles.inputName}>
          <TextInput
            style={styles.inputTextName}
            placeholder="Enter your name" 
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            onChangeText={fname => setFname({fname: fname})}
            value={fname.fname}/>
        </View>
        {/* Lname */}
        <View style={styles.inputSurname}>
          <TextInput
            style={styles.inputTextSurname}
            placeholder="Enter your surname"
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            onChangeText={lname => setLname({lname: lname})}
            value={lname.lname}/>
        </View>
        {/* Country */}
        <View style={styles.inputCountry}>
          <TextInput
            style={styles.inputTextCountry}
            placeholder="Enter your country" 
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            onChangeText={country => setCountryHandler(country)}/>
        </View>
        {/* Phone code */}
        <View style={styles.inputCode}>
          <TextInput
            style={styles.inputTextCode}
            value={countryAndCode.code}/>
        </View>
        {/* Company */}
        <View style={styles.inputCompany}>
          <TextInput
            style={styles.inputTextCompany}
            placeholder="Enter who you are" 
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            onChangeText={company => companyHandler(company)}/>
        </View>
        {/* Phone */}
        <View style={styles.inputPhone}>
          <TextInput
            style={styles.inputTextPhone}
            placeholder="Enter your number" 
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            onChangeText={phone => setPhone({phone: `${countryAndCode.code}${phone}`})}/>
        </View>
        {/* Email */}
        <View style={styles.inputEmail}>
          <TextInput  
            style={styles.inputTextEmail}
            placeholder="Enter your E-mail"
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            onChangeText={email => setEmail({email: email})}
            value={email.email}/>
        </View>
        {/* Pass */}
        <View style={styles.inputPassword}>
          <TextInput  
            secureTextEntry
            style={styles.inputTextPassword}
            placeholder="Enter your password" 
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            onChangeText={pass => setPass({pass: pass})}
            value={pass.pass}/>
        </View>
        {/* Confirm pass */}
        <View style={styles.inputConfirmPassword}>
          <TextInput  
            secureTextEntry
            style={styles.inputConfirmTextPassword}
            placeholder="Confirm your password" 
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            onChangeText={confirmedPass => passHandler(confirmedPass)}/>
        </View>
        {/* Go to Login */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>I have got my </Text>
          <TouchableOpacity style={styles.signInBtnView} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInTextBtn}>profile</Text>
          </TouchableOpacity>
        </View>
        {/* Register */}
        <TouchableOpacity 
          style={styles.registerBtn}
          onPress={() => registerHandler()}>
          <Text style={styles.registerText}>Registration</Text>
        </TouchableOpacity>
        {/* Support */}
        <TouchableOpacity style={styles.supportBtn}>
          <Image
            source={require('../assets/icons/IconSupport1.png')}  
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  logo: {
    position: 'absolute',
    top: 42,
    width: 131,
    height: 131
  },
  welcome: {
    position: 'absolute',
    top: 112,
    width: 114,
    height: 33,
    left: 144,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 33,
    color: 'rgba(255, 255, 255, 0.4)'
  },
  inputName: {
    position: "absolute",
    width: '80%',
    height: 50,
    top: 159,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    borderColor: 'rgba(155, 81, 224, 0.5)',
    borderStyle: 'solid',
    borderWidth: 1
  },
  inputTextName: {
    position: "absolute",
    top: 14,
    left: 32,
    width: '80%',
    height: 22,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.4)'
  },
  inputSurname: {
    position: "absolute",
    width: '80%',
    height: 50,
    top: 231,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10
  },
  inputTextSurname: {
    position: "absolute",
    top: 14,
    left: 32,
    width: '80%',
    height: 22,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.4)'
  },
  inputCountry: {
    position: "absolute",
    width: '80%',
    height: 50,
    top: 303,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    borderColor: 'rgba(155, 81, 224, 0.5)',
    borderStyle: 'solid',
    borderWidth: 1
  },
  inputTextCountry: {
    fontStyle: 'normal',
    fontWeight: '600',
    top: 14,
    left: 32,
    width: '80%',
    height: 22,
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.4)'
  },
  inputCompany: {
    position: "absolute",
    width: '80%',
    height: 50,
    top: 375,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10
  },
  inputTextCompany: {
    fontStyle: 'normal',
    fontWeight: '600',
    top: 14,
    left: 32,
    width: '80%',
    height: 22,
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.4)'
  },
  inputCode: {
    position: "absolute",
    width: 66,
    height: 50,
    top: 447,
    left: '10%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  inputTextCode: {
    fontStyle: 'normal',
    fontWeight: '600',
    top: 14,
    left: 18,
    width: 155,
    height: 22,
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.4)'
  },
  inputPhone: {
    position: "absolute",
    width: '80%',
    height: 50,
    top: 447,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    borderColor: 'rgba(155, 81, 224, 0.5)',
    borderStyle: 'solid',
    borderWidth: 1
  },
  inputTextPhone: {
    fontStyle: 'normal',
    fontWeight: '600',
    top: 14,
    left: 86,
    width: '80%',
    height: 22,
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.4)'
  },
  inputEmail: {
    position: "absolute",
    width: '80%',
    height: 50,
    top: 519,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    borderColor: 'rgba(155, 81, 224, 0.5)',
    borderStyle: 'solid',
    borderWidth: 1
  },
  inputTextEmail: {
    position: "absolute",
    top: 14,
    left: 32,
    width: '80%',
    height: 22,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.4)'
  },
  inputPassword: {
    position: "absolute",
    width: '80%',
    height: 50,
    top: 591,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    borderColor: 'rgba(155, 81, 224, 0.5)',
    borderStyle: 'solid',
    borderWidth: 1
  },
  inputTextPassword: {
    position: "absolute",
    top: 14,
    left: 32,
    width: '80%',
    height: 22,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.4)'
  },
  inputConfirmPassword: {
    position: "absolute",
    width: '80%',
    height: 50,
    top: 663,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    borderColor: 'rgba(155, 81, 224, 0.5)',
    borderStyle: 'solid',
    borderWidth: 1
  },
  inputConfirmTextPassword: {
    position: "absolute",
    top: 14,
    left: 32,
    width: '80%',
    height: 22,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.4)'
  },
  signInContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    top: 733,
    width: '100%',
    height: 18
  },
  signInText: {
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(255, 255, 255, 0.7)'
  },
  signInBtnView: {
    height: 16
  },
  signInTextBtn: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: '#9B51E0'
  },
  registerBtn: {
    position: "absolute",
    width: 180,
    height: 50,
    top: 762,
    backgroundColor:"rgba(204, 0, 255, 0.5)",
    borderRadius: 10
  },
  registerText: {
    position: "absolute",
    top: 8,
    left: 26,
    width: 141,
    color:"white",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 33
  },
  supportBtn: {
    position: "absolute",
    top: 852,
    width: 30,
    height: 30,
    left: 330
  },
  okButton: {
    position: "absolute",
    top: 70,
    backgroundColor: "rgba(204, 0, 255, 1)",
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 19,
    paddingVertical: 3
  },
  ok: {
    position: "relative",
    color: "white",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 33
  },
  errorText: {
    position: "absolute",
    textAlign: 'center',
    top: 18,
    width: '90%',
    color: '#000000',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 33
  },
  modalView: {
    width: '90%',
    height: 120,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center"
  }
});