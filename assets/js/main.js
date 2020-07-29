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
        } else if (e.target.classList.contains("brightness-add")) {
            Caman("#canvas", img, function() {
                this.brightness(5).render();
            });
        } else if (e.target.classList.contains("brightness-remove")) {
            Caman("#canvas", img, function() {
                this.brightness(-5).render();
            });
        } else if (e.target.classList.contains("vintage-add")) {
            Caman("#canvas", img, function() {
                this.vintage().render();
            });
        } else if (e.target.classList.contains("noise-add")) {
            Caman("#canvas", img, function () {
                this.noise(15).render();
            });
        } else if (e.target.classList.contains("hue-add")) {
            Caman("#canvas", img, function () {
                this.hue(90).render();
            });
        } else if (e.target.classList.contains("darken-add")) {
            Caman("#canvas", img, function () {
                this.gamma(1.4).render();
            });
        } else if (e.target.classList.contains("clip-add")) {
            Caman("#canvas", img, function() {
                this.clip(20).render();
            });
        } else if (e.target.classList.contains("pinhole-add")) {
            Caman("#canvas", img, function() {
                this.pinhole().render();
            });
        } else if (e.target.classList.contains("nostalgia-add")) {
            Caman("#canvas", img, function() {
                this.nostalgia().render();
            });
        } else if (e.target.classList.contains("invert-add")) {
            Caman("#canvas", img, function() {
                this.invert().render();
            });
        }
    }
});

// Jika revert button di klik / jika Buton Remove Filter
revertBtn.addEventListener("click", e => {
    if (fileName !== "") {
        Caman("#canvas", img, function () {
            this.revert();
        });
    } else {
        alert("Upload Image First !");
    }
});

// Upload File
uploadFile.addEventListener("change", () => {

    const file = document.getElementById("upload-file").files[0];
    // Init FileReader API
    const reader = new FileReader();

    // Allowing file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    // untuk cek file type
    if (!allowedExtensions.exec(file.name)) {
        alert('Allowed File Only jpg , jpeg, png !');
    } else {
        if (file.size > 0) {
            // cek ukuran gambar
            const size = (file.size / 1024 / 1024).toFixed(2);

            if (size > 2) {
                alert("File too Big, please select a file less than 2mb");
            } else {
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
                        // On image load add to canvas / setelah upload langsung load gambar di canvas
                        img.onload = function() {
                            canvas.width = img.width;
                            canvas.height = img.height;
                            ctx.drawImage(img, 0, 0, img.width, img.height);
                            canvas.removeAttribute("data-caman-id");
                        };
                    },
                    false
                );
            }
        }
    }
});

// Download Event / jika button download di klik
downloadBtn.addEventListener("click", () => {
    if (fileName !== "") {
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
    } else {
        alert("Upload Image First !");
    }
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
