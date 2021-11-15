#include <stdio.h>
#include <assert.h>

int cuboEnSumas(int base) {
    assert(base >= 0);//precondicion
    int x = 0,
        y = 1,
        z = 6,
        n = 0;
    assert( x == n*n*n && 0 <= n && n <= base && y == 3*n*n+3*n+1 && z == 6 * n + 6 );//invariante
    while (n < base) {
        assert( x == n*n*n && 0 <= n && n <= base && y == 3*n*n+3*n+1 && z == 6 * n + 6 );//invariante
        x += y;
        y += z;
        z += 6;
        n++;
    }
    assert( x == n*n*n && 0 <= n && n <= base && y == 3*n*n+3*n+1 && z == 6 * n + 6 );//invariante
    assert( x == base*base*base);//postcondicion
    return x;
}

int main() {
    int X;
    printf("Ingrese un entero: ");
    scanf("%d", &X);

    int res = cuboEnSumas(X);

    printf("el cubo de %d es: %d\n", X, res);

    return 0;
}