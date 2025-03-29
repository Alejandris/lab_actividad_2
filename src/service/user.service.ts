import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,signInWithPopup, GoogleAuthProvider } from "@angular/fire/auth";
import { getDatabase, ref, set } from "@angular/fire/database";

@Injectable({
    providedIn: 'root'

})
export class UserService {
    constructor(private auth: Auth)
    {} 
    register({ email, password,role }: any) {
        console.log("Datos de registro:", { email, password, role });  // Verifica los datos al recibirlos
        return createUserWithEmailAndPassword(this.auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuario registrado:", user);
            const db = getDatabase();
            const userRef = ref(db, 'users/' + user.uid);
            set(userRef,{
              email: user.email,
              role:role,
              createdAt: new Date().toISOString(),
            })
            .then(() => {
              console.log("Usuario guardado en la base de datos con rol:", role);
              return user;
            })
            .catch(error => {
              console.error("Error al guardar en la base de datos:", error);
              throw error;
            });
          })
          .catch(error => {
            console.error("Error al registrar usuario:", error);
            throw error;
          });
      }

    login({email, password} :any){
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    loginWithGoogle(){
        return signInWithPopup(this.auth, new GoogleAuthProvider());
    }
   
}   