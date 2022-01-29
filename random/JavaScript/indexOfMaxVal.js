const allIndexOfMaxVal = (arr) => {
    if (arr.length > 0) {

        let i = 1,
            r = [0],
            val = arr[0];

        while (i < arr.length) {
    
            if (val < arr[i]) 
                val = arr[i],
                r = [i];
            else if (val === arr[i]) 
                r[r.length] = i;
            

            i++;
        }
        return r;
    }
    return -1;
};

const indexOfMaxVal = (arr) => {
    if (arr.length > 0) {

        let i = 1,
            r = 0,
            val = arr[0];

        while (i < arr.length) {
    
            if (val < arr[i])
                val = arr[i],
                r = i;
            
            i++;
        }
        return r;
    }
    return -1;
};


const lastIndexOfMaxVal = (arr) => {
    if (arr.length > 0) {

        let i = 1,
            r = 0,
            val = arr[0];

        while (i < arr.length) {
    
            if (val <= arr[i]) 
                val = arr[i],
                r = i;
        
            i++;
        }
        return r;
    }
    return -1;
};
