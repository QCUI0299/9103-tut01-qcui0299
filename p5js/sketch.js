let mondrian;

function setup() {
  createCanvas(windowWidth, windowHeight); // Create canvas based on window size
  mondrian = new Artwork(); // Create a new Artwork instance
  createArtwork(); // Generate initial artwork

}

function draw() {
  background(255);
  translate(width / 2 - 400, height / 2 - 400); // Center the artwork
  mondrian.show(); // Display the artwork
  mondrian.updatePositions(); // Driving position changes based on Perlin noise
  mondrian.updateSizes(); // Implementing size changes
  mondrian.updateJumpingShapes(); // Implementing the jump effect of objects

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size
  mondrian.scaleShapes(); // Scale shapes to fit new size
  redraw(); // Redraw canvas
}

class Artwork {
  constructor() {
    this.shapes = []; // Initialize an array to store shapes
  }

  addShape(x, y, width, height, color, borderColor, borderWidth, type, endX = null, endY = null) {
    // Add a new shape to the shapes array
    this.shapes.push(new Shape(x, y, width, height, color, borderColor, borderWidth, type, endX, endY));
  }

  updatePositions() {
    let time = millis() * 0.002; // Time factor to control the speed of position animation
    for (let shape of this.shapes) {
      if (shape.type === 'circle') {
        // Apply Perlin noise with a unique random offset to each shape
        let randomOffsetX = shape.randomOffsetX || random(0, 1000); 
        let randomOffsetY = shape.randomOffsetY || random(0, 1000); 
        shape.randomOffsetX = randomOffsetX; // Store the random offset for consistent animation
        shape.randomOffsetY = randomOffsetY;
        
        shape.x = shape.originalX + noise(time + randomOffsetX) * 10 - 5; 
        shape.y = shape.originalY + noise(time + randomOffsetY) * 10 - 5; 
      }
    }
}

updateSizes() {
    let time = millis() * 0.002; // Time factor to control the speed of size animation
    for (let shape of this.shapes) {
      if (shape.type === 'dotted') {
        // Add a random offset to each shape for unique scaling effects
        let randomScaleOffset = shape.randomScaleOffset || random(0, 1000);
        shape.randomScaleOffset = randomScaleOffset;
        
        // Calculate a scale factor using a sine wave and random offset
        let scaleFactor = 1 + sin(time + shape.originalX + randomScaleOffset) * 0.1;
        
        // Update the width and height 
        shape.width = shape.originalWidth * scaleFactor;
        shape.height = shape.originalHeight * scaleFactor;
      }
    }
}

  updateJumpingShapes() {
    let time = millis() * 0.001; // Adjust the time scale to control how quickly the noise changes
    for (let shape of this.shapes) {
        // Use Perlin noise to generate smooth position changes
        // Generate noise based on the shape's original coordinates and time

        if (shape.type === 'circle') {
        let noiseOffset = noise(time + shape.originalX * 0.01); 
        shape.x = shape.originalX + map(noiseOffset, 0, 1, -50, 50); 

      } else if(shape.type === 'rectangleStatic'){
        let noiseOffset = noise(time + shape.originalX * 0.01); 
        shape.y = shape.originalY + map(noiseOffset, 0, 1, -10, 50); 
      }
      else if(shape.type === 'catEye'){
        let noiseOffset = noise(time * 2 + shape.originalY * 0.2); 
        shape.y = shape.originalY + map(noiseOffset, 0, 1, -15, 10); 
        shape.x = shape.originalX + map(noiseOffset, 0, 1, -10, 15); 

      }
    }
}

  show() {
    // Display each shape in the shapes array
    for (let shape of this.shapes) {
      shape.show();
    }
  }
}

class Shape {
  constructor(x, y, width, height, color, borderColor, borderWidth, type, endX, endY) {
    // Define shape properties
    this.originalX = x;
    this.originalY = y;
    this.originalWidth = width;
    this.originalHeight = height;
    this.originalEndX = endX;
    this.originalEndY = endY;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.endX = endX;
    this.endY = endY;
    this.color = color;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
    this.type = type;
  }



  show() {

    let time = millis() * 0.001;
    let opacity = map(noise(time + this.x), 0, 10, 224, 255);
     
    // Set border color and width
    stroke(this.borderColor);
    strokeWeight(this.borderWidth);
    fill(red(this.color), green(this.color), blue(this.color), opacity); 

    push();
    translate(this.x, this.y);

    // Draw the shape based on its type
     if (this.type === 'rectangle') {
      rect(0, 0, this.width, this.height);
    } else if (this.type === 'circle') {
      ellipse(0, 0, this.width, this.height);
    } else if (this.type === 'triangle') {
      triangle(
        0, -this.height / 2,
        -this.width / 2, this.height / 2,
        this.width / 2, this.height / 2
      );
    } else if (this.type === 'line') {
      line(0, 0, this.endX - this.x, this.endY - this.y);
    } else if (this.type === 'dotted') {
      this.drawDottedRect();
    }else if (this.type === 'rectangleStatic') {// static rectangle
      rect(0, 0, this.width, this.height);
    }
    else if (this.type === 'circleStatic') {// static circle
      ellipse(0, 0, this.width, this.height);
    } else if (this.type === 'catEye') {// Circle that simulates cat's eyes
      ellipse(0, 0, this.width, this.height);
    }

    pop();
  }

  drawDottedRect() {
    let dotSize = 5; // Diameter of each dot
    let spacing = 15; // Spacing between dots

    // Draw dots to form a dotted rectangle
    for (let y = 0; y < this.height; y += spacing) {
      for (let x = 0; x < this.width; x += spacing) {
        ellipse(x - this.width / 2, y - this.height / 2, dotSize, dotSize);
      }
    }
  }
}

function createArtwork() {
 
  // Small dot rectangle
  mondrian.addShape(3, 262, 800, 100, '#FCE205', '#000000', 0, 'dotted');
  mondrian.addShape(800, 0, 100, 8000, '#000000', '#000000', 0, 'dotted');
  mondrian.addShape(300, 0, 100, 1000, '#0056B4', '#000000', 0, 'dotted');
  mondrian.addShape(3, 562, 2000, 100, '#FFA500', '#000000', 0, 'dotted');
  mondrian.addShape(3, 762, 2000, 100, '#0056B4', '#000000', 0, 'dotted');


  mondrian.addShape(0, 0, 20, 400, '#0056B4', '#000000', 0, 'dotted');
  mondrian.addShape(600, 0, 20, 4000, '#0056B4', '#000000', 0, 'dotted');
  mondrian.addShape(3, 0, 2000, 100, '#FFA500', '#000000', 0, 'dotted');

  // Background lines

  mondrian.addShape(400, 0, 0, 0, '#000000', '#000000', 3, 'line', 400, 1000);
  mondrian.addShape(0, 360, 0, 0, '#000000', '#000000', 3, 'line', 400, 360);

  // Small yellow circle with lines in the upper left corner
  mondrian.addShape(19, 45, 0, 0, '#FFD700', '#FFD700', 4, 'line', 17, 100);
  mondrian.addShape(27, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 27, 130);
  mondrian.addShape(47, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 47, 150);
  mondrian.addShape(67, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 67, 130);
  mondrian.addShape(84, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 84, 150);
  mondrian.addShape(90, 45, 0, 0, '#FFD700', '#FFD700', 4, 'line', 93, 100);
  mondrian.addShape(55, 45, 80, 80, '#FFD700', '#000000', 0, 'circleStatic');
  
  // Light chrysanthemum circle
  mondrian.addShape(80, 320, 350, 350, '#FAFAD2', '#000000', 0, 'circle');
  
  // Red circle
  mondrian.addShape(300, 450, 400, 400, '#FFA500', '#000000', 0, 'circle');

  // Middle Lines
  mondrian.addShape(0, 420, 0, 0, '#000000', '#000000', 3, 'line', 400, 420);
  mondrian.addShape(380, 420, 0, 0, '#000000', '#000000', 3, 'line', 380, 800);

  // Middle red circle
  mondrian.addShape(350, 350, 200, 200, '#F34213', '#000000', 0, 'circle');
  mondrian.addShape(700, 80, 200, 200, '#F34213', '#000000', 0, 'circle');

  // Egg yellow long rectangle
  mondrian.addShape(450, 1, 250, 500, '#FAFAD2', '#000000', 0, 'rectangleStatic');
  mondrian.addShape(600, 650, 70, 150, '#FFA500', '#000000', 1, 'rectangleStatic');

  // Black rectangle
  mondrian.addShape(40, 300, 400, 60, '#000000', '#000000', 2, 'rectangleStatic');
  mondrian.addShape(20, 450, 20, 20, '#000000', '#000000', 2, 'rectangleStatic');
  mondrian.addShape(180, 400, 50, 40, '#000000', '#000000', 2, 'rectangleStatic');
  mondrian.addShape(450, 360, 15, 200, '#000000', '#000000', 2, 'rectangleStatic');

  // Blue rectangle
  mondrian.addShape(300, 260, 400, 100, '#0056B4', '#000000', 2, 'rectangle');
  mondrian.addShape(400, 630, 400, 50, '#0056B4', '#000000', 2, 'rectangleStatic');

  // Yellow cat's paw
  mondrian.addShape(400, 250, 50, 50, '#FFD700', '#000000', 0, 'circleStatic');
  mondrian.addShape(570, 250, 50, 50, '#FFD700', '#000000', 0, 'circleStatic');



  // Lower left red and black circle
  mondrian.addShape(150, 520, 50, 50, '#F34213', '#000000', 0, 'circle');
  mondrian.addShape(40, 570, 50, 50, '#000000', '#000000', 0, 'circle');

  // Lower left line
  mondrian.addShape(50, 615, 0, 0, '#000000', '#000000', 3, 'line', 380, 610);

  // Cat head
  mondrian.addShape(450, 180, 50, 50, '#FFD700', '#000000', 0, 'triangle');
  mondrian.addShape(522, 180, 50, 50, '#FFD700', '#000000', 0, 'triangle');
  mondrian.addShape(425, 200, 120, 60, '#FFD700', '#000000', 0, 'rectangle');
  mondrian.addShape(450, 230, 10, 30, '#000000', '#000000', 0, 'catEye');
  mondrian.addShape(515, 230, 10, 30, '#000000', '#000000', 0, 'catEye');
}
