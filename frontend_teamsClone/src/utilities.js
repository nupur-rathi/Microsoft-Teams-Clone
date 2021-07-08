//copy any text to clipboard function
export function textToClipboard (text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

//constraints for videoFrame
export const constraints = {
    width: 1500,
    height: 1080,
    aspectRatio: 1.777777778
};