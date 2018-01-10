module.exports = function () { 
  rand_numbers = [];  
  for(var i=0; i < 4; i++){
    rand_numbers.push(Math.floor(Math.random() * 6) + 1);
  }
  return rand_numbers;
};
