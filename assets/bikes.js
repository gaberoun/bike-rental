// CODE USED TO GENERATE BIKE DATA

import { v4 as uuidv4 } from 'uuid';

const generateBikes = () => {
  const types = {
    Mountain: 120, 
    Road: 120, 
    Electric: 350, 
    BMX: 90, 
    Foldable: 105, 
    Classic: 100
  };
  const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large'];
  const availability = [true, false];

  const randomProp = obj => Object.keys(obj)[(Math.random() * Object.keys(obj).length) | 0];

  class Bike {
    constructor() {
      this.id = uuidv4();
      this.type = randomProp(types);
      this.size = sizes[Math.floor(Math.random() * 6) + 1];
      this.price = types[this.type];
      this.isAvailable = availability[Math.floor(Math.random() * 2) + 1];   
    }
  }

  let generatedBikes = [];
  for (let i = 0; i < 30; i++) {
    generatedBikes.push(new Bike());
  }
  console.log(generatedBikes);
}

generateBikes();