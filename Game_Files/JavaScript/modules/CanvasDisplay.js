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

    StartAnim(canvas, duration, initialTransform, DisplayFunc = () => {} , isText = false, fps = 60)
    {
        console.log(DisplayFunc);
        this.elapsedTime = 0;
        this.milisTimeout = 1000 / fps;
        setTimeout(() => {
            setInterval(() => {this.#Animate(duration, initialTransform, canvas, DisplayFunc, isText)}, this.milisTimeout);
        }, duration * 1000);
    }

    #Animate(duration, initialTransform, canvas, DisplayFunc = () => {}, isText = false, textObj = null)
    {
        let timePercent = this.elapsedTime / (duration * 1000);
        if (timePercent < 0 || timePercent > 1) return;
        let newTransform = this.#Lerp(initialTransform, timePercent, isText, textObj);
        //ClearPortion(canvas, this.x, this.y, this.width, this.height);
        
        this.x = newTransform.x;
        this.y = newTransform.y;
        if (!isText)
        {
            this.width = newTransform.width;
            this.height = newTransform.height;
        }
        else  textObj.size = newTransform.height;

        DisplayFunc(canvas);

        this.elapsedTime += this.milisTimeout;
    }

    #Lerp(initialTransform, timePercent, isText, textObj)
    {
        console.log(initialTransform, timePercent, this.width);
        if (timePercent < 0 || timePercent > 1) return;
        let newTransform =  new Transform(initialTransform.x + (this.x - initialTransform.x) * timePercent,
                             initialTransform.y + (this.y - initialTransform.y) * timePercent,
                             initialTransform.width + (this.width - initialTransform.width) * timePercent,
                             initialTransform.height + (this.height - initialTransform.height) * timePercent);
        
        if (isText) newTransform.height = textObj.size + (this.size - initialTransform.height) * timePercent;

        return newTransform;
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
    constructor(x, y, text, font, size, colour = "rgb(0, 0, 0)", fontSrc = "../Fonts/Silkscreen/Silkscreen-Regular.ttf")
    {
        super(x, y);
        this.text = text;
        this.font = font;
        this.size = size;
        this.colour = colour
        this.fontSrc = fontSrc; 
    }

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