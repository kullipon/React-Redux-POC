export const getArrayStringFromObject = (obj: object[] | undefined): string[] | undefined => {

    let strings: string[] = new Array<string>();

    if (obj !== undefined) {

        let keys: string[] = Object.keys(obj);
        for (var key of keys) {                 
            if (key in obj) {
    
                strings.push(obj[key]);
               }  
        }
    
    }

    return strings;
};
