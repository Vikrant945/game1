

//html dom manupulation objects
let board=document.querySelector(".board");
let HTMLScore=document.querySelector(".score")
let HTMLHScore=document.querySelector(".highScore")
let snakeImg=document.querySelector(".image")
let notification=document.querySelector(".notification");

const foodSound=new Audio('eat.mp3');
const impact1=new Audio('impact1.mp3');
const woosh=new Audio('woosh.mp3');
const gameoverSound =new Audio('hit.mp3');
const gameStartSound= new Audio('loading.mp3');


//control buttons


controlbtn=document.querySelectorAll(".controlbtn");






///direction object
let direction={x:0,y:0};

//initial location of objects
// let head={x:13,y:5};
let snake=[{x:17,y:22}];
let food={x:5,y:10};
let negativefood={};


let scoreValue=0;
if(localStorage.getItem('highScore')==null)
{
    HighscoreValue=0;
   

}
else{
    HighscoreValue=localStorage.getItem('highScore');
    HTMLHScore.innerText=`HighScore:${HighscoreValue}`;
    
}





//notification to start on click
// let colornum1=2;
// let colornum2=121;
// let colornum3=2;

// let coloup=setInterval(()=>{
   
//     colornum1++;
//     colornum3++;
//     notification.style.color=`rgb(${colornum1}, 121, ${colornum3})`;
    
//    if(colornum1==255){
//         clearInterval(coloup)
//     }

// },1);

 


// let colodown=setInterval(()=>{
   
//     colornum1--;
//     colornum3--;
//     notification.style.color=`rgb(${colornum1}, 121, ${colornum3})`;
    
//    if(colornum1==2){
//         clearInterval(colodown)
//     }

// },4)




//start image sizing

snakeImg.addEventListener("click",()=>{
     
        let count=517;


        notification.style.display="none";


       

function resizeImage() {
    if (count > 180) {
        count -= 25; woosh.play(); // Decrease by 5px per frame for quick resizing
        if (count < 180) count = 180; // Ensure it doesn't go below 180
        snakeImg.style.width = `${count}px`;
        // console.log(count);
        requestAnimationFrame(resizeImage);
    }
}

requestAnimationFrame(resizeImage);

setTimeout(()=>{
    
let top=317;


    function resizeTop() {
        if (top > 23) {
            top -= 85; // Decrease by 5px per frame for quick resizing
            if (top < 13) top = 13; impact1.play() // Ensure it doesn't go below 180
            snakeImg.style.top = `${top}px`;
            // console.log(count);
            requestAnimationFrame(resizeTop);
        }
    }

      
    requestAnimationFrame(resizeTop);

    //main function game starts here
 direction={x:0,y:-1};

 window.requestAnimationFrame(main);
},950)


})




     

let speed=5;
let lastPaintTime=0;
let nfoodtimer=0;



//main function
function main(ctime){
    // sessionStorage.setItem("yoyo",78);
    window,requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<(1/speed)){
        return;
    }
    // console.log(ctime);
    lastPaintTime=ctime;


    //game start or restart 
    if(gameEngine(nfoodtimer)==-1){
     direction={x:0,y:0};
     snake=[{x:17,y:22}];
     scoreValue=0;
    HTMLScore.innerText="Score:0"
     speed=5;
     negativefood={};
    






       
    };



}


//
function gameEngine(ctime){
    board.innerHTML="";


//creating snake and food
snake.forEach((e,index)=>{
    let bodypart=document.createElement('div');
    bodypart.style.gridRowStart=e.y;
    bodypart.style.gridColumnStart=e.x;

   if(index==0){
    bodypart.classList.add("head");
   }
   else
   {
    bodypart.classList.add("snakebody");
   }
    board.appendChild(bodypart);


})

//creating the food
let foodpart=document.createElement('div');
foodpart.style.gridRowStart=food.y;
foodpart.style.gridColumnStart=food.x;

foodpart.classList.add("food");
board.appendChild(foodpart);



// if (scoreValue>0){
   
//creating negative food
// nfoodtimer++;
// if((Math.floor(nfoodtimer))%25==0){
//     negativefood.x=food.x;
//     negativefood.y=food.y;

//     let nfoodpart=document.createElement('div');
// nfoodpart.style.gridRowStart=negativefood.y;
// nfoodpart.style.gridColumnStart=negativefood.x;

// foodpart.classList.add("negativefood");
// board.appendChild(foodpart);
// }
// }

// if(negativefood.x==snake[0].x && negativefood.y==snake[0].y){
//     console.log("negative")
// }

//collision with black food







// move the snake 

for(let i=snake.length-2;i>=0;i--){
    snake[i+1]={...snake[i]}
};
snake[0].x+=direction.x;
snake[0].y+=direction.y;



//collision

//collision with food


if(food.x==snake[0].x && food.y==snake[0].y)
{


    
 foodSound.play();
    snake.unshift({x:food.x ,y:food.y})
    let x1=Math.round(0+(26-0)*Math.random());
    let y1=Math.round(0+(26-0)*Math.random());
    
    food={x:x1,y:y1}



    //display the score
// let scoreValue=0
 scoreValue+=1;
 HTMLScore.innerText=`Score:${scoreValue}`;
 
//increase speed level
if(scoreValue%3==0 && scoreValue!=3  || scoreValue==4){
    speed+=6;
}


 if(scoreValue>HighscoreValue)
 {
     HighscoreValue=scoreValue
     HTMLHScore.innerText=`HighScore:${HighscoreValue}`
     
     //set the high score
     localStorage.setItem('highScore',HighscoreValue);
 }
 
}

//collision with itself
// if(snake.length>4){
// for(let j=1;j<snake.length;j++)
// {
//     console.log(snake[j]);
//     if(snake[j].x===snake[0].x ||  snake[j].y===snake[0].y ){
//         console.log(snake[0].x,snake[0].y);
//     alert("game over . collision Press OK to restart......");
        
//         return  -1;
//     }
// }
// }

//collision with wall
if(snake[0].x>27 || snake[0].x<0 || snake[0].y>27 || snake[0].y<0){

    
    gameoverSound.play();
    gameoverSound.play();
    alert("Game Over. Press OK to restart......");
    return -1;
}



//change the directions of the snake
document.addEventListener('keydown',(e)=>{

   
    switch(e.key){
        case "ArrowUp":

            
            direction.x=0;
            direction.y=-1;
            
           
            break;

        
         case "ArrowDown":
                    
                    direction.x=0;
                    direction.y=1;
                    break;
          case "ArrowLeft":
                        
                        direction.x=-1;
                        direction.y=0;
                        break;
         case "ArrowRight":
                            
                            direction.x=1;
                            direction.y=0;
                            break;
            default:
                break;

    }
    
})

//changing the directions with buttons
for(controlbtneach of controlbtn){
    controlbtneach.addEventListener("click",(e)=>{
    
        

        switch(e.target.id){
            case "btnup":
    
                
                direction.x=0;
                direction.y=-1;
                
               
                break;
    
            
             case "btndown":
                        
                        direction.x=0;
                        direction.y=1;
                        break;
              case "btnleft":
                            
                            direction.x=-1;
                            direction.y=0;
                            break;
             case "btnright":
                                
                                direction.x=1;
                                direction.y=0;
                                break;
                default:
                    break;
    
        }

    })
    }

}




