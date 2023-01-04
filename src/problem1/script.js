var sum_to_n_a = function(n) {
    // your code here
    let sum = n
    for (let i = 1; i < n; i++) {
        sum += i
    }
    return sum
};

var sum_to_n_b = function(n) {
    // your code here
    return (n+1) * n / 2
};

var sum_to_n_c = function(n) {
    // your code here
    return n && n + sum_to_n_c(n - 1);
};
