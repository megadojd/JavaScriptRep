"use strict";

//конструктор объекта
let Value=function(a,b) {
    this.a = a;
    //this.b = b;
    this.toString=function() {
        //return this.a + " + " + this.b + "i";
        return this.a;
    }
};

//конструктор элемента списка
let Node=function (value) {
    this.data=value;
    this.next= null;
    this.previous= null;
    this.toString=function(){
        return this.data.toString();
    }
}

//конструктор списка
let SuperList=function () {
    this.first_element=null;
    this.last_element=null;
    this.add=function (value) {
        //создаем новый элемент (ещё не привязан к списку)
        let node=new Node(value);
        if (this.first_element==null) {
            //если первого элемента нет, присваиваем ссылку на новый элемент
            this.first_element=node;
            this.last_element=this.first_element; //последний элемент равен первому в случае одного элемента
        } else {
            //если первый элемент есть, добавляем в него ссылочку на новый элемент
            this.last_element.next=node; //привязываем ссылку на новый элемент к списку
            node.previous=this.last_element; //ставим обратную ссылку на предыдущий элемента
            this.last_element=node; //теперь последним элементом списка должен стать добавленный элемент
        }
    }
    //подсчёт числа элементов, можно сделать свойством, хранить и  увеличивать при добавлении элементов
    this.count=function () {
        let count=0;
        if (this.first_element==null) {
            //если нет ни одного элемента возвращаем ноль
            return count;
        } else {
            //иначе начинаем считать начиная с 1
            count=1;
        }
        let current_element=this.first_element;
        while (current_element.next!=null) {
            //если есть ссылочка на следующий элемент прибавляем единичку
            count++;
            //теперь текущим элементом становится следующий элемент
            current_element=current_element.next;
        }
        return count;
    }
    //простая функция вывода строки для проверки корректности списка
    this.toString=function() {
        let s="";
        if (this.first_element==null) {
            //если нет ни одного элемента возвращаем ноль
            return s;
        } else {
            //s=first_element.data.a + " + " + first_element.data.b + "i";
        }
        let current_element=this.first_element;
        while (current_element.next!=null) {
            //если есть ссылочка на следующий элемент прибавляем единичку
            s = s + current_element.toString() + "\n";
            //теперь текущим элементом становится следующий элемент
            current_element=current_element.next;
        }
        s="Вывод:\n" + s + current_element.toString() + "\n";
        return s;
    }

//получить объект по индексу (порядковому номеру)
    this.getDataByIndex=function(index) {
        if (this.first_element==null) {
            //если нет ни одного элемента возвращаем null
            return null;
        }
        let current_index=0;
        let current_element=this.first_element;
        while (current_element!=null) {
            //если есть ссылочка на следующий элемент прибавляем единичку
            current_index++;
            if (current_index==index) {
                return current_element.data; //возвращаем сам объект
                //break;
            }
            //теперь текущим элементом становится следующий элемент
            current_element=current_element.next;
        }
/*            if (current_index==index) {
                return current_element.data; //возвращаем сам объект
                //break;
            }
*/
        return null;
    }


//получить элемент (Node) по индексу (порядковому номеру)
    this.getNodeByIndex=function(index) {
        if (this.first_element==null) {
            //если нет ни одного элемента возвращаем null
            return null;
        }
        let current_index=0;
        let current_element=this.first_element;
        while (current_element!=null) {
            //если есть ссылочка на следующий элемент прибавляем единичку
            current_index++;
            if (current_index==index) {
                return current_element; //возвращаем сам объект
            }
            //теперь текущим элементом становится следующий элемент
            current_element=current_element.next;
        }
        return null;
    }

//вставить по индексу!
    this.insertByIndex=function(index, value) {
        if (this.first_element==null && index!=1) {
            //если нет ни одного элемента, а индекс не равен 1 возвращаем -1
            return false;
        }
        if (this.first_element==null && index==1) {
            //если первого элемента нет, присваиваем ссылку на новый элемент
            let node=new Node(value);
            this.first_element=node;
            this.last_element=this.first_element; //последний элемент равен первому в случае одного элемента
            return true;
        }
        let current_index=1;//будем считать позиции с 1-цы
        let current_element=this.first_element;
        //let previous_element=null;
        while (current_element!=null) {
            if (current_index==index) {

                let node=new Node(value);
                if (current_element.previous!=null) {
                    //если текущий элемент не превый в списке
                    //предыдущий элемент теперь должен ссылаться на добавленный
                    //а добавленный ссылаться на следующий
                    node.previous=current_element.previous;
                    node.next=current_element;
                    current_element.previous.next=node;
                    current_element.previous=node;
                    return true;
                } else {
                    //если текущий элемент первый
                    //node.previous=null;
                    node.next=current_element;
                    //current_element.previous.next=node;
                    current_element.previous=node;
                    //теперь первым элементом становится добавленный
                    this.first_element=node;
                    return true;
                }
                return true; //возвращаем сам объект
            }
            //previous_element=current_element;
            //теперь текущим элементом становится следующий элемент
            current_element=current_element.next;
            current_index++;
        }
        if (current_index==index) {
            let node=new Node(value);
            this.last_element.next=node;
            node.previous=this.last_element;
            this.last_element=node;
            return 1;
        }
        return 0;
    }

    this.returnValue = function (value) {
        if (this.first_element==null) {
            //если нет ни одного элемента возвращаем null
            return null;
        }
        //let current_index=0;
        let current_element=this.first_element;
        while (current_element.next!=null) {
            //если есть ссылочка на следующий элемент прибавляем единичку
            //current_index++;
            //
            //Здесь придумать лучший метод сравнения , не совсмем удачная реализация, значения разных типов могут совпадать
            if (current_element.toString()==value.toString()) {
                return current_element.data; //возвращаем сам объект
            }
            //теперь текущим элементом становится следующий элемент
            current_element=current_element.next;
        }
        return null;
    }

    this.delValue = function (value) {
        if (this.first_element==null) {
            //если нет ни одного элемента возвращаем null
            return null;
        }
        let current_element=this.first_element;
        while (current_element!=null) {

            //Здесь придумать лучший метод сравнения , не совсмем удачная реализация, значения разных типов могут совпадать
            if (current_element.toString()==value.toString()) {

                let ret=current_element.data;

                if (current_element.previous!=null && current_element.next!=null) {
                    current_element.next.previous=current_element.previous;
                    current_element.previous.next=current_element.next;
                    return ret; //возвращаем сам объект
                }
                if (current_element.previous==null && current_element.next!=null) {
                    current_element.next.previous=current_element.previous;
                    //current_element.previous.next=current_element.next;
                    this.first_element=current_element.next;
                    return ret; //возвращаем сам объект
                }
                if (current_element.previous!=null && current_element.next==null) {
                    //current_element.next.previous=current_element.previous;
                    current_element.previous.next=null;
                    this.last_element=current_element.previous;
                    return ret; //возвращаем сам объект
                }
            }
            //теперь текущим элементом становится следующий элемент
            current_element=current_element.next;
        }
        return false;
    }

}

function MakeSuperList (ch) {
    let sl=new SuperList;
    let arr=ch.toString().split('');
    for (let i=arr.length-1; i>=0; i--) {
        sl.add(new Value(arr[i]));
    }
    return sl;
}

function SuperListNumSum(sl1, sl2) {

    if (sl1==null && sl2!=null) {
        return sl2;
    }
    if (sl1!=null && sl2==null) {
        return sl1;
    }

    let sl=new SuperList;

    let sl1count=sl1.count();
    let sl2count=sl2.count();

    let max_count=sl1count;
    if (sl2count>sl1count) {
        max_count=sl2count;
    }
    let memory=0;
    for (let i=1; i <= max_count; i++) {
        let v1=sl1.getDataByIndex(i);
        let v2=sl2.getDataByIndex(i);
        let sum=memory;
        memory=0;
        if (v1!=null && v2!=null) {
            sum=sum+new Number(v1.a)+new Number(v2.a);
            //console.log(i + "sum: " + v1.a+ " " + v2.a + " = " + sum);
        } else if (v1==null && v2!=null) {
            sum=sum+new Number(v2.a);
        }
        else if (v1!=null && v2==null) 
        {
            sum=sum+new Number(v1.a);
        }
        if (sum>9) {
            sum=sum-10;
            memory=1;
        }

        sl.add(new Value(sum));
    }
    if (memory) {
        sl.add(new Value(memory));
    }
    return sl;
}


//####################### Проверка #############################

let sl=new SuperList;
sl.add(new Value(3,-7));
sl.add(new Value(3,8));
sl.add(new Value(1,-2));

if  (sl.insertByIndex(3, new Value(5,2))) {

}
else {
    console.log("невозможно добавить элемент, проверьте индекс");
};
sl.add(new Value(11,56));

sl.delValue(new Value(7));

let v=sl.returnValue(new Value(5));
if (v!=null) {
    console.log("returnv: " + v.toString());
}

//переопределяем
let sl1=MakeSuperList(100);
let sl2=MakeSuperList(904);

sl=SuperListNumSum(sl1, sl2);

console.log(sl.count());
console.log(sl.toString());

v=sl.getDataByIndex(1);
console.log(v.toString());
