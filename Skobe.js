
let s="{[]({})}";
console.log(CheckSkobe(s));

function CheckSkobe(s) {

let stack=[];
let arr=s.split("");
for (let i=0; i<arr.length;i++) {
    if (arr[i]=='{') {
        stack.push(arr[i]);
    } else if (arr[i]=='[') {
        stack.push(arr[i]);
    } else if (arr[i]=='(') {
        stack.push(arr[i]);
    } else if (arr[i]==')') {
        let prev_skobe=stack.pop();
        if (prev_skobe!='(') {
            return false;
        }
    } else if (arr[i]==']') {
        let prev_skobe=stack.pop();
        if (prev_skobe!='[') {
            return false;
        }
    } else if (arr[i]=='}') {
        let prev_skobe=stack.pop();
        if (prev_skobe!='{') {
            return false;
        }
    }
}
if (stack.length==0) {
    return true;
}
return false;

}