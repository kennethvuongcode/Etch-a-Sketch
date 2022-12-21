let slider = document.getElementById("myRange");
let output = document.getElementById("demo");

const createbtn = document.querySelector('#create');
createbtn.addEventListener('click', () => createGrid(parseInt(output.innerHTML)));

const clearbtn = document.querySelector('#clear');
clearbtn.addEventListener('click', () => clear())

const blackbtn = document.querySelector('#black');
blackbtn.addEventListener('click', () => {hue = 'black'; color()});

const rainbowbtn = document.querySelector('#rainbow');
rainbowbtn.addEventListener('click', () => {hue = 'rainbow'; color()});

const rampbtn = document.querySelector('#dark');
rampbtn.addEventListener('click', () => {hue = 'dark'; color()});

const eraserbtn = document.querySelector('#eraser');
eraserbtn.addEventListener('click', () => {hue = 'eraser'; color()});

addEventListener('mousedown', () => {
    counter = 1;
    console.log(counter);
});

addEventListener('mouseup', () => {
    counter = 0;
    console.log(counter);;
})

let counter = 0;
let randomColor;
let hue = 'dark';

output.innerHTML = slider.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
  }

function createGrid(size) {
    numItems = size * size;
    document.getElementById("canvas").style.gridTemplateColumns = `repeat(${size}, auto)`; 
    
    const canvas = document.querySelector('#canvas');
    let child = canvas.lastElementChild; //Removing previous canvas
    while (child) {
        canvas.removeChild(child);
        child = canvas.lastElementChild;
    }
    
    for (let i = 0; i < numItems; i++) { //Populating new canvas
        const block = document.createElement('div');
        block.classList.add('grid-item');   
        canvas.appendChild(block)
        block.style.backgroundColor = '#ffffff';
    }    
}

function color() {
    let canvasBlocks = canvas.querySelectorAll('div'); 
    let holder = '';
    let check = '';

    canvasBlocks.forEach(div => {
        div.addEventListener('click', select)
        div.addEventListener('mouseenter', drag)
    })
}

function changeSize(size) {}

function clear() {
    const canvas = document.querySelector('#canvas');
    let canvasBlocks = canvas.querySelectorAll('div'); 
    canvasBlocks.forEach(div => {
        div.style.backgroundColor = 'white';
    })
    console.log('works')
}

function select() {
    switch(hue) {
        case 'black':
            this.style.backgroundColor = 'black';
            break;
        case 'rainbow':
            this.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            break;
        case 'dark':
            check = this.style.backgroundColor;
            if (check == 'black')
                break;
            holder = pSBC(-0.2,this.style.backgroundColor);
            this.style.backgroundColor = holder;
            console.log(this.style.backgroundColor)
            break;
        case 'eraser':
            this.style.backgroundColor = '#ffffff';
            break;
}}

function drag() {
    if (counter == 1){
    switch(hue) {
        case 'black':
            this.style.backgroundColor = 'black';
            break;
        case 'rainbow':
            this.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            break;
        case 'dark':
            check = this.style.backgroundColor;
            if (check == 'black')
                break;
            holder = pSBC(-0.2,this.style.backgroundColor);
            this.style.backgroundColor = holder;
            break;
        case 'eraser':
            this.style.backgroundColor = '#ffffff';
            break;
}}
}

function test() {console.log(hue)};
// Version 4.0
const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

function valuetoHex(col) {
    let a = col.split("(")[1].split(")")[0];

    a = a.split(",");

    var b = a.map(function(col){             //For each array element
        col = parseInt(col).toString(16);      //Convert to a base16 string
        return (col.length==1) ? "0"+col : col;  //Add zero if we get only one character
    })
    b = "#"+b.join("");

    return b;
}
