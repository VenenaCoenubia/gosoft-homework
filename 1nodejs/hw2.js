const a_z = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let output = "";

for(let i=0; i<26; i+=2){
    output += a_z[i+1] + " " + a_z[i] + " ";
}

console.log("OUTPUT:",output)
