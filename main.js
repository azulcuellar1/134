
song = "";
//crear la variable objects = [];
objects = [];

status = "";

function preload()
{
  song=loadSound("alert.mp3");
  //cargar en la variable song la canción alert.mp3
	
}

function setup() {
  canvas=createCanvas(380,380)
  //crear el canvas
  
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380)
  //establecer el tamaño del video
  
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Estado: Detectando objetos";
}

function modelLoaded() {
  //imprimir en consola "Modelo cargado"
  console.log("¡Modelo cargado!")
  
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  //establecer objects = results
  objects = results;
  
}


function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Estado: Detectando objetos";
          //establecer fill con r,g,b
          fill(r,g,b);
          
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         
          if(objects[i].label == "person")
          {
            document.getElementById("number_of_objects").innerHTML = "Se encontró el bebé.";
            console.log("stop");
            //detener la reproduccion de la variable song
            song.stop();
          }
          else
          {
            document.getElementById("number_of_objects").innerHTML = "No se encontró el bebé.";
            console.log("play"); 
            song.play();
          }
         }

        if(objects.length == 0)
        {
          document.getElementById("number_of_objects").innerHTML = "No se encontró el bebé.";
          console.log("play"); 
          song.play();
        }
      }
}
