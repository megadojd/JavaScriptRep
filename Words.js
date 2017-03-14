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
            s = s + current_element.toString() + " -> ";
            //теперь текущим элементом становится следующий элемент
            current_element=current_element.next;
        }
        s="(" + s + current_element.toString() + ")";
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




/*
Input:
Sed tempus ipsum quis eros tempus lacinia Cras finibus lorem ut lacinia egestas nunc nibh iaculis est convallis tincidunt mi mi sed nisl Sed porttitor aliquam elit ullamcorper tincidunt arcu euismod quis Mauris congue elit suscipit leo varius facilisis Cras et arcu sodales laoreet est vitae pharetra orci Integer eget nulla dictum aliquet justo semper molestie neque Maecenas bibendum lacus tincidunt auctor varius purus felis ullamcorper dui et laoreet ligula ex et risus Donec eget fringilla nibh Cras congue tincidunt accumsan Maecenas euismod eleifend elit ut rhoncus tortor sodales a Cras egestas finibus lorem non tempor tincidunt aera

Output:
tincidunt
*/

let s="Sed tempus ipsum quis eros tempus lacinia Cras finibus lorem ut lacinia egestas nunc nibh iaculis est convallis tincidunt mi mi sed nisl Sed porttitor aliquam elit ullamcorper tincidunt arcu euismod quis Mauris congue elit suscipit leo varius facilisis Cras et arcu sodales laoreet est vitae pharetra orci Integer eget nulla dictum aliquet justo semper molestie neque Maecenas bibendum lacus tincidunt auctor varius purus felis ullamcorper dui et laoreet ligula ex et risus Donec eget fringilla nibh Cras congue tincidunt accumsan Maecenas euismod eleifend elit ut rhoncus tortor sodales a Cras egestas finibus lorem non tempor tincidunt aera\n";
console.log(getPopular(s));

function getPopular(s) {
    let dict={};
    //let max_stack=[];
    let max_stack=new SuperList();
    let max=1;
    let words=s.split(/[\s\r\n.,!?\(\)]+/);
    for (let i=0; i<words.length;i++) {
        //console.log(words[i]);
        if (words[i]=="") { continue; }
        if (dict[words[i]]) {
            dict[words[i]]+=1;
        } else {
            dict[words[i]]=1;
        }
        let c=dict[words[i]];
        //console.log("z:"+c);
        if (c==max) {
           //max_stack.push(words[i]);
           max_stack.add(new Value(words[i]));
        } else if (c>max) {
            max=c;
            //max_stack=[];
            max_stack=new SuperList();
            //max_stack.push(words[i]);
            max_stack.add(new Value(words[i]));
        }
    }

    //console.log(max_stack.count());
    if (max_stack.count()==1) {return max_stack.getDataByIndex(1).toString();}
    return "---"
}