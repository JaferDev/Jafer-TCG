class CanvasElement
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

class Transform extends CanvasElement
{
    constructor(x, y, width, height)
    {
        super(x, y);
        this.width = width;
        this.height = height;

        //Animation
        this.elapsedTime = 0;
        this.milisTimeout = 0;
        this.DisplayFunc;
    }
}

class Interactable extends Transform
{
    constructor(x, y, width, height, functionality = {})
    {
        super(x, y);
        this.width = width;
        this.height = height;
        this.functionality = functionality;
    }
}

class Rectangle extends Interactable
{
    /**
     * 
     * @param {number} width 
     * @param {number} height 
     * @param {string} colour 
     */
    constructor(x, y, width, height, colour, functionality)
    {
        super(x, y, width, height);
        this.colour = colour;
        this.functionality = functionality;
    }

    /**
     * 
     * @param {Canvas} canvas 
     * @param {boolean} outline 
     * @param {string} outlineColour 
     * @param {number} lineWidth 
     */

    DrawRectangle(canvas, outline = false, outlineColour = "rgba(0, 0, 0, 1)", lineWidth = 10)
    {
        let context = canvas.getContext("2d");
        
        context.fillStyle = this.colour;
        context.fillRect(this.x, this.y, this.width, this.height);

        if (!outline) return;
        
        context.lineWidth = lineWidth;
        context.strokeStyle = outlineColour;
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

class Img extends Interactable 
{
    /**
     * 
     * @param {string} source 
     */
    constructor(source, x, y, width, height, functionality)
    {
        super(x, y, width, height, functionality);
        this.source = source;

        this.elapsedTime = 0;
    }

    DrawImage(canvas)
    {
        let context = canvas.getContext("2d");
        let img = new Image();
        img.src = this.source;
        img.onload = () => { context.drawImage(img, this.x, this.y, this.width, this.height); }
    }
}

class Text extends Transform
{
    /**
     * Creates a text obj
     * @param {number} x - xPos in canvas
     * @param {number} y - yPos in canvas
     * @param {string} text - Text to display
     * @param {string} font - Font family to use
     * @param {number} size - Font size
     * @param {string} colour - Any colour that's usable in CSS
     * @param {string} fontSrc - Relative location of font
     */
    constructor(x, y, text, font, size, colour = "rgb(0, 0, 0)", fontSrc = "../Fonts/Silkscreen/Silkscreen-Regular.ttf")
    {
        super(x, y);
        this.text = text;
        this.font = font;
        this.size = size;
        this.colour = colour
        this.fontSrc = fontSrc; 
    }

    /**
     * Writes the text object onto canvas
     * @param {Canvas} canvas 
     * @param {boolean} fill 
     */
    Write(canvas, fill = true)
    {
        const context = canvas.getContext("2d");
        let font = new FontFace(this.font, "url(" + this.fontSrc + ")");
        font.load().then(() => {
            context.font = `${this.size}px ${font.family}`;
            context.fillStyle = this.colour;
            if (fill) context.fillText(this.text, this.x, this.y);
            else context.strokeText(this.text, this.x, this.y);
        });
    }
}

/**
 * Clears a portion of canvas
 * @param {Canvas} canvas - Canvas whose portion to clear
 * @param {number} x - xPos on canvas
 * @param {number} y -yPos on canvas
 * @param {number} width - Width of portion
 * @param {number} height - Height of portion
 */
function ClearPortion(canvas, x, y, width, height)
{
    const context = canvas.getContext("2d");
    context.clearRect(x, y, width, height);
}

function ClearAll(canvas)
{
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

export {CanvasElement, Rectangle, Img, Text, ClearPortion, ClearAll, Transform};