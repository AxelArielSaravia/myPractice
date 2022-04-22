#include <iostream> 
#include <vector> 

class StaticQueue {
    private: 
        vector<int> data;
        unsigned int head;
    public:
        StaticQueue(int k) {
            data.resize(k);
            head = 0;
        }
        bool enQueue(int x) {
            data.push_back(x);
            return true;
        }
        bool deQueue() {
            if (isEmpty()) return false;
            head++;
            return true;
        }
        int Front() {
            return data[head];
        }
        bool isEmpty() {
            return head >= data.size();
        }
}