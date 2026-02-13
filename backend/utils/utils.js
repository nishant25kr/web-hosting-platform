const MAX_LEN = 5

function generate() {
    let ans = ""
    const subset = "123456778990aldflaoqpueriunmcbzxcdafdf"
    for (let i = 0; i < MAX_LEN; i++) {
        ans += subset[Math.floor(Math.random() * subset.length)]
    }
    return ans;
}
// console.log(generate())