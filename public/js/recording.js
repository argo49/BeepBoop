function record () {

    mic = new Wit.Microphone(document.getElementById("wit-microphone"));

    mic.onready = function () {
      console.log("Microphone is ready to record");
    };
    mic.onaudiostart = function () {
      console.log("Recording started");
    };
    mic.onaudioend = function () {
      console.log("Recording stopped, processing started");
    };
    mic.onerror = function (err) {
      console.log("Error: " + err);
    };

    mic.onresult = function (intent, entities) {
      console.log(intent, entities);
    };

    mic.connect("BMW5G6EWIQFC3ZBIUC3ZIJRJ3ZQG766X");
}