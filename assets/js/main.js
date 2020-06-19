const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let img = new Image();
let fileName = "";

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");

// Menambah Event Jika Mouse Klik
document.addEventListener("click", e => {
    //e.target.classList.contains artinya jika user klik button dengan class , contoh filter-btn maka ... akan melakukan perintah didalmnya
    if (e.target.classList.contains("filter-btn")) {
        if (e.target.classList.contains("brightness-add")) {
            Caman("#canvas", img, function() {
                this.brightness(5).render();
            });
        } else if (e.target.classList.contains("brightness-remove")) {
            Caman("#canvas", img, function() {
                this.brightness(-5).render();
            });
        } else if (e.target.classList.contains("contrast-add")) {
            Caman("#canvas", img, function() {
                this.contrast(5).render();
            });
        } else if (e.target.classList.contains("contrast-remove")) {
            Caman("#canvas", img, function() {
                this.contrast(-5).render();
            });
        } else if (e.target.classList.contains("saturation-add")) {
            Caman("#canvas", img, function() {
                this.saturation(5).render();
            });
        } else if (e.target.classList.contains("saturation-remove")) {
            Caman("#canvas", img, function() {
                this.saturation(-5).render();
            });
        } else if (e.target.classList.contains("vibrance-add")) {
            Caman("#canvas", img, function() {
                this.vibrance(5).render();
            });
        } else if (e.target.classList.contains("vibrance-remove")) {
            Caman("#canvas", img, function() {
                this.vibrance(-5).render();
            });
        } else if (e.target.classList.contains("vintage-add")) {
            Caman("#canvas", img, function() {
                this.vintage().render();
            });
        } else if (e.target.classList.contains("lomo-add")) {
            //new library
            // P = new Pixastic(ctx);
            // P["solarize"]().done(function() {
            //     canvas.style.display = "block";
            // });
            Caman("#canvas", img, function() {
                this.lomo().render();
            //     // this.invert().render(); dipertajam
            //     // this.sepia(50).render();
            //     // Arguments: (R, G, B, strength)
            //     this.colorize(25, 180, 200, 20);
            //
            //     // The other way is to specify a color in hex form:
            //     this.colorize("#4090D5", 20);
            });
        } else if (e.target.classList.contains("clarity-add")) {
            Caman("#canvas", img, function() {
                this.clarity().render();
            });
        } else if (e.target.classList.contains("sincity-add")) {
            Caman("#canvas", img, function() {
                this.sinCity().render();
            });
        } else if (e.target.classList.contains("crossprocess-add")) {
            Caman("#canvas", img, function() {
                this.crossProcess().render();
            });
        } else if (e.target.classList.contains("pinhole-add")) {
            Caman("#canvas", img, function() {
                this.pinhole().render();
            });
        } else if (e.target.classList.contains("nostalgia-add")) {
            Caman("#canvas", img, function() {
                this.nostalgia().render();
            });
        } else if (e.target.classList.contains("hermajesty-add")) {
            Caman("#canvas", img, function() {
                this.herMajesty().render();
            });
        }
    }
});

// Jika revert button di klik / jika Buton Remove Filter
revertBtn.addEventListener("click", e => {
    Caman("#canvas", img, function() {
        this.revert();
    });
    P = new Pixastic(img);
    P.done();
});

// Upload File
uploadFile.addEventListener("change", () => {
    // Get File
    const file = document.getElementById("upload-file").files[0];
    // Init FileReader API
    const reader = new FileReader();

    // Check for file ada atau engga
    if (file) {
        // Set file name
        fileName = file.name;
        // Read data as URL
        reader.readAsDataURL(file);
    }

    // Add image to canvas
    reader.addEventListener(
        "load",
        () => {
            // Create image
            img = new Image();
            // Set image src
            img.src = reader.result;
            // On image load add to canvas
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                canvas.removeAttribute("data-caman-id");
            };
        },
        false
    );
});

// Download Event / jika button download di klik
downloadBtn.addEventListener("click", () => {
    // Get ext
    const fileExtension = fileName.slice(-4);

    // Init new filename
    let newFilename;

    // Check image type
    if (fileExtension === ".jpg" || fileExtension === ".png") {
        // new filename
        newFilename = fileName.substring(0, fileName.length - 4) + "-edited.jpg"; // menambahkan nama -edited
    }

    // Call download / memanggil funsi download dibawah dengan param meter canvas (image yang telah di edit) dan nama file
    download(canvas, newFilename);
});

// Download
function download(canvas, filename) {
    // Init event
    let e;
    // Create link
    const link = document.createElement("a");

    // Set props
    link.download = filename;
    link.href = canvas.toDataURL("image/jpeg", 0.8);
    // New mouse event
    e = new MouseEvent("click");
    // Dispatch event
    link.dispatchEvent(e);
}
