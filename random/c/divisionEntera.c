#include <stdio.h>

typedef struct {
    int cociente;
    int resto;
} valoresDivision;

valoresDivision divisionEntera( int dividendo, int divisor ) {
    //{P: dividendo >= 0 && divisor > 0}
    valoresDivision v;
    v.cociente = 0;
    v.resto = dividendo;
    int i = 1;
    //{I: dividendo =  cociente * divisor + resto && 0 <= r}
    while (v.resto >= divisor) {
        v.cociente++;
        v.resto -= divisor;
        printf("Iteracion %d\n", i++);
    }
    //{Q: dividendo =  cociente * divisor + resto && 0 <= r && resto < divisor}
    return v;
}

valoresDivision divisionEnteraMejorada( int dividendo, int divisor ) {
    //{P: dividendo >= 0 && divisor > 0}
    valoresDivision v;
    v.cociente = 0,
    v.resto = dividendo;
    int i = 1;
    //{I: dividendo =  cociente * divisor + resto && 0 <= r}
    while (v.resto >= divisor) {
        int d = 1,
            dd = divisor;
        int j = 1;

        printf("Iteracion %d\n", i++);
        
        while (v.resto >= 2*dd) 
            d *= 2,
            dd *= 2,
            printf("     sub-teracion %d\n", j++);

        v.cociente += d;
        v.resto -= dd; 
    }
    //{Q: dividendo =  cociente * divisor + resto && 0 <= r && resto < divisor}
    return v;
}


int main() {
    int X, Y;

    printf("dividendo: ");
    scanf("%d", &X);
    printf("divisor: ");
    scanf("%d", &Y);

    valoresDivision valores = divisionEntera(X, Y);

    printf("Division Entera\n");
    printf("El cociente es: %d\n", valores.cociente);
    printf("El resto es: %d\n", valores.resto);
    printf("\n");

    valoresDivision valores2 = divisionEnteraMejorada(X, Y);

    printf("Division Entera Mejorada\n");
    printf("El cociente es: %d\n", valores2.cociente);
    printf("El resto es: %d\n", valores2.resto);
    printf("\n");


    return 0; 
}