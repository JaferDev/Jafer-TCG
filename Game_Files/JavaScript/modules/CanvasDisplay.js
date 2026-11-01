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

    DrawRectangle(canvas, outline = false, outlineColour = "rgba(0, 0, 0, 1)", lineWidth = 10)
    {
        let context = canvas.getContext("2d");
        
        console.log(this.height);
        context.fillStyle = this.colour;
        context.fillRect(this.x, this.y, this.width, this.height);

        if (outline)
        {
            context.lineWidth = lineWidth;
            context.strokeStyle = outlineColour;
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

export {Rectangle};