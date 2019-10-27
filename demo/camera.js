var video = document.querySelector("#videoElement");

var front = false;

const constraints = {
  video: true
}

const uppdatedConstrants = front ? constraints : 
  {
  ...constraints,
  video : {
    facingMode: { exact: "environment" },
    width: { 
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440
    },
  }
}

if (navigator.mediaDevices.getUserMedia) {
    // console.log(navigator.mediaDevices)
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      devices.forEach(device => {
        if(device.kind == "videoinput") {
          console.log(device)
        }
      }) 
    })
    .catch(err => console.log(err))
    // console.log()
  navigator.mediaDevices.getUserMedia(uppdatedConstrants)
    .then(function (stream) {
        console.log("stream", stream)
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}