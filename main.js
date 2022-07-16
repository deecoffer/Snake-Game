const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field{
    constructor(field) {
        this.field = field;
        this.locationOne = 0;
        this.locationTwo = 0;

        this.field[0][0] = pathCharacter; 
    }

    print() {
        this.join(myField)
    }

    locationGame() {
        return (
            this.locationOne >= 0 &&
            this.locationTwo >= 0 &&
            this.locationOne < this.field.length &&
            this.locationTwo < this.field[0].length
        );
    }

    hatFound() {
        return this.field[this.locationOne][this.locationTwo] === hat; //hat position
    }

    fell() {
        return this.field[this.locationOne][this.locationTwo] === hole; //hole position
    }

    startGame() {
        let play = true;
        while(play) {
            this.print(); //prints character 
            this.pathQuestion(); //asks what way to go 
            if (this.hatFound()) {
                console.log('Congrats! One hat for you');
                play = false;
                break;   
            } else if (this.fell()) {
                console.log('Oh no... You lost. Try again');
                play = false;
                break;
            } else if (!this.locationGame()) {
                console.log('Oops! Out of reach');
                play = false;
                break;
            }

            this.field[this.locationOne][this.locationTwo] = pathCharacter; //where your 'cursor' is 
        }
    }
    
    pathQuestion() {
        const reply = prompt('Where to?')
        switch (reply) {
            case 'W':
                this.locationOne -=1 //goes up using the keyboard normally used for games. 
                break;
            case 'S':
                this.locationOne +=1; //goes down 
                break;
            case 'A':
                this.locationTwo -=1; //goes left 
                break;
            case 'D':
                this.locationTwo +=1; //goes right
                break;
            default:
                console.log('W = UP; S = DOWN; A = LEFT; D = RIGHT')
                this.pathQuestion;
                break;
        }
    }


    //found this bit quite difficult 

    print() {
        const displayString = this.field.map(row => {
            return row.join('');
          }).join('\n');
        console.log(displayString);
    }
    
    static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const prob = Math.random();
            field[y][x] = prob > percentage ? fieldCharacter : hole;
          }
        }
        //location for hat 
        const hatLocation = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };
        
        while (hatLocation.x === 0 && hatLocation.y === 0) {
          hatLocation.x = Math.floor(Math.random() * width);
          hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        return field;
    }
     
    //I understand reading it but making it is more complicated lol 
}


const myfield = new Field(Field.generateField(10, 10, 0.2));
myfield.startGame();

//Game is now working, wohoo!