const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
}
  
const createBlobFile = (body) => {
    const blob = new Blob([body],  {type: 'text/plain'});
  
    return blob;
}

export default {
    base64ToArrayBuffer,
    createBlobFile
}