function SA(a, b, c) {
    if (a < b) {
        if (b < c) {
            console.log("a",a, "b",b, "c",c);
        } else {
            if (a < c) {
                console.log("a",a, "c",c, "b",b);
            } else {
               console.log("c",c,"a",a, "b",b); 
            }
        }
    } else {
        if (a < c) {
            console.log("b",b,"a",a,"c",c)
            
        } else{
            if (c < b) {
                console.log("c",c, "b",b,"a",a)
        } else {
            console.log("b",b,c,"a",a)
        }
        }
    }
}
console.log(SA(9, 3, 4));