'use strict';
//finish then submit 2-3 min video https://byui.instructure.com/courses/250604/assignments/11825803 and do weekly quiz
const canvas = document.querySelector("#canvas");
canvas.style.border = '5px solid gray';
const surface = canvas.getContext('2d');  //referred to as "context"
let canvasWidth = 1200, canvasHeight = 600;
let canvasMid = () => {return{x:canvasWidth/2, y:canvasHeight/2};}
let view = {x:0, y:0, scale:1, left:0, right:canvasWidth, top:0, bottom:canvasHeight};
let allNodes = [], loadedNodes = [], currentNode, connectingNode = [];
const textOutput = document.querySelector("#output");
let displaySettings = {"default":"black"};
//let interfaceData = {surface:surface, connectingNode:connectingNode, displaySettings:displaySettings, view:view};
drawDisplay();

class Node {
  //id, type, title, text, subnodes, connections (connected node, direction:to/from-in/out, connection type),  position (location, left and right)
  //use # before private properties
  constructor(width, height, color, border, surface, connectingNode, displaySettings, view){
    //connections blank
    //x,y is from view x,y
    //left, right from other data
    this.x = view.x+canvasWidth/2-width/2, this.y = view.y+canvasHeight/2-height/2;
    this.bottom = this.y + height;
    this.width = width, this.height = height;
    this.color = color, this.border = border;
    this.surface = surface, this.connecting = connectingNode;
    this.leftTab = {x:this.x, y:this.y+height/2};
    this.rightTab = {x:this.x+width, y:this.y+height/2};
    this.connections= [];
    this.displaySettings = displaySettings;
    this.view = view;
  }
  connectTo(node){
    this.connections.push({direction:"from", partner:node, type:"default"});
    node.connections.push({direction:"to", partner:this, type:"default"});
  }
  leftTab(){
    return {x:this.x, y:this.y+height/2};
  }
  rightTab(){
    return {x:this.x+width, y:this.y+height/2};
  }
  drawRect(){
    //console.log("drawRect this:", this);
    let x = this.x-view.x, y = this.y-view.y;
    //filling
    this.surface.fillStyle = this.color;
    this.surface.fillRect(x, y, this.width, this.height);
    //border
    this.surface.beginPath();
    this.surface.strokeStyle = this.border;
    this.surface.roundRect(x, y, this.width, this.height, 5);
    this.surface.stroke();
    //highlight
    if(this.connecting.includes(this)){ //if connectingNode.includes(this)
      let thickness = 2;
      this.surface.beginPath();
      this.surface.roundRect(x-thickness, y-thickness, this.width+2*thickness, this.height+2*thickness, 5);
      this.surface.strokeStyle = "#50cfec";
      this.surface.stroke();
    }
  }
  drawLines(){
    //console.log("drawLines this:", this);
    this.connections.forEach((cnt) => {
      let origin;
      let destination;
      if(cnt.direction=="from"){
        // let origin = this.rightTab();
        // let destination = cnt.partner.leftTab();
        origin = {x:this.x+this.width, y:this.y+this.height/2};
        destination = {x:cnt.partner.x, y:cnt.partner.y+cnt.partner.height/2};
      }else{
        // let origin = this.leftTab();
        // let destination = cnt.partner.rightTab();
        origin = {x:this.x, y:this.y+this.height/2};
        destination = {x:cnt.partner.x+cnt.partner.width, y:cnt.partner.y+cnt.partner.height/2};
      }
      this.line(origin, destination, this.displaySettings[cnt.type]);
      //console.log(this.displaySettings[cnt.type]);
    });
  }
  line(start, end, style){
    this.surface.beginPath();
    this.surface.moveTo(start.x-view.x, start.y-view.y);
    this.surface.lineTo(end.x-view.x, end.y-view.y);
    this.surface.stroke();
    this.surface.strokeStyle = style;
  }
  //strokeRect does rectangle outline, with strokeStyle and lineWidth as properties
}

function print(text){
  textOutput.innerHTML = text;
}

function selectById(nodeId){
  //search allNodes for one with the Id, return a reference to it
}

function clearCanvas(){
  surface.clearRect(0,0,canvasWidth, canvasHeight);
}
function loadScreen(){
  //if any pair of coordinates (x,y edges) are within the view, it's visible - there's a corner in view if two sides are lined up with the view
  //node.left and node.right for Xs
  //node.top and node.bottom for Ys
  //one of the Xs must be in x range & one of the Ys must be in y range
  loadedNodes = allNodes.filter((node) =>
  ((node.x>view.left && node.x<view.right) || (node.rightTab.x>view.left && node.rightTab.x<view.right)) &&
  ((node.y>view.top && node.y<view.bottom) || (node.bottom>view.top && node.bottom<view.bottom)))
  //console.log("visible nodes loaded:",loadedNodes);
  //extend visible nodes to include connected nodes
  //goal: take array of loadedNodes, take array of connections from each of those, access nodes from that list and add them, without duplicates to the new load
  loadedNodes.forEach((node)=>node.connections.forEach((cnt) =>
  {
    if (loadedNodes.indexOf(cnt.partner)==-1){
      loadedNodes.push(cnt.partner);
    }
  }));
  //alternate method: from array of allNodes, select those whose connections contain a loadedNode. Add that to the loadedNode list.
  //drafted: loadedNodes = allNodes.filter((node)=>loadedNodes.includes(node) || node.connections.includes())
}
function drawDisplay(){
  clearCanvas();
  loadScreen();
  //loadedNodes.forEach((node)=>drawRect(node.color, node.x, node.y, node.width, node.height));  //pass in node destructured
  //console.log("loaded",loadedNodes);
  //console.log("all",allNodes);
  loadedNodes.forEach((node)=>node.drawRect());
  loadedNodes.forEach((node)=>node.drawLines());    //------------------
  //loadedNodes.forEach((node)=>drawLines(node));
  //forEach of the loadedNodes, drawRect and line
}


let mouseOverNode = function(x, y, node){
  let nodeLeft = node.x, nodeRight = node.x + node.width; //  let nodeLeft = node.left, nodeRight = node.right;?
  let nodeTop = node.y, nodeBottom = node.y + node.height;
  nodeLeft -= view.x, nodeRight -= view.x;
  nodeTop -= view.y, nodeBottom -= view.y;
  if(x>nodeLeft && x<nodeRight && y>nodeTop && y<nodeBottom){
    return true;
  }
  return false;
}

let mouseX;
let mouseY;
let isDragging = false;
let mouseDown = function(event){
  event.preventDefault();
  drawDisplay();
  //console.log(event); //event includes screenX and screenY and clientX and clientY
  mouseX = parseInt(event.clientX), mouseY = parseInt(event.clientY);
  loadedNodes.forEach((node)=>{
    if(mouseOverNode(mouseX, mouseY, node)){
      currentNode = node;
      isDragging = true;
    }
  })
}
canvas.onmousedown = mouseDown;

let mouseUp = function(event){
  if(!isDragging) return;
  event.preventDefault();
  isDragging = false;
  let endX = parseInt(event.clientX);
  let endY = parseInt(event.clientY);
}
let mouseOut = mouseUp;
canvas.onmouseup = mouseUp;
canvas.onmouseout = mouseOut;

let mouseMove = function(event){
  mouseX = event.clientX, mouseY = event.clientY;
  //console.log(event);
  //console.log(event.movementX, event.movementY);
  if(!isDragging){
    return;
  }else{
    event.preventDefault;
    let dx = event.movementX, dy = event.movementY;
    //console.log("moved: ",dx,dy);
    //let currentNode = allNodes[currentNode];
    currentNode.x += dx;
    currentNode.y += dy;
    drawDisplay();
  }
}
canvas.onmousemove = mouseMove;

let keyPress=function(press){
  //console.log(press);
  if (press.code=="Space"||press.key==" "){
    //allNodes.push({x:0, y:0, width:50, height:40, left:0, right:100, bottom:80, top:0, connections:[]});
    view.x = 0;
    view.y = 0;
    drawDisplay();  
  }else if(press.key=="="){
    //allNodes.push({x:0, y:0, width:150, height:100, left:0, right:100, bottom:80, top:0, connections:[], color:"lightgray"});
    allNodes.push(new Node(150,100,"#D3D3D3","gray",surface, connectingNode, displaySettings, view));
    console.log(allNodes);
    //console.log(loadedNodes);
    drawDisplay();
  }else if(press.key=="-"){
    loadedNodes.forEach((node)=>{
      if(mouseOverNode(mouseX, mouseY, node)){
        currentNode = node;
        if(!connectingNode.includes(currentNode)){
          connectingNode.push(currentNode);
          drawDisplay();
          if(connectingNode.length>1){
            connectingNode[0].connectTo(connectingNode[1]);
            connectingNode.pop();
            connectingNode.pop();
            drawDisplay();
          }
        }
      }
  });
  }else if(["w","a","s","d"].includes(press.key)){
    let stepSize = 3;
    let movementKey = {"w":[0,1], "a":[-1,0], "s":[0,-1], "d":[1,0]};
    view.x += stepSize*movementKey[press.key][0];
    view.y -= stepSize*movementKey[press.key][1];
    drawDisplay();
    print(`${view.x},${view.y}`);
    //console.log(view);
  }
}
document.addEventListener("keypress",keyPress);

let mouseWheel=function(event){
  //console.log(event); 
  view.y -= event.wheelDeltaY/10;
  drawDisplay();
  //wheelDeltaY/10
}
document.addEventListener("wheel",mouseWheel);
