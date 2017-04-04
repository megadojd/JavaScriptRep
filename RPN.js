let str="234 345 456 + + 5 /";
//let str="1 2 + 4 * 3 +";
//out: 207

console.log(RPN(str));

function RPN (str) {
let s=[];
for (let a of str.split (/[ ]+/)) {
    let num_regex=/^[0-9]+$/ig;
    if (num_regex.test(a)) {
        s.push(a);
    } else {
        s1=s.pop();
        s2=s.pop();
        let s3;
        if (a=='-') {
            s3=new Number(s2) - new Number(s1);
        } else if (a=='*') {
            s3=new Number(s2) * new Number(s1);
        } else if (a=='/') {
            s3=new Number(s2) / new Number(s1);
        } else if (a=='+') {
            s3=new Number(s2)+ new Number(s1);
        } else {
            console.log("no:" + a);
        }
        s.push(s3);
    }
}
    if (s.length!=1) {
        return undefined
    }
    return s.pop();
}
