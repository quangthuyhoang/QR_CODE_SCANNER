const videoToo = document.querySelector("#videoElement");
const cameraOptions = document.querySelector('#camera-select-selection');

const constraints = { video: true };
const development = true;
var front = false;
const devDevices = [
  {
    deviceId: '1b773e52aa2afda0b8fa4db79b3f26d018022a578af1e2c98ff1a46e93950ebf',
    label: 'Rear Camera',
    kind: 'videoinput'
  },
  {
    deviceId: '9832e0898b5bc0e23dd1cdf2d08bc1ad43ccb6b2b9bbf95b062889d46a752df9',
    label: 'Front Camera',
    kind: 'videoinput',
  }
]


const updatedConstraints = front ? constraints : 
  {
  ...constraints,
  video : {
    deviceId: devDevices[0].deviceId,
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


class Camera {

  static hasCamera() {
    // note that enumerateDevices can always be called and does not prompt the user for permission. However, device
    // labels are only readable if served via https and an active media stream exists or permanent permission is
    // given. That doesn't matter for us though as we don't require labels.
    return navigator.mediaDevices.enumerateDevices()
    .then(devices => devices.some(device => device.kind === 'videoinput'))
    .catch(() => false);
  }

  static listCamera() {
    return navigator.mediaDevices.enumerateDevices()
    .then(devices => devices.filter(device => device.kind === 'videoinput'))
    .catch(() => false);
  }

  constructor(video) {
    this.$video = video;
  }

  _getCameraStream(constraints) {
    return navigator.mediaDevices.getUserMedia(constraints)
  }

  _setCamera(faceMode) {
    if (faceMode === 'front') {
      return this._getCameraStream(updatedConstraints)
      .then(function (stream) {
        console.log("stream inside", stream)
      this.$video.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!", error);
    });
    }
  }

 
}

const cam = new Camera(videoToo);
// console.log(cam, "cam")
cam._setCamera('front');


// if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      devices.forEach(device => {
        if(device.kind == "videoinput") {
          console.log(device)
        }
      }) 
    })
    .catch(err => console.log(err))
  navigator.mediaDevices.getUserMedia(updatedConstraints)
    .then(function (stream) {
      console.log('outside')
      videoToo.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });
// }

// ####### Get Camera Options ######
const getCameraSelection = async () => {
  let enumdevices = await navigator.mediaDevices.enumerateDevices();
  let devices = development ? devDevices : enumdevices;
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  const options = videoDevices.map(videoDevice => {
      
      return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
  });
  console.log("options", options)
 
    cameraOptions.innerHTML = options.join('');
  };

  getCameraSelection();

     // ######## switch camera ########


  