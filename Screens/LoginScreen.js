import {
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
    TouchableOpacity,
    //   Dimensions,
} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import {Auth} from "../API/auth";
// import Toast from 'react-native-simple-toast';
import { Loading } from '../components/modals/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";



export default function LoginScreen({ navigation }) {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const [isShowKeyboard, setIsShowKeyboard] = useState(false);

    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusesPassword, setIsFocusedPassword] = useState(false);
    useEffect(() => {

        // async function prepare() {
        //     try {
        //         await Font.loadAsync({
        //             'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
        //             'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
        //         });
        //         await new Promise(resolve => setTimeout(resolve, 2000));
        //     } catch (e) {
        //         console.warn(e);
        //     } finally {
        //         setIsReady(true);
        //     }
        // }
        //
        // prepare();

        // async function checker(){
        //     if (AsyncStorage.getItem('@login') && AsyncStorage.getItem('@pass')){
        //         setLoading(true);
        //         const login1 = await AsyncStorage.getItem('@login');
        //         console.log(login1)
        //         const pass1 = await AsyncStorage.getItem('@pass');
        //         console.log(pass1)
        //         //if (login && pass)
        //         const tryAuth = await Auth(login1, pass1);
        //         console.log(3)
        //         if (tryAuth.status == 'ok'){
        //         //     await AsyncStorage.setItem('@token', tryAuth.token);
        //         //     if (await updater())
        //                 navigation.navigate('Home');
        //         //     else
        //         //         Toast.show('Что-то пошло не так...');
        //         }
        //         else
        //             Toast.show('Проблема при авторизации');
        //         setLoading(false);
        //     }
        // }
        // checker();
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setIsShowKeyboard(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setIsShowKeyboard(false);
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const keyboardHide = () => {
        Keyboard.dismiss();
        setIsShowKeyboard(false);
    };

    async function onRegistration (value) {
        Keyboard.dismiss();
        setIsShowKeyboard(false);
        if (!login.length || !pass.length){
            // Toast.show('Введите логин и пароль');
        }
        else{
            setLoading(true);
            const tryAuth = await Auth(login, pass);

            console.log(tryAuth)
            if (tryAuth.status == "ok"){
                await AsyncStorage.setItem('@login', login);
                await AsyncStorage.setItem('@pass', pass);
                console.log('token after tryAuth', tryAuth['token'])
                await AsyncStorage.setItem('@token', tryAuth['token']);
                navigation.navigate('Home');
                // if (await updater())
                //     navigation.navigate('Home');
                // else
                //     Toast.show('Ошибка соединения')
            }
            else
                // Toast.show('Что-то пошло не так...');
            setLoading(false);
        }

    }

    const onInputEmailFocus = () => {
        setIsShowKeyboard(true);
        setIsFocusedEmail(true);
    };
    const onInputPasswordFocus = () => {
        setIsShowKeyboard(true);
        setIsFocusedPassword(true);
    };

    const onLayoutRootView = useCallback(async () => {
        if (isReady) {
            await SplashScreen.hideAsync();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return (
        <KeyboardAvoidingView style={styles.container}
                              behavior={Platform.OS === 'ios' && 'padding'}
                              onLayout={onLayoutRootView}>
            <TouchableWithoutFeedback onPress={keyboardHide}>
                <ImageBackground style={styles.image} source={require('../assets/Photo-BG.jpg')}>
                    <View style={styles.form}>
                        <View style={styles.formInside}>
                            <Text style={styles.title}>Войти</Text>

                            <TextInput
                                placeholder='Номер телефона'
                                value={login}
                                onFocus={onInputEmailFocus}
                                onChangeText={setLogin}
                                onBlur={() => setIsFocusedEmail(false)}
                                style={{ ...styles.input, borderColor: isFocusedEmail ? '#FF6C00' : '#F6F6F6' }}
                            />
                            <View>
                                <TextInput
                                    value={pass}
                                    onFocus={onInputPasswordFocus}
                                    onChangeText={setPass}
                                    placeholder='Пароль'
                                    secureTextEntry={true}
                                    onBlur={() => setIsFocusedPassword(false)}
                                    style={{
                                        ...styles.input,
                                        borderColor: isFocusesPassword ? '#FF6C00' : '#F6F6F6',
                                    }}
                                />
                                <Text style={styles.showPassword}>Показать</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{ ...styles.btn, display: isShowKeyboard ? 'none' : 'flex' }}
                                onPress={onRegistration}>
                                <Text style={styles.btnText}>Войти</Text>
                            </TouchableOpacity>
                            <Loading visible={loading} text='Синхронизация'/>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        flex: 0.5,
        position: 'relative',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 30,
    },
    formInside: {
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
    },

    title: {
        textAlign: 'center',
        marginBottom: 32,
        fontSize: 30,
        // fontFamily: 'Roboto-Regular',
        color: '#212121',
    },
    input: {
        height: 50,
        padding: 10,
        borderWidth: 1,

        borderRadius: 8,
        backgroundColor: '#F6F6F6',
        color: '#BDBDBD',
        marginBottom: 16,
    },
    btn: {
        marginTop: 27,
        textAlign: 'center',
        height: 50,
        padding: 15,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#FF6C00',
        borderRadius: 100,
        backgroundColor: '#FF6C00',
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        // fontFamily: 'Roboto-Regular',
    },

    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 35,
        color: '#1B4371',
        fontSize: 16,
        // fontFamily: 'Roboto-Regular',
    },
    navigationLink: {
        marginLeft: 10,
        color: '#FF6C00',
    },
    showPassword: { position: 'absolute', top: 16, right: 16, fontSize: 16, color: '#1B4371' },
});
