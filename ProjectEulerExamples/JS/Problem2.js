var n;

var sum;

var fibNum;

n = 2;

sum = 0;

fibNum = fib(n);

while(fibNum <= 4000000){
  if(fibNum % 2 == 0){
    sum += fibNum;

  }
  fibNum = fib(n);
}

console.log("Problem2: " + sum);
function fib(n){
  var Phi;
  Phi = (1  +  5 *  * (0 + 5)) / 2;
  z = ~((Phi *  * n  -  ( - Phi) *  * ( - n)) / (5 *  * (0 + 5)));

  return z
}
