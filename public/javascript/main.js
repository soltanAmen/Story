// Function to check if an element is in viewport
function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
console.log("Hello World");
// Function to handle scroll event
function handleScroll() {
  var hiddenDiv1 = document.querySelector("#popular");
  var hiddenDiv2 = document.querySelector("#subcontainer");
  if (isInViewport(hiddenDiv1)) {
    hiddenDiv1.classList.add("visible");
  }
  if (isInViewport(hiddenDiv2)) {
    hiddenDiv2.classList.add("visible");
  }
}

// Add scroll event listener
window.addEventListener("scroll", handleScroll);

// Initial check in case the div is already in view on page load
document.addEventListener("DOMContentLoaded", function () {
  handleScroll();
});
