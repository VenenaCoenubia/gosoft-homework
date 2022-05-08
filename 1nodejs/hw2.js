const a_z = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let output = "";
async function Coenubia(){
    try{
for(let i=0; i<26; i+=2){
    output += a_z[i+1] + " " + a_z[i] + " ";
}

await console.log("OUTPUT:",output);
}catch{
console.error("error");
}
}
Coenubia();