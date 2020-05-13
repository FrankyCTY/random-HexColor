// ==============================================
// Classes
// ==============================================
class Coloor {
  constructor() {
    this.colorDivs = document.querySelectorAll(".color");
    this.hexTexts = document.querySelectorAll(".color h2");
    this.slidersDivs = document.querySelectorAll(".sliders");
    this.controlDivs = document.querySelectorAll(".controls");

    //btns
    this.adjustBtns = document.querySelectorAll(".adjust");
    this.closeAdjustBtns = document.querySelectorAll(".close-adjustment");
    this.lockBtns = document.querySelectorAll(".lock");

    //sliders
    this.hueSliders = document.querySelectorAll(".hue-input");
    this.brightSliders = document.querySelectorAll(".bright-input");
    this.satSliders = document.querySelectorAll(".sat-input");

    //library
    this.libraryPopup = document.querySelector(".library-popup");

    //Util Elements
    this.savedColors = [];
  }
  generateRanColor(coloor) {
    const currentColors = [];
    coloor.colorDivs.forEach((colorDiv, index) => {
      //Generate 5 random colors and save it to an array.

      if (colorDiv.classList.contains("locked") && coloor.savedColors !== []) {
        console.log("it is not empty now");
        // currentColors.push(coloor.savedColors[index]);

        //!!!!!!!Use chroma because savedColors is a hex array but currentColors is a chroma object array.!!!!!!!
        currentColors.push(chroma(coloor.savedColors[index]));
      } else {
        const randomColor = chroma.random();
        currentColors.push(randomColor);
      }
    });
    return currentColors;
  }

  updateUIbg(obj) {
    obj.coloor.colorDivs.forEach((colorDiv, index) => {
      //Update 5 hex text
      const hexText = colorDiv.children[0];
      hexText.innerText = obj.hexColors[index];

      //Update 5 colorDiv's background
      colorDiv.style.background = obj.hexColors[index];
    });

    return obj;
  }

  updateUIbgForSingle(obj) {
    //Update 5 hex text
    const hexText = coloor.colorDivs[obj.index].children[0];
    hexText.innerText = obj.color;

    //Update 5 colorDiv's background
    obj.coloor.colorDivs[obj.index].style.background = obj.color;

    return obj;
  }

  updateSliders(obj) {
    //======== Update the sliders' color in each slider div ========
    obj.coloor.slidersDivs.forEach((sliderDiv, index) => {
      //GET sliders from sliderDiv
      const [hue, brightness, saturation] = sliderDiv.querySelectorAll(
        'input[type="range"]'
      );
      // console.log(saturation);

      //======== 1. Color Brightness slider ========
      const dark = "black";
      const white = "white";
      // const midBrightness = hexColors[index].set("hsl.l", 0.5);
      const midBrightness = obj.hexColors[index].set("hsl.l", 0.5);
      const scaledBrightness = chroma.scale([dark, midBrightness, white]);

      //set 'brightness' slider's background image
      brightness.style.backgroundImage = `linear-gradient(to right, ${scaledBrightness(
        0
      )}, ${scaledBrightness(0.5)}, ${scaledBrightness(1)}
      )`;

      //======== 2. Color Saturation slider ========
      const noSat = obj.hexColors[index].set("hsl.s", 0);

      const currentSat = obj.hexColors[index].saturate();
      const mostSat = obj.hexColors[index].set("hsl.s", 1);
      const scaledSat = chroma.scale([noSat, currentSat, mostSat]);

      //set 'saturation' slider's background image
      saturation.style.backgroundImage = `linear-gradient(to right, ${scaledSat(
        0
      )}, ${scaledSat(0.5)}, ${scaledSat(1)})`;

      //======== 3. Color Hue Slider ========
      hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75),rgb(204,204,75), rgb(75,204,75), rgb(75,204,204), rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))`;

      //======== Update the sliders' pointer in each slider div ========
      //======== 1. Color Brightness slider ========
      obj.coloor.hueSliders[index].value = obj.hexColors[index].get("hsl.h");
      obj.coloor.brightSliders[index].value = obj.hexColors[index].get("hsl.l");
      obj.coloor.satSliders[index].value = obj.hexColors[index].get("hsl.s");
    });

    return obj;
  }

  updateSlidersSingle(obj) {
    //GET sliders from sliderDiv
    const [hue, brightness, saturation] = obj.coloor.slidersDivs[
      obj.index
    ].querySelectorAll('input[type="range"]');
    // console.log(saturation);

    //======== 1. Color Brightness slider ========
    const dark = "black";
    const white = "white";
    // const midBrightness = hexColors[index].set("hsl.l", 0.5);
    const midBrightness = obj.color.set("hsl.l", 0.5);
    const scaledBrightness = chroma.scale([dark, midBrightness, white]);

    //set 'brightness' slider's background image
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaledBrightness(
      0
    )}, ${scaledBrightness(0.5)}, ${scaledBrightness(1)}
    )`;

    //======== 2. Color Saturation slider ========
    const noSat = obj.color.set("hsl.s", 0);

    const currentSat = obj.color.saturate();
    const mostSat = obj.color.set("hsl.s", 1);
    const scaledSat = chroma.scale([noSat, currentSat, mostSat]);

    //set 'saturation' slider's background image
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaledSat(
      0
    )}, ${scaledSat(0.5)}, ${scaledSat(1)})`;

    //======== 3. Color Hue Slider ========
    hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75),rgb(204,204,75), rgb(75,204,75), rgb(75,204,204), rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))`;
  }

  updateUIColor(obj) {
    obj.hexColors.forEach((color, index) => {
      const brightness = color.luminance();
      if (brightness > 0.5) {
        //Control div btns change clr
        obj.coloor.controlDivs[index].querySelector(".adjust").style.color =
          "black";
        obj.coloor.controlDivs[index].querySelector(".lock").style.color =
          "black";

        //H2 hex text color
        obj.coloor.colorDivs[index].children[0].style.color = "black";
      } else {
        //Control div btns change clr
        obj.coloor.controlDivs[index].querySelector(".adjust").style.color =
          "white";
        obj.coloor.controlDivs[index].querySelector(".lock").style.color =
          "white";

        //H2 hex text color
        obj.coloor.colorDivs[index].children[0].style.color = "white";
      }
    });
  }

  updateUIColorSingle(obj) {
    const brightness = obj.color.luminance();
    if (brightness > 0.5) {
      //Control div btns change clr
      obj.coloor.controlDivs[obj.index].querySelector(".adjust").style.color =
        "black";
      obj.coloor.controlDivs[obj.index].querySelector(".lock").style.color =
        "black";

      //H2 hex text color
      obj.coloor.colorDivs[obj.index].children[0].style.color = "black";
    } else {
      //Control div btns change clr
      obj.coloor.controlDivs[obj.index].querySelector(".adjust").style.color =
        "white";
      obj.coloor.controlDivs[obj.index].querySelector(".lock").style.color =
        "white";

      //H2 hex text color
      obj.coloor.colorDivs[obj.index].children[0].style.color = "white";
    }

    return obj;
  }

  sliderUpdateBg(event, index, coloor) {
    const eventTarget = event.target;
    if ((eventTarget.type = "range")) {
      const color = this.generateClrFromSliders({ index, coloor });
      UpdateSingleUIWorkFlow({ color, index, coloor });
    }
  }

  saveColors(obj) {
    //Clear savedColors array
    obj.coloor.savedColors = [];
    for (let i = 0; i < coloor.colorDivs.length; i++) {
      //save all the generated color hex into an array
      obj.coloor.savedColors.push(obj.hexColors[i].hex());
    }

    return obj;
  }

  lockColor(obj) {
    obj.coloor.colorDivs[obj.index].classList.toggle("locked");
    obj.coloor.lockBtns[obj.index].children[0].classList.toggle("fa-lock-open");
    obj.coloor.lockBtns[obj.index].children[0].classList.toggle("fa-lock");
  }

  //======================== Utils ========================
  generateClrFromSliders(obj) {
    // console.log(coloor.savedColors);
    console.log(obj.coloor);

    //Get the hsl values from the first generated color from each color div.
    const changedHueValue = obj.coloor.hueSliders[obj.index].value;
    const changedBrightValue = obj.coloor.brightSliders[obj.index].value;
    const changedSatValue = obj.coloor.satSliders[obj.index].value;

    //Consist new color from the changed sliders' value
    const newColor = chroma(obj.coloor.savedColors[obj.index])
      .set("hsl.h", changedHueValue)
      .set("hsl.s", changedSatValue)
      .set("hsl.l", changedBrightValue);

    return newColor;
  }

  copyHexText(obj) {
    //Copy text
    const clipBoard = document.createElement("textarea");
    clipBoard.value = obj.hexText.innerText;
    document.body.append(clipBoard);
    clipBoard.select();
    document.execCommand("copy");
    document.body.removeChild(clipBoard);

    //Pop up animation
    document.querySelector(".copy-container").classList.add("active");
    document.querySelector(".copy-popup").classList.add("active");
  }

  savePalette(coloor) {
    //close save popup and overlay(container)
    document.querySelector(".save-container").classList.toggle("active");
    document.querySelector(".save-popup").classList.toggle("active");

    const name = document.querySelector(".save-name").value;
    const colors = [];
    document.querySelectorAll(".color h2").forEach((headTwo) => {
      colors.push(headTwo.innerText);
    });

    //Generate Object
    let paletteNr = coloor.libraryPopup.querySelectorAll("h4 ~ *").length;
    let paletteObj = {
      name,
      colors,
      paletteNr,
    };

    this.pushToLS(paletteObj);
    //Clear input value
    document.querySelector(".save-name").value = "";

    //Generate the palette for the library
    const palette = document.createElement("div");
    palette.classList.add("custom-palette");
    const title = document.createElement("h4");
    title.innerText = paletteObj.name;
    const preview = document.createElement("div");
    preview.classList.add("small-preview");

    paletteObj.colors.forEach((smallColor) => {
      const smallDiv = document.createElement("div");
      smallDiv.classList.add("smallDiv");
      smallDiv.style.backgroundColor = smallColor;

      //Append
      preview.append(smallDiv);
    });

    //Add choose btn
    const paletteBtn = document.createElement("button");
    paletteBtn.classList.add("pick-palette-btn");
    paletteBtn.classList.add(paletteObj.paletteNr);
    paletteBtn.innerText = "Choose";

    //Attach event to the btn
    paletteBtn.addEventListener("click", (event) => {
      //Close Library
      document.querySelector(".library-container").classList.toggle("active");
      document.querySelector(".library-popup").classList.toggle("active");

      let tempColors = [];

      const colorDivs = event.target.parentElement.querySelectorAll(
        ".smallDiv"
      );

      colorDivs.forEach((colorDiv) => {
        tempColors.push(chroma(colorDiv.style.backgroundColor));
      });

      //Update UI bases on colors
      UpdateAllUIWorkFlow({ hexColors: tempColors, coloor });
    });

    //Append more
    palette.append(title);
    palette.append(preview);
    palette.append(paletteBtn);

    coloor.libraryPopup.append(palette);
  }

  pushToLS(paletteObj) {
    const lsPalettes = this.checkLSArray("palettes");
    lsPalettes.push(paletteObj);

    localStorage.setItem("palettes", JSON.stringify(lsPalettes));
  }

  checkLSArray(arrayName) {
    const arr = [];
    if (!localStorage.getItem(arrayName)) {
      return arr;
    } else {
      return JSON.parse(localStorage.getItem(arrayName));
    }
  }

  composeAll(f, g) {
    return function (s) {
      return f(g(s));
    };
  }

  composeGeneratorAll(...funcs) {
    return funcs.reduce(this.composeAll);
  }
}

const coloor = new Coloor();

// ==============================================
// Compose and Compose generator
// ==============================================
const UpdateAllUIWorkFlow = coloor.composeGeneratorAll(
  coloor.updateUIColor,
  coloor.updateSliders,
  coloor.updateUIbg,
  coloor.saveColors
);

const UpdateSingleUIWorkFlow = coloor.composeGeneratorAll(
  coloor.updateSlidersSingle,
  coloor.updateUIColorSingle,
  coloor.updateUIbgForSingle
);

// ==============================================
// Event Listeners
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
  //compose
  const hexColors = coloor.generateRanColor(coloor);
  UpdateAllUIWorkFlow({ hexColors, coloor: coloor });
});

//Generate btn
document.querySelector(".generate").addEventListener("click", () => {
  //compose
  const hexColors = coloor.generateRanColor(coloor);
  UpdateAllUIWorkFlow({ hexColors, coloor: coloor });
});

//Click -> open adjust div
coloor.adjustBtns.forEach((adjustBtn, index) => {
  adjustBtn.addEventListener("click", function () {
    coloor.slidersDivs[index].classList.toggle("active");
  });
});

//Click -> close adject div
coloor.closeAdjustBtns.forEach((closeAdjustBtn, index) => {
  closeAdjustBtn.addEventListener("click", () => {
    coloor.slidersDivs[index].classList.remove("active");
  });
});

//Change sliders -> update UI
coloor.slidersDivs.forEach((sliderDiv, index) => {
  sliderDiv.addEventListener("input", (event) => {
    coloor.sliderUpdateBg(event, index, coloor);
  });
});

//LockBtns - > click to lock
coloor.lockBtns.forEach((lockBtn, index) => {
  lockBtn.addEventListener("click", () => {
    coloor.lockColor({ index, coloor });
  });
});

//Click hext text -> copy and paste + pop up
coloor.hexTexts.forEach((hexText, index) => {
  hexText.addEventListener("click", () => {
    coloor.copyHexText({ hexText, index, coloor });
  });
});

// Copy Popup transitionend
document.querySelector(".copy-popup").addEventListener("transitionend", () => {
  document.querySelector(".copy-container").classList.remove("active");
  document.querySelector(".copy-popup").classList.remove("active");
});

// Save Popup
document.querySelector(".save").addEventListener("click", () => {
  document.querySelector(".save-container").classList.toggle("active");
  document.querySelector(".save-popup").classList.toggle("active");
});

// close Save btn
document.querySelector(".close-save").addEventListener("click", () => {
  document.querySelector(".save-container").classList.toggle("active");
  document.querySelector(".save-popup").classList.toggle("active");
});

// save btn inside save popup -> click to Save Palette
document.querySelector(".submit-save").addEventListener("click", (event) => {
  coloor.savePalette(coloor);
});

// open library popup and library container - click
document.querySelector(".library").addEventListener("click", () => {
  document.querySelector(".library-container").classList.toggle("active");
  document.querySelector(".library-popup").classList.toggle("active");
});

// close library btn
document.querySelector(".close-library").addEventListener("click", () => {
  document.querySelector(".library-container").classList.toggle("active");
  document.querySelector(".library-popup").classList.toggle("active");
});

localStorage.clear();
