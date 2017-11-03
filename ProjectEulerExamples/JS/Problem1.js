//comment
var sum;
sum = 0;
for(var i = 1; i <= 999; i+=1){
  if(( i % 3 == 0) || ( i % 5 == 0)){
    sum += i;
  }
}

console.log("Problem1: " + sum);
