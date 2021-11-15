#include <stdio.h>

int exponenciacionEntera(int base, int exponente) {
    int x = 0,
        r = 1;
    while (x < exponente)
        r *= base,
        x++;
    return r;
}

