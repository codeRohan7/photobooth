var AName = 'daflon_a_name';
let video;
let pg;
let lastSnapShot;

// let timer = 0;
let showLatestPhoto = false;

let backgroundScore;
//let font   850 / 480 --500/300;
var camerabutton;
var resetbutton;
var downloadbutton;
let img;
let cWidth = (window.innerWidth >= 1366) ? "800" : "320";
let cHeight = (window.innerHeight >= 600) ? "450" : "240";
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

// function changefilter(change){
//   switch(change)
//    {
//     case "A":
//       img = loadImage ('./watermark1.png');
//       break;
//     case "B":
//       img = loadImage ('./watermark2.png');
//       break;
//       case "C":
//         img = loadImage ('./watermark3.png');
//         break;
//         case "D":
//           img = loadImage ('./watermark4.png');
//           break;
//           case "E":
//             img = loadImage ('./watermark5.png');
//             break;
//             case "F":
//               img = loadImage ('./watermark6.png');
//               break;
//               case "G":
//                 img = loadImage ('./watermark7.png');
//                 break;
//                 case "H":
//                   img = loadImage ('./watermark8.png');
//                   break;
//     default:
//       img = loadImage ('./watermark.png');
//   }
// }

function setup () {
 //alert(cWidth);

 user_name = localStorage.getItem(AName);
 d = new Date();
 n = d.getTime();
//  fileName = user_name.split(" ").join("_")+'_'+n;
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
  img = loadImage ('./watermark.png');
  // changefilter()
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
  var email_id = localStorage.getItem(AEmail);
  
  // $.ajax({
  //   type: "POST",
  //   url: "https://virtualapi.multitvsolution.com/topgun_upload_photo/uploadblob.php",
  //   data: { 
  //     image: lastImage,
  //     user_name:fileName,
  //     user_id:email_id,
  //   }
  // }).done(function(o) {
  //   console.log('saved'); 
  // });
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