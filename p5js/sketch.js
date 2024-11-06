let mondrian;

function setup() {
  createCanvas(windowWidth, windowHeight); // Create canvas based on window size
  mondrian = new Artwork(); // Create a new Artwork instance
  createArtwork(); // Generate initial artwork
  noLoop(); // Prevent continuous drawing
}

function draw() {
  background(255);
  mondrian.show(); // Display the artwork
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

  scaleShapes() {
    // Calculate scaling factors
    const scaleX = windowWidth / 800;
    const scaleY = windowHeight / 800;
    // Adjust each shape's size based on scale factors
    for (let shape of this.shapes) {
      shape.scale(scaleX, scaleY);
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

  scale(scaleX, scaleY) {
    // Scale the shape's position and size by scale factors
    this.x = this.originalX * scaleX;
    this.y = this.originalY * scaleY;
    this.width = this.originalWidth * scaleX;
    this.height = this.originalHeight * scaleY;
    if (this.endX !== null) this.endX = this.originalEndX * scaleX;
    if (this.endY !== null) this.endY = this.originalEndY * scaleY;
  }

  show() {
    // Set border color and width
    stroke(this.borderColor);
    strokeWeight(this.borderWidth);
    fill(this.color);

    // Draw the shape based on its type
    if (this.type === 'rectangle') {
      rect(this.x, this.y, this.width, this.height);
    } else if (this.type === 'semicircle') {
      arc(this.x + this.width / 2, this.y + this.height / 2, this.width, this.height, 0, PI);
    } else if (this.type === 'triangle') {
      triangle(
        this.x + this.width / 2, this.y,
        this.x, this.y + this.height,
        this.x + this.width, this.y + this.height
      );
    } else if (this.type === 'dotted') {
      this.drawDottedRect();
    } else if (this.type === 'circle') {
      ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width);
    } else if (this.type === 'line') {
      line(this.x, this.y, this.endX, this.endY);
    }
  }

  drawDottedRect() {
    let dotSize = 5; // Diameter of each dot
    let spacing = 15; // Spacing between dots

    // Draw dots to form a dotted rectangle
    for (let y = this.y; y < this.y + this.height; y += spacing) {
      for (let x = this.x; x < this.x + this.width; x += spacing) {
        fill(this.color);
        ellipse(x + dotSize / 2, y + dotSize / 2, dotSize, dotSize);
      }
    }
  }
}

function createArtwork() {
  // Add background rectangle
  mondrian.addShape(0, 0, 800, 800, '#F8F8FF', '#000000', 1, 'rectangle');

  // Background lines
  mondrian.addShape(300, 200, 0, 0, '#000000', '#000000', 2, 'line', 800, 50);
  mondrian.addShape(400, 0, 0, 0, '#000000', '#000000', 3, 'line', 400, 800);
  mondrian.addShape(0, 360, 0, 0, '#000000', '#000000', 3, 'line', 400, 360);

  // Small yellow circle with lines in the upper left corner
  mondrian.addShape(15, 25, 80, 50, '#FFD700', '#000000', 0, 'circle');
  mondrian.addShape(17, 45, 0, 0, '#FFD700', '#FFD700', 4, 'line', 17, 100);
  mondrian.addShape(27, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 27, 130);
  mondrian.addShape(47, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 47, 150);
  mondrian.addShape(67, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 67, 130);
  mondrian.addShape(84, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 84, 150);
  mondrian.addShape(93, 45, 0, 0, '#FFD700', '#FFD700', 4, 'line', 93, 100);

  // Light chrysanthemum circle
  mondrian.addShape(80, 320, 350, 100, '#FAFAD2', '#000000', 0, 'circle');
  
  // Red circle
  mondrian.addShape(300, 450, 400, 100, '#FFA500', '#000000', 0, 'circle');

  // Middle Lines
  mondrian.addShape(0, 420, 0, 0, '#000000', '#000000', 3, 'line', 400, 420);
  mondrian.addShape(380, 420, 0, 0, '#000000', '#000000', 3, 'line', 380, 800);

  // Middle red circle
  mondrian.addShape(350, 350, 200, 50, '#F34213', '#000000', 0, 'circle');
  mondrian.addShape(600, 80, 200, 50, '#F34213', '#000000', 0, 'circle');

  // Egg yellow long rectangle
  mondrian.addShape(450, 1, 250, 500, '#FAFAD2', '#000000', 0, 'rectangle');
  mondrian.addShape(600, 650, 70, 150, '#FFA500', '#000000', 1, 'rectangle');

  // Black rectangle
  mondrian.addShape(40, 300, 400, 60, '#000000', '#000000', 2, 'rectangle');
  mondrian.addShape(20, 450, 20, 20, '#000000', '#000000', 2, 'rectangle');
  mondrian.addShape(180, 400, 50, 40, '#000000', '#000000', 2, 'rectangle');
  mondrian.addShape(450, 360, 15, 200, '#000000', '#000000', 2, 'rectangle');

  // Blue rectangle
  mondrian.addShape(300, 260, 400, 100, '#0056B4', '#000000', 2, 'rectangle');
  mondrian.addShape(400, 630, 400, 50, '#0056B4', '#000000', 2, 'rectangle');

  // Yellow cat's paw
  mondrian.addShape(400, 230, 40, 50, '#FFD700', '#000000', 0, 'circle');
  mondrian.addShape(570, 230, 40, 50, '#FFD700', '#000000', 0, 'circle');

  // Lower left red and black circle
  mondrian.addShape(150, 520, 50, 50, '#F34213', '#000000', 0, 'circle');
  mondrian.addShape(40, 570, 50, 50, '#000000', '#000000', 0, 'circle');

  // Lower left line
  mondrian.addShape(50, 615, 0, 0, '#000000', '#000000', 3, 'line', 380, 500);

  // Small dot rectangle
  mondrian.addShape(305, 262, 500, 100, '#FCE205', '#000000', 0, 'dotted');

  // Semicircle
  mondrian.addShape(600, 309, 100, 100, '#F34213', '#000000', 2, 'semicircle');

  // Cat head
  mondrian.addShape(445, 150, 50, 50, '#FFD700', '#000000', 0, 'triangle');
  mondrian.addShape(515, 150, 50, 50, '#FFD700', '#000000', 0, 'triangle');
  mondrian.addShape(445, 200, 120, 60, '#FFD700', '#000000', 0, 'rectangle');
}
