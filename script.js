const videoElement = document.getElementById('video');
const picInPicBtn = document.getElementById('button');
const shareBtn = document.getElementById('share-button');

let mediaStreamActive = false;

picInPicBtn.hidden = true;

const selectMediaStream = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play()
    }
  } catch (error) {
    console.log('error in selectMediaStream function: ', error)
  }
}

picInPicBtn.addEventListener('click', async () => {
  picInPicBtn.disabled = true;
  await videoElement.requestPictureInPicture();
  picInPicBtn.disabled = false;
})

shareBtn.addEventListener('click', async () => {
  if (mediaStreamActive) {
    videoElement.srcObject.getTracks().forEach((track) => {
      videoElement.srcObject.removeTrack(track)
    })
    videoElement.srcObject = null;
    mediaStreamActive = false;
    shareBtn.textContent = "Share Screen";
    picInPicBtn.hidden = true;
  } else {
    mediaStreamActive = true;
    picInPicBtn.hidden = false;
    await selectMediaStream();
    shareBtn.textContent = "Stop Sharing"
  }
})
