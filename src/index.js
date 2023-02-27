import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs,
  addDoc, 
 } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDNvu5hQGhuEYzLYwcwNc9IyJ1h4MzCLsE",
	authDomain: "formularz-ab035.firebaseapp.com",
	projectId: "formularz-ab035",
	storageBucket: "formularz-ab035.appspot.com",
	messagingSenderId: "266963469092",
	appId: "1:266963469092:web:add70e795ba6e27277e9b1",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "patients");

//get collection data
getDocs(colRef)
	.then((snapshot) => {
		let patients = [];
		snapshot.docs.forEach((doc) => {
			patients.push({ ...doc.data(), id: doc.id });
		});
		console.log(patients);
	})
	.catch((err) => {
		console.log(err.message);
	});

  // adding patient
  const addPatient = document.querySelector('.add')
  addPatient.addEventListener('submit', e=>{
    e.preventDefault()

    addDoc(colRef, {
      age: addPatient.age.value,
      description: addPatient.description.value,
      name: addPatient.name.value,
      problem: addPatient.problem.value,      
    }).then(()=>{
      addPatient.reset()
    }).catch((err)=>{
      console.log(err.message)
    })
  })

