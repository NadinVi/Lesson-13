// Створити клас SuperMath.

// Додати до екземпляра метод - check(obj), параметр obj якого має властивості X, Y, znak. 
//Метод повинен підтвердити у користувача, чи хоче він зробити дію znak c Х і У. Якщо хоче, 
//зробити математичну дію znak (яка описана в прототипі), інакше - запитати введення нових даних через метод input() класу SuperMath.

// Приклад об'єкта: `obj = {X:12, Y:3, znak: “/”}`, можливі варіанти znak => `+ - / * %`.

// При введенні znak потрібно перевірити коректність введення на можливі математичні дії.

// p = new SuperMath();
// p.check(obj); // --> no p.input() -> 3 prompt -> рахує


const OPERATION = {
    "+" : function(x, y) {return x + y},
    "-" : function(x, y) {return x - y},
    "*" : function(x, y) {return x * y},
    "/" : function(x, y) {return x / y},
}


class SuperMath {
    //constructor(x, y, znak) когда создали input(), уже запись такая
    constructor(){
        // this.x = x;
        // this.y = y;
        // this.znak = znak;
        this.input();
    }

    input() {
        do {
            this.znak = +prompt(`Enter x`)
        } while (isNaN(this.x));

        do {
            this.znak = +prompt(`Enter y`)
        } while (isNaN(this.x));

    
        do {
            this.znak = prompt(`Enter znak: ${this.getOperations()}`)
        } while (!OPERATION[this.znak]);   //ищу введені юзером знак
    }

    //чтобы избавиться от switch/case создаем объект OPERATION и метод check()
    // check() {
    //     let result;
    //     switch(this.znak) {
    //         case "+":
    //         result = this.x + this.y
    //         break;

    //         case "-":
    //         result = this.x - this.y
    //         break;

    //         case "*":
    //         result = this.x * this.y
    //         break;

    //         case "/":
    //         result = this.x / this.y
    //         break;
    //     }

    //     return result;
    // }


    //нам нужно среди OPERATION находить тот, который сейчас находится с этим знаком, который нам пришел и вызывать эту функцию, передавая туда this.x и this.y
    check() {
        let userApproved = confirm(`Do you want make operation ${this.x} ${this.znak} ${this.y}`)
        return userApproved ? OPERATION[this.znak](this.x, this.y) : this.input.check(); // если в userApproved  приходит true, то выполняем действие OPERATION[this.znak](this.x, this.y)ю
        //если приходит false, тогда заново запрашивает данные this.input и запускаем .check()
    }

    //чтобы в запросе к юзеру какой знак он зочет ввести выести +,-,*,/ через запятую в строчку создаем getOperations()
    getOperations() {
        let operands = [];
        for(let key in OPERATION) {
            operands.push(key);
        }
        return operands.join(", ")
    }
}

const obj = new SuperMath();
//const obj1 = new SuperMath(10, 20, "+");
console.log(obj.check());
//console.log(obj1.check());