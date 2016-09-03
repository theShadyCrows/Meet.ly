 //BEGIN: CUSTOM DROP-DOWN MENU FUNCTIONALITY ============================================
var dropDown = function($scope) {
  var selectBoxNodeList = document.getElementsByClassName('custom-drop-down-list');

  var testDivs = Array.prototype.filter.call(selectBoxNodeList, function(node){
    return node.nodeName === 'DIV';
  });

  testDivs.map(function(node) {
      
    var selectBox = node.getElementsByClassName('select-box')[0];
    var optionsList = node.getElementsByClassName('options-list')[0];
    var arrowArea = node.getElementsByClassName('drop-down-arrow-area')[0];
    var dropDownItem = optionsList.getElementsByTagName('li');

    selectBox.addEventListener('click', function() {
      optionsList.classList.toggle('show');
      arrowArea.classList.toggle('arrow-up');
      arrowArea.classList.toggle('arrow-down');
      selectBox.classList.toggle('select-open');
    });

    for (var i = 0; i < dropDownItem.length; i++) {
      dropDownItem[i].addEventListener('click', function() {
        selectBox.value = this.innerText;
        $scope.selectedCat = this.innerText;
        optionsList.classList.remove('show');
        arrowArea.classList.remove('arrow-up');
        arrowArea.classList.add('arrow-down');
        selectBox.classList.remove('select-open');
      });
    };

    optionsList.style.width = (selectBox.offsetWidth - 2) + 'px';

  });
};
