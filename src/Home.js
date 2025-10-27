import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';
import { collection, getDocs, addDoc,updateDoc,doc } from 'firebase/firestore';
// import Axios from 'axios';

const Home = () => {
	const [heading, setHeading] = useState("");
	const [task, setTask] = useState("");
	const [tasklist, setTasklist] = useState([]);
	const collectionRef = collection(db, "todolist");

	useEffect(() => {
		// Axios.get('http://localhost:3001/tasktodo/get').then((response)=>{
		// 	console.log(response.data);
		// 	setTasklist(response.data)
		// })	
		const getStudentlist = async () => {
			const data = await getDocs(collectionRef);
			console.log(data.docs[0].data().status)
			var taskstatus
			var taskstemp = []
			data.docs.map((doc) => {
				taskstatus = doc.data().status
				if (taskstatus == 0) {
					taskstemp.push({ ...doc.data(), id: doc.id });
					console.log({ ...doc.data(), id: doc.id });
				}
				console.log(taskstemp)
			})
			setTasklist(taskstemp)			//setTasklist(data.docs.map((doc)=> ({...doc.data(),id:doc.id})));

		}
		getStudentlist();
	}, [])
	const handleClick = async () => {
		// Axios.post('http://localhost:3001/tasktodo/insert',{
		// 	heading:heading,
		// 	task:task
		// });

		setHeading("");
		setTask("");
		await addDoc(collectionRef, {
			content: task,
			heading: heading,
			status: 0
		});
		setTasklist([...tasklist, { heading: heading, content: task }])
	}

	const handleComplete = async (id) => {
		var response = window.confirm("Are you sure that the task is complete? ")
		const userDoc = doc(db, "todolist", id)
		if (response) {
			const status1 = { status: 1 }
			await updateDoc(userDoc, status1);

		}
	}
		return (
			<div className='container'>
				<h1> Javeria Dashboard </h1>
				<br />
				<div className='row'>
					<div className='col-lg-10 col-sm-8'>
						{tasklist.map((val) => {
							return (
								//<Card text={val.content} head={val.heading} key={val.id} id={val.id} />
								<div className="card text-white bg-info mb-3 " style={{ width: "fit-content", display: "inline-block", margin: "5px" }} >
									<div className="card-header"><h3>{val.heading}</h3></div>
									<div className="card-body">
										<p className="card-text">
											{val.content}
										</p>
										<hr />
										<button className='btn btn-light' onClick={() => { handleComplete(val.id) }}>Completed</button>
									</div>
								</div>
							)
						})}

					</div>

					<div className='col-lg-2 col-sm-4 '>
						<input type='text' className='form-control' placeholder='Add heading' value={heading} onChange={(e) => setHeading(e.target.value)}></input>
						<br />
						<textarea className='form-control' placeholder='Add item' style={{ height: "200px" }} value={task} onChange={(e) => setTask(e.target.value)}></textarea>
						<br />
						<button className='btn btn-warning' style={{ width: "100%" }} onClick={handleClick}>Add</button>
					</div>
				</div>
			</div>
		)
	};


	export default Home;
