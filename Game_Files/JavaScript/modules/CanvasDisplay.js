class Rectangle
{
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {string} colour 
     */
    constructor(x, y, width, height, colour)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
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
        
        console.log(this.height);
        context.fillStyle = this.colour;
        context.fillRect(this.x, this.y, this.width, this.height);

        if (!outline) return;
        
        context.lineWidth = lineWidth;
        context.strokeStyle = outlineColour;
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

class Img
{
    /**
     * 
     * @param {string} source 
     */
    constructor(source)
    {
        this.source = source;
    }

    DrawImage(canvas, x, y, width, height)
    {
        let context = canvas.getContext("2d");
        let img = new Image();
        img.src = this.source;
        img.onload = function() { context.drawImage(img, x, y, width, height); }
    }
}

class Position
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

export {Rectangle, Img, Position};