let video;
let pg;
let lastSnapShot;

let timer = 0;
let showLatestPhoto = false;

let backgroundScore;
//let font;
var camerabutton;
var resetbutton;
var downloadbutton;
let img;
let cWidth = (window.innerWidth >= 1366) ? "900" : "500";
let cHeight = (window.innerHeight >= 600) ? "580" : "300";
var myCanvas;
var user_name;
var fileName;
function logout () {
  window.localStorage.clear ();
  window.location.replace('index.html');
}
function preload () {
  //  backgroundScore = loadSound('Assets/backgroundScore.mp3');
  //font = loadFont('CourierNewBold.ttf');
}

function setup () {
 //alert(cWidth);
 user_name = "Demo Test";
 d = new Date();
 n = d.getTime();
 fileName = user_name.split(" ").join("_")+'_'+n;
 myCanvas =createCanvas (cWidth, cHeight);
 myCanvas.parent("idnameofdiv");
  
$('.btn1').click(takePicture)
  camerabutton = createImg ('');
  camerabutton.mousePressed (takePicture);

  $('.btn2').click(resetcamera)
  resetbutton = createImg ('');
  resetbutton.mousePressed (resetcamera);

  $('.btn3').click(downloadPicture)
  downloadbutton = createImg ('');
  downloadbutton.mousePressed (downloadPicture);
  $('.btn2').hide()
  $('.btn3').hide()
  resetbutton.hide ();
  downloadbutton.hide ();

  video = createCapture (VIDEO);
  video.elt.setAttribute('playsinline', '');
  video.size (cWidth, cHeight);
  video.hide ();
  //backgroundScore.loop();
  img = loadImage ('navphoto/watermark.png');
  //createCanvas (cWidth, cHeight);
  pg =  (cWidth, cHeight);
}

function draw () {
  x= 0;
  y=0;
  camerabutton.position (cWidth / 2 - 50, y + cHeight + 40);
  resetbutton.position (cWidth / 2 + 150, y + cHeight + 40);
  downloadbutton.position (cWidth / 2 - 250, y + cHeight + 40);

  //fill (32, 55, 96);
  // rect (x - 20, y - 20, 40 + cWidth, 40 + cHeight);
  //push ();
  //translate (width, 5);
  // translate(video.width, 0);
  //scale (-1, 1);
  image (video, x, y, cWidth, cHeight);
  //pop ();

  //image(video,x,y,cWidth, cHeight);
  image (img,x, y,cWidth,cHeight);

  //Show the last image taken for a short period
  if (showLatestPhoto) {
    image (pg, x, y);
    // image ( x - 20, y - 20);
  }
}

function resetcamera () {
  showLatestPhoto = false;
  $('.btn1').show();
  $('.btn2').hide();
  $('.btn3').hide();
  camerabutton.show ();
  resetbutton.hide ();
  downloadbutton.hide ();
}

function takePicture () {
  $('.btn1').hide();
  $('.btn2').show();
  $('.btn3').show();
  camerabutton.hide ();
  resetbutton.show ();
  downloadbutton.show ();
  pg = get (x, y, cWidth, cHeight);
  showLatestPhoto = true;
  lastImage = myCanvas.elt.toDataURL("image/jpeg", 0.5);
  var email_id = 'test';
  
  $.ajax({
    type: "POST",
    url: "https://virtualapi.multitvsolution.com/topgun_upload_photo/uploadblob.php",
    data: { 
      image: lastImage,
      user_name:fileName,
      user_id:email_id,
    }
  }).done(function(o) {
    console.log('saved'); 
  });
  //alert(lastImage);
}
function downloadPicture () {
  pg = get (x, y, cWidth, cHeight);
  pg.save (fileName+'.jpg');
  showLatestPhoto = false;
  $('.btn1').show();
  $('.btn2').hide();
  $('.btn3').hide();
  camerabutton.show ();
  resetbutton.hide ();
  downloadbutton.hide ();
  //to_save.save("MyPicture.png");
}
function backMethod(){
  window.location.replace('index.html');
}