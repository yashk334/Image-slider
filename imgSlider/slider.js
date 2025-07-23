const slides = document.querySelector(".slides");
const slideImgs = document.querySelectorAll(".slides img");
const alldots = document.querySelector(".dots");

const totalImg = slideImgs.length;
let currIndex = 0;

let offsets = [];

const calculateOffsets = () =>{
        let sum = 0;
        offsets.length = 0;
       slideImgs.forEach(img => {
            offsets.push(sum);
            sum += img.clientWidth;
       });
}

const nextSelector = () =>{
       currIndex = (currIndex+1) % totalImg;
       updateSelector();
}
const prevSelector = () =>{            
      currIndex = (currIndex-1+totalImg) % totalImg;
      updateSelector();
}

const updateSelector = () =>{
      const offset = offsets[currIndex];
      slides.style.transform = `translateX(-${offset}px)`;
      updateDots();
}

window.addEventListener("load",()=>{
         calculateOffsets();
         createDots();
});

window.addEventListener("resize", () => {
    calculateOffsets();
    updateSelector(); // maintain current image position
});


let autoSlidesInterval = setInterval(nextSelector,2000);

slides.addEventListener("mouseenter",()=>{
       clearInterval(autoSlidesInterval);
})
slides.addEventListener("mouseleave",()=>{
       autoSlidesInterval = setInterval(nextSelector,2000);
})

const createDots = () =>{
        for(let i=0;i<totalImg;i++){
               const dot = document.createElement("div");
               dot.classList.add("dot");
               dot.addEventListener("click",()=>{
                      currIndex = i;
                      updateSelector();
               });
               alldots.appendChild(dot);
        };
};

const updateDots = () =>{
          const fulldots = document.querySelectorAll(".dot");
          fulldots.forEach(dot=> dot.classList.remove("active"));
          if(fulldots[currIndex]) fulldots[currIndex].classList.add("active");
          }


