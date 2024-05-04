import { signOut } from "firebase/auth";
import { auth } from '../firebase/configfire';
const Logout = ({navigation}) => {    

        signOut(auth).then(() => {
            console.log("Déconnexion réussie");
            console.log(auth.currentUser)
            console.log(auth)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
            });
        }).catch((error) => {
            console.error("Une erreur est survenue lors de la déconnexion :", error);
        });};
export default Logout;