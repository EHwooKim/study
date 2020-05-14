console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    
    const $h1 = document.createElement('h1')
    $h1.innerText = '어서오세요'
    $target.appendChild($h1)

    
  }
  
}
