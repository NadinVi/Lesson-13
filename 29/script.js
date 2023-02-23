const roles = {
	admin: "images/roles/admin.png",
	student: "images/roles/student.png",
	lector: "images/roles/lector.png"
};

const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "images/users/JackSmith.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "images/users/AmalSmith.png",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "images/users/NoahSmith.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "images/users/CharlieSmith.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "images/users/EmilySmith.png",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 25,
		img: "images/users/LeoSmith.png",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
]

class User {
	constructor(img, name, age, role, courses) {
		this.img = img;
		this.name = name;
		this.age = age;
		this.role = role;
		this.courses = courses;
	};

	render() {
		return `
		<div class="users">
        <div class="user">
            <div class="user__info">
                <div class="user__info--data">
                    <img src="${this.img}" alt="${this.name}" height="50">
                    <div class="user__naming">
                        <p>Name: <b>${this.name}</b></p>
                        <p>Age: <b>${this.age}</b></p>
                    </div>
                </div>
                <div class="user__info--role">
                    <img src="images/roles/${this.role}.png" alt="${this.role}" height="25">
                    <p>${this.role}</p>
                </div>
				</div>

				<div class="user__courses">
				${this.courses ? this.renderCourses() : ""}
				</div>
            </div>`
	}

	renderCourses() {
		let scroll = this.courses
			.map(course => {
				return `
			<p class="user__courses--course ${this.role}">${course.title}
				<span class="${userPoints(gradation, course.mark)}">${userPoints(gradation, course.mark)}</span>
			</p>`;
			})

		return `<div class="user__courses">${scroll.join("")}</div>`
	}
}


function userPoints(gradation, mark) {
	for (let key in gradation) {
		if (mark > 0 && mark <= 20) {
			return "satisfactory"
		}
		if (mark > 20 && mark <= 55) {
			return "good"
		}
		if (mark > 55 && mark <= 85) {
			return "very-good"
		}
		if (mark > 85 && mark <= 100) {
			return "excellent"
		}

	}
};




class Student extends User {
	constructor(img, name, age, role, courses) {
		super(img, name, age, role, courses);
	}
}



class Admin extends User {
	constructor(img, name, age, role, courses) {
		super(img, name, age, role, courses);
	}
	renderCourses() {
		let scroll = this.courses
			.map(course => {
				return `
                <div class="user__courses--course ${this.role}">
                    <p>Title: <b>${course.title}</b></p>
                    <p>Admin's score: <span class="${userPoints(gradation, course.score)}">${userPoints(gradation, course.score)}</span></p>
                   <p>Lector: <b>${course.lector}</b></p>
                </div>`;
			})

		return `<div class="user__courses admin--info">${scroll.join("")}</div>`
	}
}



class Lector extends User {
	constructor(img, name, age, role, courses) {
		super(img, name, age, role, courses);
	}

	renderCourses() {
		let scroll = [];
		this.courses.forEach((course) => {
			scroll.push(`
				<div class="user__courses--course ${this.role}">
                    <p>Title: <b>${course.title}</b></p>
                    <p>Lector's score: <span class="${userPoints(gradation, course.score)}">${userPoints(gradation, course.score)}</span></p>
                    <p>Average student's score: <span class="${userPoints(gradation, course.studentsScore)}">${userPoints(gradation, course.studentsScore)}</span></p>
                </div>
				`)
		})

		return `<div class="user__courses admin--info">${scroll.join("")}</div>`
	}
}


function renderUsers(users) {
	const usersArr = [];
	users.map(function (user) {
		if (user.role === "student") return new Student(user.img, user.name, user.age, user.role, user.courses);
		if (user.role === "lector") return new Lector(user.img, user.name, user.age, user.role, user.courses);
		if (user.role === "admin") return new Admin(user.img, user.name, user.age, user.role, user.courses);
	})
		.map(function (user) {
			usersArr.push(user.render());
		})

	document.write(`<div class="users">${usersArr.join("")}</div>`);
}
renderUsers(users);




